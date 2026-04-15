/**
 * @file Next.js middleware — security response headers (AC-22-03, FR-71)
 *
 * Applies CSP, HSTS, X-Frame-Options, X-Content-Type-Options to all
 * public page responses. Does not run for Next.js internals (_next/*).
 */
import { NextResponse } from 'next/server'

export function middleware() {
  const res = NextResponse.next()

  // Content-Security-Policy — restricts resource origins
  res.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'", // required for Next.js inline scripts
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

  return res
}

export const config = {
  // Apply to all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
