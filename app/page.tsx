/**
 * @file Top page — SCR-01 (FR-01, BR-01, BR-02, AC-01-01, AC-01-02)
 *
 * Section order (per Implementation Hints):
 *   1. Hero          — 対象・提供価値・CTA (BR-01)
 *   2. Entry branches — 3 導線ナビ (FR-09, AC-01-02)
 *   3. TrustBlock    — 信頼ブロック (FR-10)
 *   4. Next pages    — 次ページ推奨 2 件 (FR-09)
 *   5. CTABlock      — ページ下部 CTA (BR-02)
 */
import Link from 'next/link'

import { CTABlock, TrustBlock } from '@/components/ui'

// ─── Section: Hero ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="border-b border-zinc-100 bg-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* 提供対象 (BR-01) */}
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          フリーランス受託 / 技術コンサル
        </p>

        {/* 提供価値 (BR-01) */}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          デザインと技術で、
          <br />
          Webを事業の武器に。
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
          受託開発・UXデザイン・技術コンサルを一気通貫で提供します。
          課題の整理から設計・実装・改善まで、Ardors が伴走します。
        </p>

        {/* 問い合わせ導線 (BR-01, BR-02: CTA 1/2 = ファーストビュー) */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            相談する
          </Link>
          <Link
            href="/works"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-7 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            実績を見る
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Entry branches ──────────────────────────────────────────────────

type EntryCard = {
  label: string
  description: string
  href: string
}

const ENTRY_BRANCHES: EntryCard[] = [
  {
    label: '相談したい',
    description: '困りごとを整理して、一緒に解決策を考えます。まずはお気軽にどうぞ。',
    href: '/contact',
  },
  {
    label: '実績を見たい',
    description: '課題・対応・成果の軸で整理した実績をご覧いただけます。',
    href: '/works',
  },
  {
    label: '人物を知りたい',
    description: '経歴・スキル・得意領域を紹介しています。',
    href: '/profile',
  },
]

function EntryBranches() {
  return (
    <section className="py-16" aria-label="入口分岐ナビゲーション">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ENTRY_BRANCHES.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <span className="text-base font-semibold text-zinc-900 group-hover:text-indigo-600">
                {card.label}
                <span
                  className="ml-1 inline-block transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
              <span className="text-sm leading-relaxed text-zinc-500">{card.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Next page recommendations ───────────────────────────────────────

type NextPageCard = {
  label: string
  description: string
  href: string
}

const NEXT_PAGES: NextPageCard[] = [
  {
    label: 'サービス紹介',
    description: '受託・コンサルの提供内容と進め方をご覧ください。',
    href: '/services',
  },
  {
    label: 'SaaS 構想',
    description: '取り組んでいる自社プロダクトの構想と進捗を公開しています。',
    href: '/saas',
  },
]

function NextPages() {
  return (
    <section className="py-16" aria-label="次ページ推奨">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-400">
          関連ページ
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {NEXT_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5 transition-colors hover:border-zinc-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <div>
                <p className="text-sm font-semibold text-zinc-900">{page.label}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{page.description}</p>
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
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Hero />

      <EntryBranches />

      {/* 信頼ブロック (FR-10) */}
      <section className="py-4 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TrustBlock
            domains={['Web 開発', 'UI/UX デザイン', '技術コンサル']}
            techStack={['Next.js', 'TypeScript', 'React', 'Figma']}
            outcomes="受託 12 件・継続率 80%"
            githubHref="https://github.com/YU-Kawasaki-05"
          />
        </div>
      </section>

      <NextPages />

      {/* ページ下部 CTA (BR-02: CTA 2/2 = ページ末尾) */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading="まずは気軽にご相談ください"
            description="お見積り・ご相談は無料です。どんな小さな疑問でもお気軽にどうぞ。"
            primaryCTA={{ label: '相談する', href: '/contact' }}
            secondaryCTA={{ label: '実績を見る', href: '/works' }}
          />
        </div>
      </section>
    </>
  )
}
