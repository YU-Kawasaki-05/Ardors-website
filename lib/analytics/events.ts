/** @file GA4 event names, payload types, and client context builders (FR-32, BR-32-01/02). */
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  stripLocalePrefix,
  type Locale,
} from '@/config/i18n'

export type AnalyticsEventName =
  | 'cta_click'
  | 'work_detail_view'
  | 'contact_reach'
  | 'contact_submit'

type BaseEventParams = {
  page_path: string
  locale: Locale
  source: string
}

export type CtaClickEventParams = BaseEventParams & {
  cta_label: string
  cta_target: string
  cta_area: string
}

export type WorkDetailViewEventParams = BaseEventParams & {
  work_slug: string
  work_category: string
}

export type ContactReachEventParams = BaseEventParams

export type ContactSubmitEventParams = BaseEventParams & {
  contact_category: string
}

export type AnalyticsEventParamsByName = {
  cta_click: CtaClickEventParams
  work_detail_view: WorkDetailViewEventParams
  contact_reach: ContactReachEventParams
  contact_submit: ContactSubmitEventParams
}

export type AnalyticsEventContext = BaseEventParams

function ensurePathname(pathname: string): string {
  if (!pathname) return '/'
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

function getSourceFromReferrer(referrer: string, origin: string): string {
  if (!referrer) {
    return 'direct'
  }

  try {
    const parsedReferrer = new URL(referrer)
    if (parsedReferrer.origin === origin) {
      return 'direct'
    }

    return parsedReferrer.hostname || 'direct'
  } catch {
    return 'direct'
  }
}

export function getClientEventContext(pathname: string): AnalyticsEventContext {
  const normalizedPathname = ensurePathname(pathname)
  const locale = getLocaleFromPathname(normalizedPathname) ?? DEFAULT_LOCALE
  const pagePath = stripLocalePrefix(normalizedPathname)

  if (typeof window === 'undefined') {
    return {
      page_path: pagePath,
      locale,
      source: 'direct',
    }
  }

  return {
    page_path: pagePath,
    locale,
    source: getSourceFromReferrer(document.referrer, window.location.origin),
  }
}

export function buildCtaClickEventParams(
  context: AnalyticsEventContext,
  input: { cta_label: string; cta_target: string; cta_area: string },
): CtaClickEventParams {
  return {
    ...context,
    ...input,
  }
}

export function buildWorkDetailViewEventParams(
  context: AnalyticsEventContext,
  input: { work_slug: string; work_category: string },
): WorkDetailViewEventParams {
  return {
    ...context,
    ...input,
  }
}

export function buildContactReachEventParams(
  context: AnalyticsEventContext,
): ContactReachEventParams {
  return {
    ...context,
  }
}

export function buildContactSubmitEventParams(
  context: AnalyticsEventContext,
  input: { contact_category: string },
): ContactSubmitEventParams {
  return {
    ...context,
    ...input,
  }
}
