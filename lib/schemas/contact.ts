/** @file Zod validation schema for the contact form — shared by client and server (ARD-15/ARD-16). */
import { z } from 'zod'

import { DEFAULT_LOCALE, type Locale } from '@/config/i18n'

export const CATEGORIES = ['相談', '協業', 'その他'] as const
export type Category = (typeof CATEGORIES)[number]

type ValidationCopy = {
  nameRequired: string
  nameMax: string
  emailRequired: string
  emailInvalid: string
  categoryRequired: string
  bodyRequired: string
  bodyMax: string
}

function getValidationCopy(locale: Locale): ValidationCopy {
  if (locale === 'en') {
    return {
      nameRequired: 'Please enter your name.',
      nameMax: 'Name must be 100 characters or fewer.',
      emailRequired: 'Please enter your email address.',
      emailInvalid: 'Please enter a valid email address.',
      categoryRequired: 'Please select an inquiry type.',
      bodyRequired: 'Please enter your message.',
      bodyMax: 'Message must be 3000 characters or fewer.',
    }
  }

  return {
    nameRequired: '名前を入力してください',
    nameMax: '名前は100文字以内で入力してください',
    emailRequired: 'メールアドレスを入力してください',
    emailInvalid: '有効なメールアドレスを入力してください',
    categoryRequired: '相談種別を選択してください',
    bodyRequired: 'メッセージを入力してください',
    bodyMax: 'メッセージは3000文字以内で入力してください',
  }
}

export function getContactSchema(locale: Locale) {
  const copy = getValidationCopy(locale)

  return z.object({
    name: z.string().min(1, copy.nameRequired).max(100, copy.nameMax),
    email: z.string().min(1, copy.emailRequired).email(copy.emailInvalid),
    category: z.enum(CATEGORIES, {
      error: copy.categoryRequired,
    }),
    body: z.string().min(1, copy.bodyRequired).max(3000, copy.bodyMax),
  })
}

export const contactSchema = getContactSchema(DEFAULT_LOCALE)

export type ContactInput = z.infer<typeof contactSchema>
