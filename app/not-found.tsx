/**
 * @file 404 Not Found page — SCR-12 (FR-08, BR-20, BR-21)
 */
import Link from 'next/link'
import type { Metadata } from 'next'

import { localizeHref } from '@/config/i18n'
import { buildPageMetadata } from '@/components/JsonLd'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).notFound

  return {
    ...buildPageMetadata({
      locale,
      pathname: '/',
      title: t.title,
      description: t.description,
    }),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function NotFound() {
  const locale = await getRequestLocale()
  const t = getMessages(locale).notFound

  return (
    <section className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <p
          className="text-8xl font-bold tracking-tight text-zinc-100 select-none"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="-mt-4 text-2xl font-bold text-zinc-900 sm:text-3xl">{t.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-500">{t.description}</p>

        <Link
          href={localizeHref(locale, '/')}
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {t.backToTop}
        </Link>

        <nav aria-label={t.quickLinksAria} className="mt-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
            {t.quickLinksHeading}
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {t.quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={localizeHref(locale, link.href)}
                  className="inline-flex h-9 items-center rounded-full border border-zinc-200 px-4 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
