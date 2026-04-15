/**
 * @file Works list page — SCR-04 (FR-04, FR-08, BR-20, BR-21)
 */
import Link from 'next/link'
import type { Metadata } from 'next'

import { localizeHref, type Locale } from '@/config/i18n'
import { buildPageMetadata } from '@/components/JsonLd'
import { CTABlock } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'
import type { Work } from '@/types/works'

import { WorksFilter } from './_components/WorksFilter'

function WorkCard({
  locale,
  work,
  detailLabel,
}: {
  locale: Locale
  work: Work
  detailLabel: string
}) {
  return (
    <Link
      href={localizeHref(locale, `/works/${work.slug}`)}
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
        {detailLabel} →
      </span>
    </Link>
  )
}

type WorksPageProps = {
  searchParams: Promise<{ outcome?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).works

  return buildPageMetadata({
    locale,
    pathname: '/works',
    title: t.title,
    description: t.description,
  })
}

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const locale = await getRequestLocale()
  const t = getMessages(locale).works
  const { outcome } = await searchParams
  const currentOutcome = outcome ?? null

  const publishedWorks = t.items.filter((work) => work.published)
  const allOutcomes = [...new Set(publishedWorks.flatMap((work) => work.outcomes))]
  const filteredWorks = currentOutcome
    ? publishedWorks.filter((work) => work.outcomes.includes(currentOutcome))
    : publishedWorks

  return (
    <>
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600">{t.description}</p>
        </div>
      </section>

      <section className="border-b border-zinc-100 py-6">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <WorksFilter
            outcomes={allOutcomes}
            currentOutcome={currentOutcome}
            basePath={localizeHref(locale, '/works')}
            labels={t.filter}
          />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {filteredWorks.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-zinc-400">
                {filteredWorks.length} {t.countLabel}
                {currentOutcome && (
                  <span>
                    {' '}
                    / <span className="font-medium text-indigo-600">{currentOutcome}</span>
                  </span>
                )}
              </p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                {filteredWorks.map((work) => (
                  <WorkCard
                    key={work.slug}
                    locale={locale}
                    work={work}
                    detailLabel={t.detailLink}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="py-16 text-center text-sm text-zinc-400">{t.empty}</p>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading={t.cta.heading}
            description={t.cta.description}
            primaryCTA={{ label: t.cta.primaryCTA, href: localizeHref(locale, '/contact') }}
            secondaryCTA={{ label: t.cta.secondaryCTA, href: localizeHref(locale, '/services') }}
          />
        </div>
      </section>
    </>
  )
}
