/**
 * @file Work (case study) type definitions shared by ARD-10 (list) and ARD-11 (detail).
 *
 * `Work`       — base fields used by the list page.
 * `WorkDetail` — extends Work with full case study content (ARD-11).
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

/**
 * Full case study used by the detail page (ARD-11).
 * Extends the base Work type with narrative sections and metadata.
 */
export type WorkDetail = Work & {
  /** 課題: situation / problem the client faced. */
  problem: string
  /** 対応: how the problem was addressed. */
  solution: string
  /** 結果: measurable outcomes achieved. */
  result: string
  /** Technologies and tools used in this project. */
  techStack: string[]
  /** Slugs of 0–2 related works to surface as "次に読む" (FR-09). */
  nextWorks?: string[]
}
