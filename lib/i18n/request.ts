/** @file Server helpers to read locale/path context from middleware-injected headers. */
import { headers } from 'next/headers'

import {
  DEFAULT_LOCALE,
  LOCALE_HEADER_NAME,
  PATHNAME_HEADER_NAME,
  SEARCH_HEADER_NAME,
  type Locale,
  isLocale,
} from '@/config/i18n'

export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers()
  const rawLocale = requestHeaders.get(LOCALE_HEADER_NAME)
  return isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE
}

export async function getRequestPathname(): Promise<string> {
  const requestHeaders = await headers()
  return requestHeaders.get(PATHNAME_HEADER_NAME) ?? '/'
}

export async function getRequestSearch(): Promise<string> {
  const requestHeaders = await headers()
  return requestHeaders.get(SEARCH_HEADER_NAME) ?? ''
}

export async function getRequestPathWithSearch(): Promise<string> {
  const pathname = await getRequestPathname()
  const search = await getRequestSearch()
  return `${pathname}${search}`
}
