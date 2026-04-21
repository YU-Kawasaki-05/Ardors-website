/** @file Global footer with localized nav and language switch (FR-08, FR-31). */
import Link from 'next/link'

import { localizeHref, switchLocalePathname } from '@/config/i18n'
import { getFooterItemsByGroup } from '@/config/navigation'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale, getRequestPathWithSearch } from '@/lib/i18n/request'

/** FR-31: GitHub profile link. */
const GITHUB_URL = 'https://github.com/YU-Kawasaki-05'

function splitPathAndSearch(pathWithSearch: string): { pathname: string; search: string } {
  const [pathname, search = ''] = pathWithSearch.split('?')
  return { pathname, search }
}

function withSearch(pathname: string, search: string): string {
  return search ? `${pathname}?${search}` : pathname
}

export default async function Footer() {
  const locale = await getRequestLocale()
  const t = getMessages(locale)
  const mainItems = getFooterItemsByGroup('main')
  const legalItems = getFooterItemsByGroup('legal')
  const currentYear = new Date().getFullYear()

  const { pathname, search } = splitPathAndSearch(await getRequestPathWithSearch())
  const jaHref = withSearch(switchLocalePathname(pathname, 'ja'), search)
  const enHref = withSearch(switchLocalePathname(pathname, 'en'), search)

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between pb-8 pt-10">
          <Link
            href={localizeHref(locale, '/')}
            className="rounded-md text-base font-semibold tracking-[0.08em] text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            {t.common.brand}
          </Link>

          <div className="inline-flex rounded-md border border-zinc-300 bg-white p-0.5">
            <Link
              href={jaHref}
              aria-current={locale === 'ja' ? 'page' : undefined}
              aria-label={t.common.language.switchAria}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                locale === 'ja' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {t.common.language.ja}
            </Link>
            <Link
              href={enHref}
              aria-current={locale === 'en' ? 'page' : undefined}
              aria-label={t.common.language.switchAria}
              className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                locale === 'en' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'
              }`}
            >
              {t.common.language.en}
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pb-10 sm:grid-cols-3">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {t.footer.navigationHeading}
            </p>
            <nav aria-label={t.footer.navigationHeading}>
              <ul className="space-y-2">
                {mainItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={localizeHref(locale, item.href)}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      {item.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {t.footer.legalHeading}
            </p>
            <nav aria-label={t.footer.legalHeading}>
              <ul className="space-y-2">
                {legalItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={localizeHref(locale, item.href)}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      {item.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              {t.footer.linksHeading}
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  {t.common.github}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-200 py-6">
          <p className="text-xs text-zinc-500">{t.footer.copyright(currentYear)}</p>
        </div>
      </div>
    </footer>
  )
}
