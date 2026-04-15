/** @file Shared layout for legal document pages (FR-60, FR-61, FR-62). */
import Link from 'next/link'

import type { LegalDoc } from '@/data/legal/privacy'

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${year}年${month}月${day}日`
}

export default function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <>
      {/* Page header */}
      <section className="border-b border-zinc-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {doc.title}
          </h1>
          <p className="mt-3 text-sm text-zinc-400">最終更新日: {formatDate(doc.updatedAt)}</p>
        </div>
      </section>

      {/* Document body */}
      <article className="py-12">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-base font-bold text-zinc-900">{section.heading}</h2>
              {Array.isArray(section.body) ? (
                <ul className="space-y-1.5">
                  {section.body.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-zinc-600"
                    >
                      <span className="mt-0.5 shrink-0 text-zinc-300" aria-hidden="true">
                        ・
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-zinc-600">{section.body}</p>
              )}
            </section>
          ))}
        </div>
      </article>

      {/* CTA */}
      <div className="border-t border-zinc-100 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href={doc.cta.href}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">←</span>
            {doc.cta.label}
          </Link>
        </div>
      </div>
    </>
  )
}
