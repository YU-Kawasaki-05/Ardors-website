/**
 * @file Top page — SCR-01 (FR-01, FR-08, BR-20, BR-21)
 */
import Link from 'next/link'
import type { Metadata } from 'next'

import { localizeHref, type Locale } from '@/config/i18n'
import JsonLd, { buildPageMetadata, toAbsoluteUrl, toJsonLdLanguage } from '@/components/JsonLd'
import { CTABlock, TrustBlock } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

type EntryCard = {
  label: string
  description: string
  href: string
}

type NextPageCard = {
  label: string
  description: string
  href: string
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).home

  return buildPageMetadata({
    locale,
    pathname: '/',
    title: locale === 'ja' ? 'トップ' : 'Home',
    description: t.hero.description,
  })
}

function Hero({ locale }: { locale: Locale }) {
  const t = getMessages(locale).home

  return (
    <section className="border-b border-zinc-100 bg-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
          {t.hero.target}
        </p>

        <h1 className="mt-4 max-w-3xl whitespace-pre-line text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          {t.hero.title}
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">{t.hero.description}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={localizeHref(locale, '/contact')}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {t.hero.primaryCTA}
          </Link>
          <Link
            href={localizeHref(locale, '/works')}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-7 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            {t.hero.secondaryCTA}
          </Link>
        </div>
      </div>
    </section>
  )
}

function EntryBranches({ locale }: { locale: Locale }) {
  const cards = getMessages(locale).home.entryBranches as EntryCard[]

  return (
    <section className="py-16" aria-label="entry-branches">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={localizeHref(locale, card.href)}
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

function NextPages({ locale }: { locale: Locale }) {
  const t = getMessages(locale).home
  const nextPages = t.nextPages as NextPageCard[]

  return (
    <section className="py-16" aria-label="next-pages">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-400">
          {t.nextPagesHeading}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {nextPages.map((page) => (
            <Link
              key={page.href}
              href={localizeHref(locale, page.href)}
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

export default async function HomePage() {
  const locale = await getRequestLocale()
  const t = getMessages(locale).home
  const trustLabels = getMessages(locale).trustBlock
  const websiteUrl = toAbsoluteUrl(localizeHref(locale, '/'))

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Ardors',
          url: websiteUrl,
          description: t.hero.description,
          inLanguage: toJsonLdLanguage(locale),
        }}
      />
      <Hero locale={locale} />
      <EntryBranches locale={locale} />

      <section className="py-4 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <TrustBlock
            domains={t.trust.domains}
            techStack={t.trust.techStack}
            outcomes={t.trust.outcomes}
            githubHref={t.trust.githubHref}
            labels={trustLabels}
          />
        </div>
      </section>

      <NextPages locale={locale} />

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading={t.cta.heading}
            description={t.cta.description}
            primaryCTA={{ label: t.cta.primaryCTA, href: localizeHref(locale, '/contact') }}
            secondaryCTA={{ label: t.cta.secondaryCTA, href: localizeHref(locale, '/works') }}
          />
        </div>
      </section>
    </>
  )
}
