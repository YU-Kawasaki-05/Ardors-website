/** @file Global header with responsive navigation (FR-07). */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { getHeaderItems } from '@/config/navigation'
import type { NavItem } from '@/types/navigation'

type ClassValue = string | false | null | undefined

function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

type NavLinksProps = {
  items: NavItem[]
  pathname: string
  onNavigate?: () => void
  className?: string
}

function NavLinks({ items, pathname, onNavigate, className }: NavLinksProps) {
  return (
    <nav aria-label="Global navigation" className={className}>
      {items.map((item) => {
        const isActive = isActivePath(pathname, item.href)

        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            onClick={onNavigate}
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400',
              isActive && 'bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white',
            )}
          >
            {item.label.ja}
          </Link>
        )
      })}
    </nav>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname() ?? '/'
  const headerItems = getHeaderItems()

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="rounded-md text-base font-semibold tracking-[0.08em] text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          ARDORS
        </Link>

        <NavLinks
          items={headerItems}
          pathname={pathname}
          className="hidden items-center gap-1 md:flex"
        />

        <div className="hidden md:block">
          <button
            type="button"
            className="rounded-md border border-zinc-300 px-3 py-2 text-xs font-medium tracking-wide text-zinc-700"
            aria-label="Language switch placeholder"
            aria-disabled="true"
          >
            JA / EN
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="global-mobile-nav"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-800 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 md:hidden"
        >
          <span className="sr-only">Menu</span>
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
          pathname={pathname}
          onNavigate={() => setIsMenuOpen(false)}
          className="flex flex-col gap-1"
        />
        <button
          type="button"
          className="mt-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700"
          aria-label="Language switch placeholder"
          aria-disabled="true"
        >
          JA / EN
        </button>
      </div>
    </header>
  )
}
