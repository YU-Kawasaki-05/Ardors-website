/** @file Compatibility projection of Japanese public work records. */
import workRecords from '@/data/works.json'
import type { WorkDetail, WorkRecord } from '@/types/works'

export const WORKS: WorkDetail[] = (workRecords as WorkRecord[])
  .filter((record) => record.published)
  .map((record) => ({
    slug: record.slug,
    title: record.locales.ja.title,
    category: record.locales.ja.category,
    summary: record.locales.ja.summary,
    outcomes: record.locales.ja.outcomes,
    thumbnail: record.thumbnail,
    publishedAt: record.publishedAt,
    published: record.published,
    problem: record.locales.ja.problem,
    solution: record.locales.ja.solution,
    result: record.locales.ja.result,
    techStack: record.techStack,
    nextWorks: record.nextWorks,
  }))
