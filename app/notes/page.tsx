/** @file Notes page backed by the Note RSS feed (FR-30). */
import type { Metadata } from 'next'

import type { Locale } from '@/config/i18n'
import { buildPageMetadata } from '@/components/JsonLd'
import { getNoteArticles, hasNoteRssUrl } from '@/lib/note-rss'
import { getRequestLocale } from '@/lib/i18n/request'

type NoteCard = {
  title: string
  link: string | null
  publishedAt: string
  description: string
}

type NotesCopy = {
  eyebrow: string
  title: string
  description: string
  unsetLabel: string
  emptyLabel: string
  readMoreLabel: string
  openInNewTabLabel: string
  placeholderCards: NoteCard[]
}

const NOTES_COPY: Record<Locale, NotesCopy> = {
  ja: {
    eyebrow: 'Notes',
    title: 'Note 記事一覧',
    description:
      'Note で公開している記事をまとめています。全文は Note 側でそのままご覧いただけます。',
    unsetLabel: 'NOTE_RSS_URL が未設定のため、プレビュー用カードを表示しています。',
    emptyLabel: '公開中の Note 記事はまだありません。',
    readMoreLabel: 'Note で読む',
    openInNewTabLabel: '別タブで開く',
    placeholderCards: [
      {
        title: 'RSS URL を設定すると、最新の Note 記事がここに表示されます',
        link: null,
        publishedAt: '2026-01-15',
        description:
          'Vercel などの環境変数に NOTE_RSS_URL を設定すると、1 時間ごとに記事一覧を再取得します。',
      },
      {
        title: '記事カードにはタイトル・公開日・抜粋を表示します',
        link: null,
        publishedAt: '2026-01-08',
        description:
          '各カードは元の Note 記事へ外部リンクし、このサイト側では MDX や独自ブログCMSを持ちません。',
      },
      {
        title: '未設定時でもページは壊れず、画面確認を継続できます',
        link: null,
        publishedAt: '2025-12-24',
        description:
          '開発環境でも /notes のUI確認ができるよう、固定のプレースホルダー3件を表示しています。',
      },
    ],
  },
  en: {
    eyebrow: 'Notes',
    title: 'Note Articles',
    description:
      'A curated list of articles published on Note. Full content stays on the original Note pages.',
    unsetLabel: 'NOTE_RSS_URL is not set, so preview cards are shown instead.',
    emptyLabel: 'No published Note articles are available yet.',
    readMoreLabel: 'Read on Note',
    openInNewTabLabel: 'Opens in a new tab',
    placeholderCards: [
      {
        title: 'Set NOTE_RSS_URL to show the latest Note articles here',
        link: null,
        publishedAt: '2026-01-15',
        description:
          'Once NOTE_RSS_URL is configured, the page will refresh the feed every hour with ISR.',
      },
      {
        title: 'Each card shows the title, publish date, and a short excerpt',
        link: null,
        publishedAt: '2026-01-08',
        description:
          'Every article card links out to the original Note post instead of hosting content locally.',
      },
      {
        title: 'The page stays usable even when the RSS URL is missing',
        link: null,
        publishedAt: '2025-12-24',
        description:
          'Three placeholder cards keep the /notes page reviewable in development and preview environments.',
      },
    ],
  },
}

function formatPublishedAt(value: string, locale: Locale): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function NoteCardItem({
  article,
  locale,
  readMoreLabel,
  openInNewTabLabel,
}: {
  article: NoteCard
  locale: Locale
  readMoreLabel: string
  openInNewTabLabel: string
}) {
  const formattedDate = formatPublishedAt(article.publishedAt, locale)
  const content = (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
          {formattedDate}
        </p>
        {article.link ? (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700">
            {readMoreLabel}
            <span aria-hidden="true">↗</span>
          </span>
        ) : null}
      </div>

      <h2 className="mt-4 text-xl font-semibold text-zinc-900">{article.title}</h2>
      {article.description ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{article.description}</p>
      ) : null}
    </>
  )

  if (!article.link) {
    return <article className="rounded-2xl border border-zinc-200 bg-white p-6">{content}</article>
  }

  return (
    <article>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${article.title} (${openInNewTabLabel})`}
        className="block rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        {content}
      </a>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const copy = NOTES_COPY[locale]

  return buildPageMetadata({
    locale,
    pathname: '/notes',
    title: copy.title,
    description: copy.description,
  })
}

export default async function NotesPage() {
  const locale = await getRequestLocale()
  const copy = NOTES_COPY[locale]
  const rssConfigured = hasNoteRssUrl()
  const rssArticles = rssConfigured ? await getNoteArticles() : []
  const articles: NoteCard[] = rssConfigured ? rssArticles : copy.placeholderCards

  return (
    <>
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">{copy.description}</p>

          {!rssConfigured ? (
            <p className="mt-6 inline-flex rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
              {copy.unsetLabel}
            </p>
          ) : null}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {articles.map((article) => (
                <NoteCardItem
                  key={`${article.title}-${article.publishedAt}`}
                  article={article}
                  locale={locale}
                  readMoreLabel={copy.readMoreLabel}
                  openInNewTabLabel={copy.openInNewTabLabel}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-10 text-center text-sm text-zinc-600">
              {copy.emptyLabel}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
