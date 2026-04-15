/** @file Locale and path helpers for JA/EN switching (FR-08, BR-20, BR-21). */

export const LOCALES = ['ja', 'en'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'ja'

export const LOCALE_COOKIE_NAME = 'ardors_locale'
export const LOCALE_HEADER_NAME = 'x-ardors-locale'
export const PATHNAME_HEADER_NAME = 'x-ardors-pathname'
export const SEARCH_HEADER_NAME = 'x-ardors-search'

const EXTERNAL_PROTOCOL_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:/

function ensurePathname(pathname: string): string {
  if (!pathname) return '/'
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'ja' || value === 'en'
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const normalized = ensurePathname(pathname)
  const parts = normalized.split('/')
  const maybeLocale = parts[1]
  return isLocale(maybeLocale) ? maybeLocale : null
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = ensurePathname(pathname)
  const locale = getLocaleFromPathname(normalized)
  if (!locale) return normalized

  const stripped = normalized.slice(locale.length + 1)
  return stripped === '' ? '/' : stripped
}

export function toLocalizedPathname(locale: Locale, pathname: string): string {
  const cleanPath = stripLocalePrefix(pathname)
  if (cleanPath === '/') return `/${locale}`
  return `/${locale}${cleanPath}`
}

export function switchLocalePathname(pathname: string, targetLocale: Locale): string {
  return toLocalizedPathname(targetLocale, pathname)
}

export function localizeHref(locale: Locale, href: string): string {
  if (!href.startsWith('/') || EXTERNAL_PROTOCOL_RE.test(href)) {
    return href
  }

  const [pathAndQuery, hashFragment] = href.split('#')
  const [pathname, query] = pathAndQuery.split('?')
  const localizedPathname = toLocalizedPathname(locale, pathname)

  const hash = hashFragment ? `#${hashFragment}` : ''
  const search = query ? `?${query}` : ''
  return `${localizedPathname}${search}${hash}`
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'ja' ? 'en' : 'ja'
}
