/** @file Admin case editor page for create and update flows. */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { buildPageMetadata } from '@/components/JsonLd'
import { type Locale } from '@/config/i18n'
import { getRequestLocale } from '@/lib/i18n/request'
import { getAdminWorkRecordById } from '@/lib/works-store'

import CaseEditorForm from '../_components/CaseEditorForm'

type AdminCaseEditorPageProps = {
  params: Promise<{ id: string }>
}

const COPY = {
  ja: {
    createTitle: 'ケース新規作成',
    editTitle: 'ケース編集',
    createDescription: '管理画面から新しい実績を追加します。',
    editDescription: '管理画面から既存の実績を更新します。',
  },
  en: {
    createTitle: 'Create Case',
    editTitle: 'Edit Case',
    createDescription: 'Add a new case study from the admin CMS.',
    editDescription: 'Update an existing case study from the admin CMS.',
  },
} as const satisfies Record<
  Locale,
  {
    createTitle: string
    editTitle: string
    createDescription: string
    editDescription: string
  }
>

export async function generateMetadata({ params }: AdminCaseEditorPageProps): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = COPY[locale]
  const { id } = await params

  return {
    ...buildPageMetadata({
      locale,
      pathname: `/admin/cases/${id}`,
      title: id === 'new' ? t.createTitle : t.editTitle,
      description: id === 'new' ? t.createDescription : t.editDescription,
    }),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function AdminCaseEditorPage({ params }: AdminCaseEditorPageProps) {
  const locale = await getRequestLocale()
  const { id } = await params

  if (id === 'new') {
    return <CaseEditorForm locale={locale} mode="create" />
  }

  const record = await getAdminWorkRecordById(id)

  if (!record) {
    notFound()
  }

  return <CaseEditorForm locale={locale} mode="edit" record={record} />
}
