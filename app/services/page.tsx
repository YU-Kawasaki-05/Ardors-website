/**
 * @file Services page — SCR-02 (FR-02, BR-02, AC-02-01)
 *
 * Section order:
 *   1. Page header  — タイトル + 概要
 *   2. Service cards — data/services.ts から一覧表示
 *   3. Next pages   — 実績一覧・プロフィールへの推奨リンク
 *   4. CTABlock     — ページ末尾 CTA
 */
import Link from 'next/link'

import { CTABlock } from '@/components/ui'
import { SERVICES } from '@/data/services'
import type { ServiceItem } from '@/data/services'

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-8">
      {/* Header */}
      <div className="mb-5 border-b border-zinc-100 pb-5">
        <h2 className="text-xl font-semibold text-zinc-900">{service.name}</h2>
        <p className="mt-1 text-sm text-indigo-600">{service.tagline}</p>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-600">{service.description}</p>

      {/* Deliverables */}
      <ul className="mt-5 space-y-2">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
            <span className="mt-0.5 shrink-0 text-indigo-400" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      {/* Price note + CTA */}
      <div className="mt-auto pt-6">
        <p className="mb-4 text-xs text-zinc-400">{service.priceNote}</p>
        <Link
          href={service.ctaHref}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {service.ctaLabel}
        </Link>
      </div>
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <>
      {/* 1. Page header */}
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Services
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            提供サービス
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">
            Web 開発・デザイン・技術コンサルを一気通貫で担当します。
            課題の大きさに合わせて、単発スポットから継続支援まで柔軟に対応します。
          </p>
        </div>
      </section>

      {/* 2. Service cards */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Next page recommendations (FR-09) */}
      <section className="py-4 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-400">
            関連ページ
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                label: '実績一覧',
                description: '過去の案件と成果をご覧ください。',
                href: '/works',
              },
              {
                label: 'プロフィール',
                description: '担当者の経歴・スキルを紹介しています。',
                href: '/profile',
              },
            ].map((page) => (
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

      {/* 4. CTABlock — BR-02: CTA 2 つ目はカード内、ここが集約 CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading="どのサービスが合うか迷ったら"
            description="ご状況をお聞きした上で、最適な進め方をご提案します。まずはお気軽にどうぞ。"
            primaryCTA={{ label: '相談する', href: '/contact' }}
            secondaryCTA={{ label: '実績を見る', href: '/works' }}
          />
        </div>
      </section>
    </>
  )
}
