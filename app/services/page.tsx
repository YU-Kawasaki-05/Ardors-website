/**
 * @file Services page — SCR-02 (FR-02, FR-08, BR-20, BR-21)
 */
import Link from 'next/link'
import type { Metadata } from 'next'

import { localizeHref, type Locale } from '@/config/i18n'
import { buildPageMetadata } from '@/components/JsonLd'
import { CTABlock } from '@/components/ui'
import type { ServiceItem } from '@/data/services'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

function ServiceCard({ locale, service }: { locale: Locale; service: ServiceItem }) {
  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-8">
      <div className="mb-5 border-b border-zinc-100 pb-5">
        <h2 className="text-xl font-semibold text-zinc-900">{service.name}</h2>
        <p className="mt-1 text-sm text-indigo-600">{service.tagline}</p>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600">{service.description}</p>

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

      <div className="mt-auto pt-6">
        <p className="mb-4 text-xs text-zinc-400">{service.priceNote}</p>
        <Link
          href={localizeHref(locale, service.ctaHref)}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {service.ctaLabel}
        </Link>
      </div>
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).services

  return buildPageMetadata({
    locale,
    pathname: '/services',
    title: t.title,
    description: t.description,
  })
}

export default async function ServicesPage() {
  const locale = await getRequestLocale()
  const t = getMessages(locale).services

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

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {t.items.map((service) => (
              <ServiceCard key={service.id} locale={locale} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-400">
            {t.nextPagesHeading}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.nextPages.map((page) => (
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
