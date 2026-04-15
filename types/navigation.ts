/** @file Navigation type definitions — single source of truth for BR-76 */

/** Multilingual label for i18n readiness (ARD-17). */
export type NavLabel = {
  ja: string
  en: string
}

/**
 * Footer section grouping.
 * - `"main"` — primary site pages
 * - `"legal"` — legal / compliance pages
 */
export type FooterGroup = 'main' | 'legal'

/**
 * Canonical navigation item definition.
 * All pages listed in the screen transition doc (SCR-01〜SCR-A3) have one entry.
 * Header and Footer components derive their items by filtering this type.
 */
export type NavItem = {
  /** Unique identifier used for React keys and programmatic lookups (e.g. "works"). */
  key: string
  /** Requirements traceability ID (e.g. "SCR-01"). */
  screenId: string
  /**
   * URL path.
   * Dynamic routes use a pattern notation for documentation only
   * (e.g. "/works/[slug]") — they are excluded from rendered nav lists.
   */
  href: string
  /** Whether this route is dynamic (contains path parameters). */
  isDynamic?: boolean
  /** Multilingual display label. */
  label: NavLabel
  /** Show in global header navigation (FR-07). */
  showInHeader: boolean
  /** Show in footer navigation (FR-08). */
  showInFooter: boolean
  /** Footer section this item belongs to. Required when showInFooter is true. */
  footerGroup?: FooterGroup
  /** Admin-only page (SCR-A*). Excluded from public nav automatically. */
  isAdmin?: boolean
}
