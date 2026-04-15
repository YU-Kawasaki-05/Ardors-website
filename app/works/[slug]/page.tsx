/**
 * @file Work detail page — SCR-05 (FR-05, BR-10, BR-11, AC-05-01, AC-05-02)
 *
 * Section order:
 *   1. Header  — タイトル / カテゴリ / 日付 / tech stack
 *   2. Problem — 課題 (BR-10, AC-05-01)
 *   3. Solution— 対応 (BR-10, AC-05-01)
 *   4. Result  — 結果 (BR-10, AC-05-01)
 *   5. Next    — 次に読む実績 (FR-09, AC-05-01)
 *   6. CTA     — 相談導線
 */
import { notFound } from 'next/navigation'
import Link from 'next/link'

import { CTABlock } from '@/components/ui'
import { WORKS } from '@/data/works'

// Pre-generate routes for published works at build time.
export function generateStaticParams() {
  return WORKS.filter((w) => w.published).map((w) => ({ slug: w.slug }))
}

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const work = WORKS.find((w) => w.slug === slug)

  // AC-05-02: 未公開または存在しないスラッグ → 404
  if (!work || !work.published) {
    notFound()
  }

  // Resolve "next works" slugs to objects (published only)
  const nextWorkItems = (work.nextWorks ?? [])
    .map((s) => WORKS.find((w) => w.slug === s && w.published))
    .filter((w) => w !== undefined)
    .slice(0, 2)

  return (
    <>
      {/* Back link */}
      <div className="border-b border-zinc-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/works"
            className="inline-flex items-center gap-1 py-4 text-sm text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span aria-hidden="true">←</span> 実績一覧に戻る
          </Link>
        </div>
      </div>

      {/* 1. Header */}
      <section className="border-b border-zinc-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-indigo-600">{work.category}</span>
            <span className="text-zinc-300" aria-hidden="true">
              /
            </span>
            <span className="text-sm text-zinc-400">{work.publishedAt}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {work.title}
          </h1>
          {work.summary && (
            <p className="mt-4 text-lg leading-relaxed text-zinc-600">{work.summary}</p>
          )}

          {/* Tech stack */}
          {work.techStack.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {work.techStack.map((tech) => (
                <li key={tech}>
                  <span className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Outcome tags */}
          <ul className="mt-3 flex flex-wrap gap-2">
            {work.outcomes.map((tag) => (
              <li key={tag}>
                <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2–4. Case study body (AC-05-01: 課題・対応・結果 の 3 セクション) */}
      <article className="py-14">
        <div className="mx-auto max-w-4xl space-y-14 px-4 sm:px-6 lg:px-8">
          {/* 課題 */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white"
                aria-hidden="true"
              >
                1
              </span>
              課題
            </h2>
            <p className="leading-relaxed text-zinc-700">{work.problem}</p>
          </section>

          {/* 対応 */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white"
                aria-hidden="true"
              >
                2
              </span>
              対応
            </h2>
            <p className="leading-relaxed text-zinc-700">{work.solution}</p>
          </section>

          {/* 結果 */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
                aria-hidden="true"
              >
                3
              </span>
              結果
            </h2>
            <p className="leading-relaxed text-zinc-700">{work.result}</p>
          </section>
        </div>
      </article>

      {/* 5. Next works (FR-09, AC-05-01) */}
      {nextWorkItems.length > 0 && (
        <section className="border-t border-zinc-100 py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              次に読む実績
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {nextWorkItems.map((next) => (
                <Link
                  key={next!.slug}
                  href={`/works/${next!.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5 transition-colors hover:border-zinc-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <div>
                    <p className="text-xs font-medium text-indigo-600">{next!.category}</p>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-900">{next!.title}</p>
                  </div>
                  <span
                    className="shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-600"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. CTA */}
      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading="似た課題をお持ちですか"
            description="まずは状況を聞かせてください。最適な進め方をご提案します。"
            primaryCTA={{ label: '相談する', href: '/contact' }}
            secondaryCTA={{ label: '実績一覧に戻る', href: '/works' }}
          />
        </div>
      </section>
    </>
  )
}
