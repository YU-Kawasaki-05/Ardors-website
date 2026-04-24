/**
 * @file Next.js middleware — locale prefix routing, admin auth guard, and security headers
 * (FR-08, FR-42, BR-20, AC-22-03, FR-71)
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
import {
  ADMIN_SESSION_COOKIE_NAME,
  buildAdminLoginHref,
  getDefaultAdminReturnPath,
  readAdminSession,
} from '@/lib/auth'

function applySecurityHeaders(res: NextResponse) {
  const isDevelopment = process.env.NODE_ENV !== 'production'
  const contentSecurityPolicy = [
    "default-src 'self'",
    [
      "script-src 'self' 'unsafe-inline'",
      isDevelopment ? "'unsafe-eval'" : '',
      'https://www.googletagmanager.com',
    ]
      .filter(Boolean)
      .join(' '),
    "style-src 'self' 'unsafe-inline'", // required for Tailwind CSS
    "img-src 'self' data: https:",
    "font-src 'self'",
    [
      "connect-src 'self'",
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      isDevelopment ? 'ws://localhost:3000' : '',
      isDevelopment ? 'ws://127.0.0.1:3000' : '',
    ]
      .filter(Boolean)
      .join(' '),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ]
    .filter(Boolean)
    .join('; ')

  res.headers.set('Content-Security-Policy', contentSecurityPolicy)

  // HTTP Strict Transport Security
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

  // Prevent clickjacking
  res.headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  res.headers.set('X-Content-Type-Options', 'nosniff')

  // Legacy XSS filter header for older clients
  res.headers.set('X-XSS-Protection', '1; mode=block')

  // Control referrer information
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Limit access to browser features
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
}

function applyResponseDefaults(res: NextResponse, locale: string) {
  res.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  applySecurityHeaders(res)
  return res
}

function isAdminRoute(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/')
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  const localeFromPath = getLocaleFromPathname(pathname)
  const localeFromCookie = req.cookies.get(LOCALE_COOKIE_NAME)?.value
  const locale = localeFromPath ?? (isLocale(localeFromCookie) ? localeFromCookie : DEFAULT_LOCALE)

  const strippedPathname = stripLocalePrefix(pathname)
  const strippedPathWithSearch = `${strippedPathname}${search}`
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set(LOCALE_HEADER_NAME, locale)
  requestHeaders.set(PATHNAME_HEADER_NAME, strippedPathname)
  requestHeaders.set(SEARCH_HEADER_NAME, search)

  if (isAdminRoute(strippedPathname)) {
    const session = await readAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value)
    const isAdminLoginRoute = strippedPathname === '/admin/login'

    if (isAdminLoginRoute && session) {
      const redirectUrl = new URL(getDefaultAdminReturnPath(locale), req.url)
      return applyResponseDefaults(NextResponse.redirect(redirectUrl), locale)
    }

    if (!isAdminLoginRoute && !session) {
      const redirectUrl = new URL(
        buildAdminLoginHref(locale, { nextPath: strippedPathWithSearch }),
        req.url,
      )
      return applyResponseDefaults(NextResponse.redirect(redirectUrl), locale)
    }
  }

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

  return applyResponseDefaults(res, locale)
}

export const config = {
  // Public pages only: exclude API, internals, and static files.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
