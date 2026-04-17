/** @file GA4 event sender with production-only/no-op safeguards (FR-32). */
import type { AnalyticsEventName, AnalyticsEventParamsByName } from './events'

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim()
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function isAnalyticsEnabled(): boolean {
  return IS_PRODUCTION && Boolean(GA4_ID)
}

export function sendAnalyticsEvent<TEventName extends AnalyticsEventName>(
  eventName: TEventName,
  params: AnalyticsEventParamsByName[TEventName],
): void {
  if (!isAnalyticsEnabled()) {
    return
  }

  if (typeof window === 'undefined') {
    return
  }

  if (typeof window.gtag !== 'function') {
    return
  }

  window.gtag('event', eventName, params)
}
