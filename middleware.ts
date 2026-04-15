/**
 * @file Next.js middleware — locale prefix routing + security headers
 * (FR-08, BR-20, AC-22-03, FR-71)
 */
import { NextRequest, NextResponse } from 'next/server'

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
  PATHNAME_HEADER_NAME,
  SEARCH_HEADER_NAME,
  getLocaleFromPathname,
  isLocale,
  stripLocalePrefix,
  toLocalizedPathname,
} from '@/config/i18n'

function applySecurityHeaders(res: NextResponse) {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const scriptSrc = isDevelopment
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" // required by React/Turbopack in development
    : "script-src 'self' 'unsafe-inline'" // keeps stricter production CSP

  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'", // required for Tailwind CSS
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  )

  // HTTP Strict Transport Security — 1 year, include subdomains
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')

  // Prevent clickjacking
  res.headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  res.headers.set('X-Content-Type-Options', 'nosniff')

  // Control referrer information
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Limit access to browser features
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  const localeFromPath = getLocaleFromPathname(pathname)
  const localeFromCookie = req.cookies.get(LOCALE_COOKIE_NAME)?.value
  const locale = localeFromPath ?? (isLocale(localeFromCookie) ? localeFromCookie : DEFAULT_LOCALE)

  const strippedPathname = stripLocalePrefix(pathname)
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set(LOCALE_HEADER_NAME, locale)
  requestHeaders.set(PATHNAME_HEADER_NAME, strippedPathname)
  requestHeaders.set(SEARCH_HEADER_NAME, search)

  const res = localeFromPath
    ? NextResponse.rewrite(
        (() => {
          const rewriteUrl = req.nextUrl.clone()
          rewriteUrl.pathname = strippedPathname
          return rewriteUrl
        })(),
        { request: { headers: requestHeaders } },
      )
    : NextResponse.redirect(
        (() => {
          const redirectUrl = req.nextUrl.clone()
          redirectUrl.pathname = toLocalizedPathname(locale, pathname)
          return redirectUrl
        })(),
      )

  res.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  applySecurityHeaders(res)
  return res
}

export const config = {
  // Public pages only: exclude API, internals, and static files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
