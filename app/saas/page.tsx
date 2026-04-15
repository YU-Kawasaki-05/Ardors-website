/**
 * @file SaaS intro page — SCR-06 (FR-06, FR-08, BR-20, BR-21)
 */
import type { Metadata } from 'next'

import { localizeHref } from '@/config/i18n'
import { buildPageMetadata } from '@/components/JsonLd'
import { CTABlock } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

const STATUS_STYLES = {
  wip: 'bg-amber-50 text-amber-700 border-amber-200',
  beta: 'bg-blue-50 text-blue-700 border-blue-200',
  live: 'bg-emerald-50 text-emerald-700 border-emerald-200',
} as const

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).saas

  return buildPageMetadata({
    locale,
    pathname: '/saas',
    title: t.data.name,
    description: t.data.description,
  })
}

export default async function SaasPage() {
  const locale = await getRequestLocale()
  const t = getMessages(locale).saas
  const data = t.data
  const statusStyles = STATUS_STYLES[data.status.intent]

  return (
    <>
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              {t.eyebrow}
            </p>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles}`}
            >
              {data.status.label}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {data.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-zinc-500">{data.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600">
            {data.description}
          </p>
          <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-700">
            {data.status.note}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">{t.featuresHeading}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-zinc-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">{t.targetUsersHeading}</h2>
          <div className="space-y-4">
            {data.targetUsers.map((user) => (
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

      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading={t.cta.heading}
            description={t.cta.description}
            primaryCTA={{ label: t.cta.primaryCTA, href: localizeHref(locale, data.ctaHref) }}
            secondaryCTA={{ label: t.cta.secondaryCTA, href: localizeHref(locale, '/services') }}
          />
        </div>
      </section>
    </>
  )
}
