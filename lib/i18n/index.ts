/** @file Locale message registry. */
import type { Locale } from '@/config/i18n'

import { enMessages } from './en'
import { jaMessages } from './ja'

const MESSAGE_TABLE = {
  ja: jaMessages,
  en: enMessages,
}

export type Messages = typeof jaMessages

export function getMessages(locale: Locale): Messages {
  return MESSAGE_TABLE[locale]
}
