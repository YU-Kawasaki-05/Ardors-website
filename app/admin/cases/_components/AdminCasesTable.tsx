'use client'

/** @file Admin cases list with search, publish toggle, and delete actions. */
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { localizeHref, type Locale } from '@/config/i18n'
import type { WorkRecord } from '@/types/works'

type AdminCasesTableProps = {
  locale: Locale
  initialRecords: WorkRecord[]
  storeMode: string
}

type MutationState = {
  id: string | null
  action: 'toggle' | 'delete' | null
}

const COPY = {
  ja: {
    eyebrow: 'Admin Cases',
    title: 'ケース管理',
    description: '公開中のケース一覧、公開状態の切替、新規作成・編集・削除をこの画面から行います。',
    searchLabel: '検索',
    searchPlaceholder: 'タイトルまたは slug で検索',
    count: (value: number) => `${value} 件`,
    newCase: '新規作成',
    edit: '編集',
    delete: '削除',
    publish: '公開',
    unpublish: '非公開',
    slug: 'Slug',
    titleColumn: 'タイトル',
    statusColumn: '公開状態',
    dateColumn: '公開月',
    actionsColumn: '操作',
    fileMode:
      '現在は file ストアで動作中です。Vercel Hobby では実行環境への書き込みが永続化されないため、本番運用では外部ストアへの移行を検討してください。',
    deleteConfirm: 'このケースを削除します。元に戻せません。',
    noResults: '条件に一致するケースがありません。',
    requestError: '更新に失敗しました。時間を置いて再度お試しください。',
    duplicateSlug: '同じ slug が既に存在します。別の slug を指定してください。',
    englishHint: '英語欄が未設定のケースは EN サイトでは非表示になります。',
  },
  en: {
    eyebrow: 'Admin Cases',
    title: 'Case Management',
    description:
      'Manage the case list, publication state, and create/edit/delete operations from one screen.',
    searchLabel: 'Search',
    searchPlaceholder: 'Search by title or slug',
    count: (value: number) => `${value} items`,
    newCase: 'New Case',
    edit: 'Edit',
    delete: 'Delete',
    publish: 'Publish',
    unpublish: 'Unpublish',
    slug: 'Slug',
    titleColumn: 'Title',
    statusColumn: 'Status',
    dateColumn: 'Month',
    actionsColumn: 'Actions',
    fileMode:
      'The CMS currently uses the file store. On Vercel Hobby, runtime file writes are not durable, so move to an external store before production operations.',
    deleteConfirm: 'Delete this case? This action cannot be undone.',
    noResults: 'No cases match the current search.',
    requestError: 'The request failed. Please try again in a moment.',
    duplicateSlug: 'That slug already exists. Choose a different slug.',
    englishHint: 'Cases without English content are hidden on the EN site.',
  },
} as const

function toPayload(record: WorkRecord, published: boolean) {
  return {
    slug: record.slug,
    thumbnail: record.thumbnail,
    publishedAt: record.publishedAt,
    published,
    techStack: record.techStack,
    nextWorks: record.nextWorks ?? [],
    locales: record.locales,
  }
}

function getErrorMessage(locale: Locale, message: string | undefined): string {
  const t = COPY[locale]

  if (message === 'DUPLICATE_SLUG') {
    return t.duplicateSlug
  }

  return t.requestError
}

export default function AdminCasesTable({
  locale,
  initialRecords,
  storeMode,
}: AdminCasesTableProps) {
  const router = useRouter()
  const t = COPY[locale]
  const [records, setRecords] = useState(initialRecords)
  const [query, setQuery] = useState('')
  const [mutation, setMutation] = useState<MutationState>({ id: null, action: null })
  const [error, setError] = useState<string | null>(null)

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return records
    }

    return records.filter((record) =>
      [record.slug, record.locales.ja.title, record.locales.en?.title]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedQuery)),
    )
  }, [query, records])

  async function togglePublished(record: WorkRecord) {
    setError(null)
    setMutation({ id: record.id, action: 'toggle' })

    try {
      const response = await fetch(`/api/admin/cases/${record.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toPayload(record, !record.published)),
      })

      const payload = (await response.json().catch(() => null)) as {
        record?: WorkRecord
        message?: string
      } | null

      if (!response.ok || !payload?.record) {
        throw new Error(payload?.message)
      }

      setRecords((current) =>
        current.map((candidate) =>
          candidate.id === payload.record?.id ? payload.record : candidate,
        ),
      )
      router.refresh()
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : undefined
      setError(getErrorMessage(locale, message))
    } finally {
      setMutation({ id: null, action: null })
    }
  }

  async function removeRecord(record: WorkRecord) {
    if (!window.confirm(t.deleteConfirm)) {
      return
    }

    setError(null)
    setMutation({ id: record.id, action: 'delete' })

    try {
      const response = await fetch(`/api/admin/cases/${record.id}`, {
        method: 'DELETE',
      })

      const payload = (await response.json().catch(() => null)) as { message?: string } | null

      if (!response.ok) {
        throw new Error(payload?.message)
      }

      setRecords((current) => current.filter((candidate) => candidate.id !== record.id))
      router.refresh()
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : undefined
      setError(getErrorMessage(locale, message))
    } finally {
      setMutation({ id: null, action: null })
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
          {t.eyebrow}
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              {t.title}
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-zinc-600">{t.description}</p>
            <p className="text-sm text-zinc-600">{t.englishHint}</p>
          </div>

          <Link
            href={localizeHref(locale, '/admin/cases/new')}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {t.newCase}
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-md">
            <label
              htmlFor="case-search"
              className="mb-1.5 block text-sm font-semibold text-zinc-700"
            >
              {t.searchLabel}
            </label>
            <input
              id="case-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <p className="text-sm text-zinc-600">{t.count(filteredRecords.length)}</p>
        </div>

        {storeMode === 'file' && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {t.fileMode}
          </div>
        )}

        {error && (
          <p
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        {filteredRecords.length === 0 ? (
          <p className="py-12 text-center text-sm text-zinc-600">{t.noResults}</p>
        ) : (
          <>
            <div className="mt-6 hidden overflow-hidden rounded-2xl border border-zinc-200 lg:block">
              <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      {t.titleColumn}
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      {t.slug}
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      {t.dateColumn}
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      {t.statusColumn}
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                      {t.actionsColumn}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 bg-white">
                  {filteredRecords.map((record) => {
                    const isBusy = mutation.id === record.id

                    return (
                      <tr key={record.id}>
                        <td className="px-5 py-4 align-top">
                          <div>
                            <p className="text-sm font-semibold text-zinc-900">
                              {record.locales.ja.title}
                            </p>
                            <p className="mt-1 text-sm text-zinc-600">
                              {record.locales.en?.title ?? 'EN hidden'}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-4 align-top text-sm text-zinc-600">{record.slug}</td>
                        <td className="px-5 py-4 align-top text-sm text-zinc-600">
                          {record.publishedAt}
                        </td>
                        <td className="px-5 py-4 align-top">
                          <button
                            type="button"
                            onClick={() => void togglePublished(record)}
                            disabled={isBusy}
                            className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                              record.published
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                            }`}
                          >
                            {record.published ? t.unpublish : t.publish}
                          </button>
                        </td>
                        <td className="px-5 py-4 align-top">
                          <div className="flex flex-wrap gap-2">
                            <Link
                              href={localizeHref(locale, `/admin/cases/${record.id}`)}
                              className="inline-flex h-9 items-center rounded-xl border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                            >
                              {t.edit}
                            </Link>
                            <button
                              type="button"
                              onClick={() => void removeRecord(record)}
                              disabled={isBusy}
                              className="inline-flex h-9 items-center rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {t.delete}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-4 lg:hidden">
              {filteredRecords.map((record) => {
                const isBusy = mutation.id === record.id

                return (
                  <article
                    key={record.id}
                    className="rounded-2xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-zinc-900">
                        {record.locales.ja.title}
                      </p>
                      <p className="text-sm text-zinc-600">{record.slug}</p>
                      <p className="text-sm text-zinc-600">{record.publishedAt}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => void togglePublished(record)}
                        disabled={isBusy}
                        className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                          record.published
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                        }`}
                      >
                        {record.published ? t.unpublish : t.publish}
                      </button>
                      <Link
                        href={localizeHref(locale, `/admin/cases/${record.id}`)}
                        className="inline-flex h-9 items-center rounded-xl border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      >
                        {t.edit}
                      </Link>
                      <button
                        type="button"
                        onClick={() => void removeRecord(record)}
                        disabled={isBusy}
                        className="inline-flex h-9 items-center rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {t.delete}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
