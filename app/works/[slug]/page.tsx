/**
 * @file Work detail page — SCR-05 (FR-05, FR-08, BR-20, BR-21)
 */
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { localizeHref } from '@/config/i18n'
import JsonLd, {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  buildPageMetadata,
  toAbsoluteUrl,
  toJsonLdLanguage,
} from '@/components/JsonLd'
import { CTABlock } from '@/components/ui'
import { WORKS } from '@/data/works'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export function generateStaticParams() {
  return WORKS.filter((work) => work.published).map((work) => ({ slug: work.slug }))
}

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

function normalizePublishedDate(value: string): string {
  return /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).works
  const { slug } = await params
  const work = t.items.find((item) => item.slug === slug && item.published)

  if (!work) {
    return buildPageMetadata({
      locale,
      pathname: '/works',
      title: locale === 'ja' ? '実績詳細' : 'Work Detail',
      description: locale === 'ja' ? '実績詳細ページです。' : 'Work detail page.',
    })
  }

  return buildPageMetadata({
    locale,
    pathname: `/works/${work.slug}`,
    title: work.title,
    description: work.summary ?? work.result,
    openGraphType: 'article',
    image: work.thumbnail ?? DEFAULT_OG_IMAGE,
  })
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const locale = await getRequestLocale()
  const t = getMessages(locale).works
  const { slug } = await params
  const work = t.items.find((item) => item.slug === slug)

  if (!work || !work.published) {
    notFound()
  }

  const nextWorkItems = (work.nextWorks ?? [])
    .map((nextSlug) =>
      t.items.find((candidate) => candidate.slug === nextSlug && candidate.published),
    )
    .filter((candidate) => candidate !== undefined)
    .slice(0, 2)
  const workUrl = toAbsoluteUrl(localizeHref(locale, `/works/${work.slug}`))
  const imageUrl = toAbsoluteUrl(work.thumbnail ?? DEFAULT_OG_IMAGE)
  const keywords = [...work.outcomes, ...work.techStack]

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: work.title,
          description: work.summary ?? work.result,
          image: [imageUrl],
          datePublished: normalizePublishedDate(work.publishedAt),
          inLanguage: toJsonLdLanguage(locale),
          articleSection: work.category,
          keywords: keywords.join(', '),
          mainEntityOfPage: workUrl,
          author: {
            '@type': 'Person',
            name: 'Yuu Kawasaki',
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
          },
        }}
      />
      <div className="border-b border-zinc-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href={localizeHref(locale, '/works')}
            className="inline-flex items-center gap-1 py-4 text-sm text-zinc-500 transition-colors hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span aria-hidden="true">←</span> {t.detail.backToList}
          </Link>
        </div>
      </div>

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

      <article className="py-14">
        <div className="mx-auto max-w-4xl space-y-14 px-4 sm:px-6 lg:px-8">
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white"
                aria-hidden="true"
              >
                1
              </span>
              {t.detail.problem}
            </h2>
            <p className="leading-relaxed text-zinc-700">{work.problem}</p>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white"
                aria-hidden="true"
              >
                2
              </span>
              {t.detail.solution}
            </h2>
            <p className="leading-relaxed text-zinc-700">{work.solution}</p>
          </section>

          <section>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-zinc-900">
              <span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
                aria-hidden="true"
              >
                3
              </span>
              {t.detail.result}
            </h2>
            <p className="leading-relaxed text-zinc-700">{work.result}</p>
          </section>
        </div>
      </article>

      {nextWorkItems.length > 0 && (
        <section className="border-t border-zinc-100 py-14">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              {t.detail.nextHeading}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {nextWorkItems.map((nextWork) => (
                <Link
                  key={nextWork.slug}
                  href={localizeHref(locale, `/works/${nextWork.slug}`)}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5 transition-colors hover:border-zinc-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  <div>
                    <p className="text-xs font-medium text-indigo-600">{nextWork.category}</p>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-900">{nextWork.title}</p>
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

      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CTABlock
            heading={t.detail.cta.heading}
            description={t.detail.cta.description}
            primaryCTA={{ label: t.detail.cta.primaryCTA, href: localizeHref(locale, '/contact') }}
            secondaryCTA={{
              label: t.detail.cta.secondaryCTA,
              href: localizeHref(locale, '/works'),
            }}
          />
        </div>
      </section>
    </>
  )
}
