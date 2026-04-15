/** @file Contact complete page — SCR-08 (FR-21, FR-08, BR-20, BR-21). */
import Link from 'next/link'
import type { Metadata } from 'next'

import { localizeHref } from '@/config/i18n'
import { buildPageMetadata } from '@/components/JsonLd'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = getMessages(locale).contactComplete

  return buildPageMetadata({
    locale,
    pathname: '/contact/complete',
    title: t.title,
    description: t.description,
  })
}

export default async function ContactCompletePage() {
  const locale = await getRequestLocale()
  const t = getMessages(locale).contactComplete

  return (
    <section className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-indigo-600"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl">{t.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-zinc-500">{t.description}</p>

        <nav aria-label={t.nextHeading} className="mt-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            {t.nextHeading}
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {t.nextLinks.map((link) => (
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
