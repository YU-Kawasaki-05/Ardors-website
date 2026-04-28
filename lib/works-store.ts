/** @file File-backed works datastore shared by the public site and the admin CMS. */
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

import type { Locale } from '@/config/i18n'
import bundledWorkRecords from '@/data/works.json'
import { parseWorkRecords, type WorkUpsertInput } from '@/lib/schemas/work'
import type { WorkDetail, WorkLocaleContent, WorkRecord } from '@/types/works'

const DEFAULT_WORKS_FILE_PATH = 'data/works.json'
const FILE_STORE_MODE = 'file'
const BUNDLED_WORK_RECORDS = parseWorkRecords(bundledWorkRecords)

function resolveWorksFilePath(): string {
  const configuredPath = process.env.WORKS_FILE_PATH?.trim() || DEFAULT_WORKS_FILE_PATH
  return path.isAbsolute(configuredPath)
    ? configuredPath
    : path.join(/* turbopackIgnore: true */ process.cwd(), configuredPath)
}

function sortWorkRecords(records: WorkRecord[]): WorkRecord[] {
  return [...records].sort((left, right) => {
    if (left.publishedAt !== right.publishedAt) {
      return right.publishedAt.localeCompare(left.publishedAt)
    }

    return left.locales.ja.title.localeCompare(right.locales.ja.title, 'ja')
  })
}

function isFileNotFoundError(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT'
}

function hasCompleteLocaleContent(
  content: WorkLocaleContent | undefined,
): content is WorkLocaleContent {
  return Boolean(
    content &&
    content.title &&
    content.category &&
    content.summary &&
    content.outcomes.length > 0 &&
    content.problem &&
    content.solution &&
    content.result,
  )
}

function toPublicWork(record: WorkRecord, locale: Locale): WorkDetail | null {
  const content = record.locales[locale]

  if (!record.published || !hasCompleteLocaleContent(content)) {
    return null
  }

  return {
    slug: record.slug,
    title: content.title,
    category: content.category,
    summary: content.summary,
    outcomes: content.outcomes,
    thumbnail: record.thumbnail,
    publishedAt: record.publishedAt,
    published: record.published,
    problem: content.problem,
    solution: content.solution,
    result: content.result,
    techStack: record.techStack,
    nextWorks: record.nextWorks,
  }
}

async function readWorkRecords(): Promise<WorkRecord[]> {
  try {
    const fileContents = await readFile(resolveWorksFilePath(), 'utf8')
    return sortWorkRecords(parseWorkRecords(JSON.parse(fileContents)))
  } catch (error) {
    if (isFileNotFoundError(error)) {
      return sortWorkRecords(BUNDLED_WORK_RECORDS)
    }

    throw error
  }
}

async function writeWorkRecords(records: WorkRecord[]): Promise<void> {
  await writeFile(
    resolveWorksFilePath(),
    `${JSON.stringify(sortWorkRecords(records), null, 2)}\n`,
    'utf8',
  )
}

export function getWorksStoreMode(): string {
  return process.env.WORKS_STORE_MODE?.trim() || FILE_STORE_MODE
}

export async function listAdminWorkRecords(): Promise<WorkRecord[]> {
  return readWorkRecords()
}

export async function getAdminWorkRecordById(id: string): Promise<WorkRecord | null> {
  const records = await readWorkRecords()
  return records.find((record) => record.id === id) ?? null
}

export async function listPublicWorks(locale: Locale): Promise<WorkDetail[]> {
  const records = await readWorkRecords()
  return records.map((record) => toPublicWork(record, locale)).filter((record) => record !== null)
}

export async function getPublicWorkBySlug(
  locale: Locale,
  slug: string,
): Promise<WorkDetail | null> {
  const records = await readWorkRecords()
  const record = records.find((candidate) => candidate.slug === slug)

  if (!record) {
    return null
  }

  return toPublicWork(record, locale)
}

export async function listPublishedWorkSlugs(): Promise<string[]> {
  const records = await readWorkRecords()
  return records.filter((record) => record.published).map((record) => record.slug)
}

export async function createWorkRecord(input: WorkUpsertInput): Promise<WorkRecord> {
  const records = await readWorkRecords()

  if (records.some((record) => record.slug === input.slug)) {
    throw new Error('DUPLICATE_SLUG')
  }

  const nextRecord: WorkRecord = {
    id: crypto.randomUUID(),
    ...input,
  }

  await writeWorkRecords([nextRecord, ...records])
  return nextRecord
}

export async function updateWorkRecord(id: string, input: WorkUpsertInput): Promise<WorkRecord> {
  const records = await readWorkRecords()
  const currentRecord = records.find((record) => record.id === id)

  if (!currentRecord) {
    throw new Error('NOT_FOUND')
  }

  if (records.some((record) => record.id !== id && record.slug === input.slug)) {
    throw new Error('DUPLICATE_SLUG')
  }

  const slugChanged = currentRecord.slug !== input.slug
  const updatedRecord: WorkRecord = { id, ...input }
  const nextRecords = records.map((record) => {
    if (record.id === id) {
      return updatedRecord
    }

    if (!slugChanged || !record.nextWorks?.includes(currentRecord.slug)) {
      return record
    }

    return {
      ...record,
      nextWorks: (record.nextWorks ?? []).map((slug) =>
        slug === currentRecord.slug ? input.slug : slug,
      ),
    }
  })

  await writeWorkRecords(nextRecords)
  return updatedRecord
}

export async function deleteWorkRecord(id: string): Promise<void> {
  const records = await readWorkRecords()
  const currentRecord = records.find((record) => record.id === id)

  if (!currentRecord) {
    throw new Error('NOT_FOUND')
  }

  const nextRecords = records
    .filter((record) => record.id !== id)
    .map((record) => ({
      ...record,
      nextWorks: (record.nextWorks ?? []).filter((slug) => slug !== currentRecord.slug),
    }))

  await writeWorkRecords(nextRecords)
}
