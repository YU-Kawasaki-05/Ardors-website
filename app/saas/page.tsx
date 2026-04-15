/**
 * @file SaaS intro page — SCR-06 (FR-06, BR-02, AC-06-01)
 *
 * Section order:
 *   1. Hero         — コンセプト + 開発状況バッジ
 *   2. Features     — 主要機能リスト
 *   3. Target users — 対象ユーザー像
 *   4. CTA          — 興味を持ったユーザーへの導線 (BR-02)
 */
import { CTABlock } from '@/components/ui'
import { SAAS } from '@/data/saas'

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES = {
  wip: 'bg-amber-50 text-amber-700 border-amber-200',
  beta: 'bg-blue-50 text-blue-700 border-blue-200',
  live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
} as const

function StatusBadge() {
  const styles = STATUS_STYLES[SAAS.status.intent]
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {SAAS.status.label}
    </span>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SaasPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">SaaS</p>
            <StatusBadge />
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {SAAS.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-zinc-500">{SAAS.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600">
            {SAAS.description}
          </p>
          {/* AC-06-01: 問い合わせ導線 / BR-02 CTA 1/2 */}
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-700">
            {SAAS.status.note}
          </p>
        </div>
      </section>

      {/* 2. Features */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">主要機能</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {SAAS.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-zinc-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Target users */}
      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">こんな方に</h2>
          <div className="space-y-4">
            {SAAS.targetUsers.map((user) => (
              <div
                key={user.persona}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5"
              >
                <span className="mt-0.5 shrink-0 text-indigo-500" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{user.persona}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-500">{user.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA (BR-02: 2 つ目の CTA) */}
      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading="興味がある・一緒に作りたい"
            description="早期アクセス登録や機能のご意見もお待ちしています。開発状況の更新もお伝えします。"
            primaryCTA={{ label: '連絡する / 登録する', href: SAAS.ctaHref }}
            secondaryCTA={{ label: 'サービスを見る', href: '/services' }}
          />
        </div>
      </section>
    </>
  )
}
