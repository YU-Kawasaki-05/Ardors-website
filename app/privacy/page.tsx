/** @file Privacy policy page — SCR-09 (FR-60) */
import { LegalLayout } from '@/components/ui'
import { PRIVACY } from '@/data/legal/privacy'

export default function PrivacyPage() {
  return <LegalLayout doc={PRIVACY} />
}
