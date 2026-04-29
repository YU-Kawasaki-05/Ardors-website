/**
 * @file Products page — SCR-06 (FR-06, FR-08, BR-20, BR-21)
 */
import type { Metadata } from 'next'
import Link from 'next/link'

import { localizeHref } from '@/config/i18n'
import { buildPageMetadata } from '@/components/JsonLd'
import { CTABlock } from '@/components/ui'
import type { ProductStatus } from '@/data/products'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

const STATUS_STYLES: Record<ProductStatus['intent'], string> = {
  live: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  beta: 'border-blue-200 bg-blue-50 text-blue-700',
  wip: 'border-amber-200 bg-amber-50 text-amber-700',
  planned: 'border-zinc-200 bg-zinc-50 text-zinc-700',
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).products

  return buildPageMetadata({
    locale,
    pathname: '/products',
    title: t.data.title,
    description: t.data.description,
  })
}

export default async function ProductsPage() {
  const locale = await getRequestLocale()
  const t = getMessages(locale).products
  const data = t.data

  return (
    <>
      <section className="border-b border-zinc-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            {t.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">{data.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-zinc-900">{t.philosophyHeading}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {data.philosophy.map((item, index) => (
              <div key={item} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                  0{index + 1}
                </p>
                <p className="text-sm leading-relaxed text-zinc-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">{t.productsHeading}</h2>
          <div className="space-y-6">
            {data.products.map((product) => (
              <article key={product.id} className="rounded-3xl border border-zinc-200 bg-white p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-indigo-600">{product.tagline}</p>
                  </div>
                  <span
                    className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[product.status.intent]}`}
                  >
                    {product.status.label}
                  </span>
                </div>

                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-zinc-600">
                  {product.description}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                      {t.highlightsLabel}
                    </h4>
                    <ul className="space-y-2">
                      {product.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-zinc-700"
                        >
                          <span className="mt-0.5 shrink-0 text-indigo-500" aria-hidden="true">
                            ✓
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-600">
                      {t.techStackLabel}
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {product.techStack.map((tech) => (
                        <li key={tech}>
                          <span className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
                            {tech}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={localizeHref(locale, product.ctaHref)}
                  className="mt-8 inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  {product.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-zinc-900">{t.plannedHeading}</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {data.plans.map((plan) => (
              <article
                key={plan.label}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-zinc-900">{plan.label}</h3>
                  <span
                    className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_STYLES[plan.status.intent]}`}
                  >
                    {plan.status.label}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{plan.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {plan.themes.map((theme) => (
                    <li key={theme}>
                      <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200">
                        {theme}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6">
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
