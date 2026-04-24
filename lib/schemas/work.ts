/** @file Zod schemas and normalizers for the admin work CMS payloads. */
import { z } from 'zod'

import type { WorkLocaleContent, WorkRecord } from '@/types/works'

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const YEAR_MONTH_RE = /^\d{4}-\d{2}$/

const workLocaleContentSchema = z.object({
  title: z.string().trim().min(1),
  category: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  outcomes: z.array(z.string().trim().min(1)).min(1),
  problem: z.string().trim().min(1),
  solution: z.string().trim().min(1),
  result: z.string().trim().min(1),
})

export const workRecordSchema = z.object({
  id: z.string().trim().min(1),
  slug: z.string().trim().regex(SLUG_RE),
  thumbnail: z.string().trim().optional(),
  publishedAt: z.string().trim().regex(YEAR_MONTH_RE),
  published: z.boolean(),
  techStack: z.array(z.string().trim().min(1)),
  nextWorks: z.array(z.string().trim().min(1)).optional(),
  locales: z.object({
    ja: workLocaleContentSchema,
    en: workLocaleContentSchema.optional(),
  }),
})

export const workRecordsSchema = z.array(workRecordSchema)
export const workUpsertSchema = workRecordSchema.omit({ id: true })

export type WorkUpsertInput = z.infer<typeof workUpsertSchema>

function normalizeStringArray(values: string[]): string[] {
  const unique = new Set<string>()

  for (const value of values) {
    const normalized = value.trim()

    if (normalized) {
      unique.add(normalized)
    }
  }

  return [...unique]
}

function normalizeLocaleContent(content: WorkLocaleContent): WorkLocaleContent {
  return {
    title: content.title.trim(),
    category: content.category.trim(),
    summary: content.summary.trim(),
    outcomes: normalizeStringArray(content.outcomes),
    problem: content.problem.trim(),
    solution: content.solution.trim(),
    result: content.result.trim(),
  }
}

function normalizeRecordShape<T extends Omit<WorkRecord, 'id'> | WorkRecord>(record: T): T {
  const normalized = {
    ...record,
    slug: record.slug.trim(),
    thumbnail: record.thumbnail?.trim() || undefined,
    publishedAt: record.publishedAt.trim(),
    techStack: normalizeStringArray(record.techStack),
    nextWorks: normalizeStringArray(record.nextWorks ?? []),
    locales: {
      ja: normalizeLocaleContent(record.locales.ja),
      en: record.locales.en ? normalizeLocaleContent(record.locales.en) : undefined,
    },
  }

  return normalized as T
}

export function parseWorkRecords(raw: unknown): WorkRecord[] {
  return workRecordsSchema.parse(raw).map((record) => normalizeRecordShape(record))
}

export function parseWorkUpsertInput(raw: unknown): WorkUpsertInput {
  return normalizeRecordShape(workUpsertSchema.parse(raw))
}
