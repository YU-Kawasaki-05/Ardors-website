'use client'

/** @file Create/edit form for admin case records. */
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { localizeHref, type Locale } from '@/config/i18n'
import type { WorkLocaleContent, WorkRecord } from '@/types/works'

type CaseEditorFormProps = {
  locale: Locale
  mode: 'create' | 'edit'
  record?: WorkRecord
}

type LocaleFormState = {
  title: string
  category: string
  summary: string
  outcomes: string
  problem: string
  solution: string
  result: string
}

type CaseFormState = {
  slug: string
  published: boolean
  publishedAt: string
  thumbnail: string
  techStack: string
  nextWorks: string
  ja: LocaleFormState
  en: LocaleFormState
}

const EMPTY_LOCALE_STATE: LocaleFormState = {
  title: '',
  category: '',
  summary: '',
  outcomes: '',
  problem: '',
  solution: '',
  result: '',
}

const COPY = {
  ja: {
    createTitle: 'ケースを新規作成',
    editTitle: 'ケースを編集',
    description: 'JA は必須、EN は任意です。EN 欄が未入力のケースは英語サイトでは公開されません。',
    slug: 'Slug',
    publishedAt: '公開月',
    thumbnail: 'サムネイル URL',
    techStack: '技術スタック',
    nextWorks: '関連ケース slug',
    published: '公開する',
    save: '保存',
    creating: '作成中…',
    saving: '保存中…',
    delete: '削除',
    deleting: '削除中…',
    back: '一覧に戻る',
    jaSection: '日本語コンテンツ',
    enSection: '英語コンテンツ',
    title: 'タイトル',
    category: 'カテゴリ',
    summary: '概要',
    outcomes: '成果タグ',
    problem: '課題',
    solution: '対応',
    result: '成果',
    localeHint: 'カンマ区切りで入力してください。',
    requestError: '保存に失敗しました。入力内容を確認してください。',
    duplicateSlug: '同じ slug が既に存在します。別の slug を指定してください。',
    enPartial:
      '英語欄は空欄のままにするか、すべての項目を入力してください。途中までの入力では保存できません。',
    deleteConfirm: 'このケースを削除します。元に戻せません。',
  },
  en: {
    createTitle: 'Create Case',
    editTitle: 'Edit Case',
    description:
      'Japanese content is required. English content is optional, but cases without it stay hidden on the EN site.',
    slug: 'Slug',
    publishedAt: 'Published Month',
    thumbnail: 'Thumbnail URL',
    techStack: 'Tech Stack',
    nextWorks: 'Related case slugs',
    published: 'Publish this case',
    save: 'Save',
    creating: 'Creating…',
    saving: 'Saving…',
    delete: 'Delete',
    deleting: 'Deleting…',
    back: 'Back to list',
    jaSection: 'Japanese Content',
    enSection: 'English Content',
    title: 'Title',
    category: 'Category',
    summary: 'Summary',
    outcomes: 'Outcome Tags',
    problem: 'Problem',
    solution: 'Approach',
    result: 'Result',
    localeHint: 'Use commas to separate values.',
    requestError: 'Save failed. Please review the input and try again.',
    duplicateSlug: 'That slug already exists. Choose a different slug.',
    enPartial:
      'Leave the English section empty or complete every field before saving. Partial English content is not accepted.',
    deleteConfirm: 'Delete this case? This action cannot be undone.',
  },
} as const

function joinList(values: string[] | undefined): string {
  return (values ?? []).join(', ')
}

function toLocaleState(content?: WorkLocaleContent): LocaleFormState {
  if (!content) {
    return { ...EMPTY_LOCALE_STATE }
  }

  return {
    title: content.title,
    category: content.category,
    summary: content.summary,
    outcomes: joinList(content.outcomes),
    problem: content.problem,
    solution: content.solution,
    result: content.result,
  }
}

function buildInitialState(record?: WorkRecord): CaseFormState {
  if (!record) {
    return {
      slug: '',
      published: false,
      publishedAt: '',
      thumbnail: '',
      techStack: '',
      nextWorks: '',
      ja: { ...EMPTY_LOCALE_STATE },
      en: { ...EMPTY_LOCALE_STATE },
    }
  }

  return {
    slug: record.slug,
    published: record.published,
    publishedAt: record.publishedAt,
    thumbnail: record.thumbnail ?? '',
    techStack: joinList(record.techStack),
    nextWorks: joinList(record.nextWorks),
    ja: toLocaleState(record.locales.ja),
    en: toLocaleState(record.locales.en),
  }
}

function splitList(value: string): string[] {
  return [
    ...new Set(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ]
}

function buildRequiredLocaleContent(section: LocaleFormState): WorkLocaleContent {
  return {
    title: section.title.trim(),
    category: section.category.trim(),
    summary: section.summary.trim(),
    outcomes: splitList(section.outcomes),
    problem: section.problem.trim(),
    solution: section.solution.trim(),
    result: section.result.trim(),
  }
}

function buildOptionalLocaleContent(section: LocaleFormState): {
  content?: WorkLocaleContent
  isPartial: boolean
} {
  const values = [
    section.title,
    section.category,
    section.summary,
    section.outcomes,
    section.problem,
    section.solution,
    section.result,
  ].map((value) => value.trim())
  const hasAnyValue = values.some(Boolean)

  if (!hasAnyValue) {
    return { content: undefined, isPartial: false }
  }

  if (values.some((value) => !value) || splitList(section.outcomes).length === 0) {
    return { content: undefined, isPartial: true }
  }

  return { content: buildRequiredLocaleContent(section), isPartial: false }
}

function getErrorMessage(locale: Locale, message: string | undefined): string {
  const t = COPY[locale]

  if (message === 'DUPLICATE_SLUG') {
    return t.duplicateSlug
  }

  return t.requestError
}

function LocaleFields({
  locale,
  prefix,
  section,
  state,
  onChange,
}: {
  locale: Locale
  prefix: string
  section: string
  state: LocaleFormState
  onChange: (key: keyof LocaleFormState, value: string) => void
}) {
  const t = COPY[locale]

  return (
    <section className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900">{section}</h2>
        <p className="mt-1 text-sm text-zinc-600">{t.localeHint}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor={`${prefix}-title`}
            className="mb-1.5 block text-sm font-semibold text-zinc-700"
          >
            {t.title}
          </label>
          <input
            id={`${prefix}-title`}
            value={state.title}
            onChange={(event) => onChange('title', event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label
            htmlFor={`${prefix}-category`}
            className="mb-1.5 block text-sm font-semibold text-zinc-700"
          >
            {t.category}
          </label>
          <input
            id={`${prefix}-category`}
            value={state.category}
            onChange={(event) => onChange('category', event.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${prefix}-summary`}
          className="mb-1.5 block text-sm font-semibold text-zinc-700"
        >
          {t.summary}
        </label>
        <textarea
          id={`${prefix}-summary`}
          rows={3}
          value={state.summary}
          onChange={(event) => onChange('summary', event.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div>
        <label
          htmlFor={`${prefix}-outcomes`}
          className="mb-1.5 block text-sm font-semibold text-zinc-700"
        >
          {t.outcomes}
        </label>
        <input
          id={`${prefix}-outcomes`}
          value={state.outcomes}
          onChange={(event) => onChange('outcomes', event.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div>
        <label
          htmlFor={`${prefix}-problem`}
          className="mb-1.5 block text-sm font-semibold text-zinc-700"
        >
          {t.problem}
        </label>
        <textarea
          id={`${prefix}-problem`}
          rows={5}
          value={state.problem}
          onChange={(event) => onChange('problem', event.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div>
        <label
          htmlFor={`${prefix}-solution`}
          className="mb-1.5 block text-sm font-semibold text-zinc-700"
        >
          {t.solution}
        </label>
        <textarea
          id={`${prefix}-solution`}
          rows={5}
          value={state.solution}
          onChange={(event) => onChange('solution', event.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div>
        <label
          htmlFor={`${prefix}-result`}
          className="mb-1.5 block text-sm font-semibold text-zinc-700"
        >
          {t.result}
        </label>
        <textarea
          id={`${prefix}-result`}
          rows={5}
          value={state.result}
          onChange={(event) => onChange('result', event.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm leading-relaxed text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>
    </section>
  )
}

export default function CaseEditorForm({ locale, mode, record }: CaseEditorFormProps) {
  const router = useRouter()
  const t = COPY[locale]
  const [form, setForm] = useState(() => buildInitialState(record))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function updateLocaleSection(section: 'ja' | 'en', key: keyof LocaleFormState, value: string) {
    setForm((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: value,
      },
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const enLocale = buildOptionalLocaleContent(form.en)

    if (enLocale.isPartial) {
      setError(t.enPartial)
      return
    }

    const payload = {
      slug: form.slug.trim(),
      published: form.published,
      publishedAt: form.publishedAt.trim(),
      thumbnail: form.thumbnail.trim() || undefined,
      techStack: splitList(form.techStack),
      nextWorks: splitList(form.nextWorks).filter((slug) => slug !== form.slug.trim()),
      locales: {
        ja: buildRequiredLocaleContent(form.ja),
        ...(enLocale.content ? { en: enLocale.content } : {}),
      },
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(
        mode === 'create' ? '/api/admin/cases' : `/api/admin/cases/${record?.id}`,
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      )

      const responseBody = (await response.json().catch(() => null)) as { message?: string } | null

      if (!response.ok) {
        throw new Error(responseBody?.message)
      }

      router.push(localizeHref(locale, '/admin/cases'))
      router.refresh()
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : undefined
      setError(getErrorMessage(locale, message))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!record || !window.confirm(t.deleteConfirm)) {
      return
    }

    setError(null)
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/admin/cases/${record.id}`, {
        method: 'DELETE',
      })

      const responseBody = (await response.json().catch(() => null)) as { message?: string } | null

      if (!response.ok) {
        throw new Error(responseBody?.message)
      }

      router.push(localizeHref(locale, '/admin/cases'))
      router.refresh()
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : undefined
      setError(getErrorMessage(locale, message))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Link
          href={localizeHref(locale, '/admin/cases')}
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span aria-hidden="true">←</span>
          {t.back}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {mode === 'create' ? t.createTitle : t.editTitle}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-600">{t.description}</p>
      </div>

      <form onSubmit={(event) => void handleSubmit(event)} className="space-y-6">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="slug" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                {t.slug}
              </label>
              <input
                id="slug"
                value={form.slug}
                onChange={(event) =>
                  setForm((current) => ({ ...current, slug: event.target.value }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            <div>
              <label
                htmlFor="publishedAt"
                className="mb-1.5 block text-sm font-semibold text-zinc-700"
              >
                {t.publishedAt}
              </label>
              <input
                id="publishedAt"
                value={form.publishedAt}
                onChange={(event) =>
                  setForm((current) => ({ ...current, publishedAt: event.target.value }))
                }
                placeholder="2026-04"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="thumbnail"
                className="mb-1.5 block text-sm font-semibold text-zinc-700"
              >
                {t.thumbnail}
              </label>
              <input
                id="thumbnail"
                value={form.thumbnail}
                onChange={(event) =>
                  setForm((current) => ({ ...current, thumbnail: event.target.value }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="techStack"
                className="mb-1.5 block text-sm font-semibold text-zinc-700"
              >
                {t.techStack}
              </label>
              <input
                id="techStack"
                value={form.techStack}
                onChange={(event) =>
                  setForm((current) => ({ ...current, techStack: event.target.value }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="nextWorks"
                className="mb-1.5 block text-sm font-semibold text-zinc-700"
              >
                {t.nextWorks}
              </label>
              <input
                id="nextWorks"
                value={form.nextWorks}
                onChange={(event) =>
                  setForm((current) => ({ ...current, nextWorks: event.target.value }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <label className="mt-7 inline-flex items-center gap-3 text-sm font-medium text-zinc-700">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) =>
                  setForm((current) => ({ ...current, published: event.target.checked }))
                }
                className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
              {t.published}
            </label>
          </div>
        </section>

        <LocaleFields
          locale={locale}
          prefix="ja"
          section={t.jaSection}
          state={form.ja}
          onChange={(key, value) => updateLocaleSection('ja', key, value)}
        />

        <LocaleFields
          locale={locale}
          prefix="en"
          section={t.enSection}
          state={form.en}
          onChange={(key, value) => updateLocaleSection('en', key, value)}
        />

        {error && (
          <p
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {mode === 'edit' ? (
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isDeleting || isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-red-200 bg-white px-6 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? t.deleting : t.delete}
            </button>
          ) : (
            <span />
          )}

          <button
            type="submit"
            disabled={isSubmitting || isDeleting}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (mode === 'create' ? t.creating : t.saving) : t.save}
          </button>
        </div>
      </form>
    </section>
  )
}
