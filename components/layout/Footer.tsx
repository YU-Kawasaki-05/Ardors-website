/** @file Global footer with navigation and external links (FR-08, FR-31). */
import Link from 'next/link'

import { getFooterItemsByGroup } from '@/config/navigation'

/** FR-31: GitHub profile link. Update when the public URL is confirmed. */
const GITHUB_URL = 'https://github.com/YU-Kawasaki-05'

export default function Footer() {
  const mainItems = getFooterItemsByGroup('main')
  const legalItems = getFooterItemsByGroup('legal')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Brand + language toggle */}
        <div className="flex items-start justify-between pb-8 pt-10">
          <Link
            href="/"
            className="rounded-md text-base font-semibold tracking-[0.08em] text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            ARDORS
          </Link>

          {/* Language toggle — placeholder until ARD-17 */}
          <button
            type="button"
            className="rounded-md border border-zinc-300 px-3 py-2 text-xs font-medium tracking-wide text-zinc-700"
            aria-label="Language switch — coming soon"
            aria-disabled="true"
          >
            JA / EN
          </button>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 gap-8 pb-10 sm:grid-cols-3">
          {/* Main site navigation */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Navigation
            </p>
            <nav aria-label="Footer main navigation">
              <ul className="space-y-2">
                {mainItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      {item.label.ja}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal navigation */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Legal
            </p>
            <nav aria-label="Footer legal navigation">
              <ul className="space-y-2">
                {legalItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                      {item.label.ja}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* External links */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Links
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  GitHub
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-zinc-200 py-6">
          <p className="text-xs text-zinc-500">© {currentYear} Ardors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
