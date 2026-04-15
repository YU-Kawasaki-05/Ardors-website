/** @file Global header with responsive navigation and locale switch (FR-07, FR-08). */
'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import {
  DEFAULT_LOCALE,
  type Locale,
  getLocaleFromPathname,
  localizeHref,
  stripLocalePrefix,
  switchLocalePathname,
} from '@/config/i18n'
import { getHeaderItems } from '@/config/navigation'
import { getMessages } from '@/lib/i18n'
import type { NavItem } from '@/types/navigation'

type ClassValue = string | false | null | undefined

function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function withQuery(pathname: string, search: string): string {
  return search ? `${pathname}?${search}` : pathname
}

type LanguageSwitcherProps = {
  locale: Locale
  pathname: string
  search: string
  onNavigate?: () => void
  className?: string
}

function LanguageSwitcher({
  locale,
  pathname,
  search,
  onNavigate,
  className,
}: LanguageSwitcherProps) {
  const t = getMessages(locale)
  const jaHref = withQuery(switchLocalePathname(pathname, 'ja'), search)
  const enHref = withQuery(switchLocalePathname(pathname, 'en'), search)

  return (
    <div className={cn('inline-flex rounded-md border border-zinc-300 bg-white p-0.5', className)}>
      <Link
        href={jaHref}
        onClick={onNavigate}
        aria-current={locale === 'ja' ? 'page' : undefined}
        aria-label={t.common.language.switchAria}
        className={cn(
          'rounded px-2.5 py-1 text-xs font-semibold transition-colors',
          locale === 'ja' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100',
        )}
      >
        {t.common.language.ja}
      </Link>
      <Link
        href={enHref}
        onClick={onNavigate}
        aria-current={locale === 'en' ? 'page' : undefined}
        aria-label={t.common.language.switchAria}
        className={cn(
          'rounded px-2.5 py-1 text-xs font-semibold transition-colors',
          locale === 'en' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100',
        )}
      >
        {t.common.language.en}
      </Link>
    </div>
  )
}

type NavLinksProps = {
  items: NavItem[]
  locale: Locale
  strippedPathname: string
  onNavigate?: () => void
  className?: string
}

function NavLinks({ items, locale, strippedPathname, onNavigate, className }: NavLinksProps) {
  const t = getMessages(locale)
  return (
    <nav aria-label={t.header.navAria} className={className}>
      {items.map((item) => {
        const isActive = isActivePath(strippedPathname, item.href)
        return (
          <Link
            key={item.key}
            href={localizeHref(locale, item.href)}
            aria-current={isActive ? 'page' : undefined}
            onClick={onNavigate}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400',
              isActive && 'bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white',
            )}
          >
            {item.label[locale]}
          </Link>
        )
      })}
    </nav>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  const searchParams = useSearchParams()
  const locale = getLocaleFromPathname(pathname) ?? DEFAULT_LOCALE
  const strippedPathname = stripLocalePrefix(pathname)
  const t = getMessages(locale)

  const search = searchParams.toString()
  const headerItems = getHeaderItems()
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={localizeHref(locale, '/')}
          className="rounded-md text-base font-semibold tracking-[0.08em] text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          {t.common.brand}
        </Link>

        <NavLinks
          items={headerItems}
          locale={locale}
          strippedPathname={strippedPathname}
          className="hidden items-center gap-1 md:flex"
        />

        <div className="hidden md:block">
          <LanguageSwitcher locale={locale} pathname={pathname} search={search} />
        </div>

        <button
          type="button"
          aria-label={t.header.menuButtonAria}
          aria-controls="global-mobile-nav"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-800 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 md:hidden"
        >
          <span className="sr-only">{t.common.menu}</span>
          <span className="relative h-4 w-5">
            <span
              className={cn(
                'absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform',
                isMenuOpen && 'translate-y-[7px] rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-[7px] h-0.5 w-5 bg-current',
                isMenuOpen && 'opacity-0',
              )}
            />
            <span
              className={cn(
                'absolute bottom-0 left-0 h-0.5 w-5 bg-current transition-transform',
                isMenuOpen && '-translate-y-[7px] -rotate-45',
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="global-mobile-nav"
        className={cn('border-t border-zinc-200 px-4 py-3 md:hidden', !isMenuOpen && 'hidden')}
      >
        <NavLinks
          items={headerItems}
          locale={locale}
          strippedPathname={strippedPathname}
          onNavigate={closeMenu}
          className="flex flex-col gap-1"
        />

        <LanguageSwitcher
          locale={locale}
          pathname={pathname}
          search={search}
          onNavigate={closeMenu}
          className="mt-3"
        />
      </div>
    </header>
  )
}
