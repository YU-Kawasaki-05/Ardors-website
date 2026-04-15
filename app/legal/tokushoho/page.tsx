/** @file 特定商取引法に基づく表記ページ — SCR-11 (FR-62) */
import { LegalLayout } from '@/components/ui'
import { getMessages } from '@/lib/i18n'
import { getRequestLocale } from '@/lib/i18n/request'

export default async function TokushohoPage() {
  const locale = await getRequestLocale()
  return <LegalLayout doc={getMessages(locale).legal.tokushoho} locale={locale} />
}
