/** @file 特定商取引法に基づく表記ページ — SCR-11 (FR-62) */
import { LegalLayout } from '@/components/ui'
import { TOKUSHOHO } from '@/data/legal/tokushoho'

export default function TokushohoPage() {
  return <LegalLayout doc={TOKUSHOHO} />
}
