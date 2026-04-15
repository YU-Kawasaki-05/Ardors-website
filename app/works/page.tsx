/**
 * @file Works list page — SCR-04 (FR-04, BR-11, AC-04-01, AC-04-02)
 *
 * Section order:
 *   1. Page header  — タイトル + 件数
 *   2. WorksFilter  — アウトカムフィルタ (Client Component, AC-04-01)
 *   3. Work cards   — 公開済み実績一覧 (BR-11)
 *   4. CTABlock     — ページ末尾 CTA
 */
import Link from 'next/link'

import { CTABlock } from '@/components/ui'
import { WORKS } from '@/data/works'
import type { Work } from '@/types/works'

import { WorksFilter } from './_components/WorksFilter'

// ─── Work card ────────────────────────────────────────────────────────────────

function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-indigo-600">{work.category}</span>
        <span className="text-xs text-zinc-400">{work.publishedAt}</span>
      </div>

      <h2 className="text-base font-semibold text-zinc-900 group-hover:text-indigo-700">
        {work.title}
      </h2>

      {work.summary && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">{work.summary}</p>
      )}

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {work.outcomes.map((tag) => (
          <li key={tag}>
            <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
              {tag}
            </span>
          </li>
        ))}
      </ul>

      <span
        className="mt-4 self-end text-sm font-medium text-indigo-500 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        詳細を見る →
      </span>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type WorksPageProps = {
  searchParams: Promise<{ outcome?: string }>
}

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const { outcome } = await searchParams
  const currentOutcome = outcome ?? null

  // BR-11: 未公開を除外
  const publishedWorks = WORKS.filter((w) => w.published)

  // 全アウトカムを収集（フィルタバー用）
  const allOutcomes = [...new Set(publishedWorks.flatMap((w) => w.outcomes))]

  // AC-04-01: アウトカムフィルタ適用
  const filteredWorks = currentOutcome
    ? publishedWorks.filter((w) => w.outcomes.includes(currentOutcome))
    : publishedWorks

  return (
    <>
      {/* 1. Page header */}
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">Works</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            実績一覧
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
            これまで担当したプロジェクトをご紹介します。成果軸でフィルタして、課題に近い実績をご覧ください。
          </p>
        </div>
      </section>

      {/* 2. Filter (AC-04-01, AC-04-02) */}
      <section className="border-b border-zinc-100 py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <WorksFilter outcomes={allOutcomes} currentOutcome={currentOutcome} />
        </div>
      </section>

      {/* 3. Work cards */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {filteredWorks.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-zinc-400">
                {filteredWorks.length} 件
                {currentOutcome && (
                  <span>
                    {' '}
                    / <span className="font-medium text-indigo-600">{currentOutcome}</span>
                  </span>
                )}
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                {filteredWorks.map((work) => (
                  <WorkCard key={work.slug} work={work} />
                ))}
              </div>
            </>
          ) : (
            <p className="py-16 text-center text-sm text-zinc-400">
              該当する実績が見つかりませんでした。
            </p>
          )}
        </div>
      </section>

      {/* 4. CTABlock */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading="似た課題をお持ちですか"
            description="実績に近い案件のご相談はお気軽にどうぞ。まずは状況を聞かせてください。"
            primaryCTA={{ label: '相談する', href: '/contact' }}
            secondaryCTA={{ label: 'サービスを見る', href: '/services' }}
          />
        </div>
      </section>
    </>
  )
}
