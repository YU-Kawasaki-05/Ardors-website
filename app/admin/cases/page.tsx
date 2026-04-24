/** @file Admin case list page with CRUD entry points and publish controls. */
import type { Metadata } from 'next'

import { buildPageMetadata } from '@/components/JsonLd'
import { type Locale } from '@/config/i18n'
import { getRequestLocale } from '@/lib/i18n/request'
import { getWorksStoreMode, listAdminWorkRecords } from '@/lib/works-store'

import AdminCasesTable from './_components/AdminCasesTable'

const ADMIN_CASES_COPY = {
  ja: {
    title: 'ケース管理',
    description: 'Ardors の実績データを管理する管理画面です。',
  },
  en: {
    title: 'Case Management',
    description: 'Admin page for managing Ardors case study data.',
  },
} as const satisfies Record<
  Locale,
  {
    title: string
    description: string
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
  const records = await listAdminWorkRecords()

  return (
    <AdminCasesTable locale={locale} initialRecords={records} storeMode={getWorksStoreMode()} />
  )
}
