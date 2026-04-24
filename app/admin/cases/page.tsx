/** @file Minimal protected admin cases placeholder until ARD-32 ships the CMS UI. */
import type { Metadata } from 'next'

import { buildPageMetadata } from '@/components/JsonLd'
import { type Locale } from '@/config/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

const ADMIN_CASES_COPY = {
  ja: {
    title: 'ケース管理',
    description: 'Ardors の実績データを管理する管理者向けプレースホルダー画面です。',
    eyebrow: 'Admin Cases',
    heading: 'ケース管理',
    body: 'ARD-31 では認証基盤とアクセス制御までを実装し、この画面は ARD-32 で CMS として拡張します。',
  },
  en: {
    title: 'Case Management',
    description: 'Protected placeholder page for the Ardors case management area.',
    eyebrow: 'Admin Cases',
    heading: 'Case Management',
    body: 'ARD-31 delivers the auth baseline and route guard. ARD-32 will expand this screen into the full CMS.',
  },
} as const satisfies Record<
  Locale,
  {
    title: string
    description: string
    eyebrow: string
    heading: string
    body: string
  }
>

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = ADMIN_CASES_COPY[locale]

  return {
    ...buildPageMetadata({
      locale,
      pathname: '/admin/cases',
      title: t.title,
      description: t.description,
    }),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function AdminCasesPage() {
  const locale = await getRequestLocale()
  const t = ADMIN_CASES_COPY[locale]

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">
          {t.eyebrow}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{t.heading}</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-zinc-600">{t.body}</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <p className="text-sm leading-relaxed text-zinc-600">
          {locale === 'ja'
            ? 'このページに到達できれば、/admin 配下の認証ガードとセッション維持は機能しています。'
            : 'If you can reach this page, the /admin session and route guard are working.'}
        </p>
      </div>
    </section>
  )
}
