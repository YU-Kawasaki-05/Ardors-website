/**
 * @file Work (case study) type definitions shared by ARD-10 (list) and ARD-11 (detail).
 *
 * The base `Work` type covers list view needs.
 * ARD-11 extends it with the full detail fields (challenge / response / result).
 */

export type Work = {
  /** URL-safe identifier used as the route slug (e.g. "corporate-site-renewal"). */
  slug: string
  /** Display title of the case study. */
  title: string
  /** Service category label (e.g. "Web 開発"). */
  category: string
  /** One-line summary shown on the list card. */
  summary?: string
  /** Outcome tags used for filtering (e.g. ["CV率向上", "表示速度改善"]). */
  outcomes: string[]
  /** Optional OG / card thumbnail path (relative to /public). */
  thumbnail?: string
  /** Publication date in YYYY-MM format (e.g. "2024-09"). */
  publishedAt: string
  /** Whether this work is visible on the public list (BR-11). */
  published: boolean
}
