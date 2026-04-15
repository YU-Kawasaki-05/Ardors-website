/**
 * @file 404 Not Found page — SCR-12 (AC-12-01)
 *
 * Rendered by Next.js App Router when no route matches or notFound() is called.
 */
import Link from 'next/link'

const QUICK_LINKS = [
  { label: 'サービスを見る', href: '/services' },
  { label: '実績を見る', href: '/works' },
  { label: 'プロフィール', href: '/profile' },
  { label: 'お問い合わせ', href: '/contact' },
]

export default function NotFound() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center py-24 text-center">
      <div className="mx-auto max-w-lg px-4 sm:px-6">
        {/* 404 indicator */}
        <p
          className="text-8xl font-bold tracking-tight text-zinc-100 select-none"
          aria-hidden="true"
        >
          404
        </p>

        <h1 className="-mt-4 text-2xl font-bold text-zinc-900 sm:text-3xl">
          ページが見つかりません
        </h1>

        <p className="mt-4 text-base leading-relaxed text-zinc-500">
          お探しのページは移動または削除された可能性があります。
          <br />
          URL をご確認のうえ、以下のリンクからご覧ください。
        </p>

        {/* Main CTA — AC-12-01 */}
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-7 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          トップへ戻る
        </Link>

        {/* Quick links — 3 件以上 (AC-12-01) */}
        <nav aria-label="クイックリンク" className="mt-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            よく見られているページ
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
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
