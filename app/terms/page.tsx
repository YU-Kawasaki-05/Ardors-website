/** @file Terms of use page — SCR-10 (FR-61) */
import { LegalLayout } from '@/components/ui'
import { TERMS } from '@/data/legal/terms'

export default function TermsPage() {
  return <LegalLayout doc={TERMS} />
}
