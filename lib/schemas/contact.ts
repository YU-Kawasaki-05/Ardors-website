/** @file Zod validation schema for the contact form — shared by client and server (ARD-15/ARD-16). */
import { z } from 'zod'

export const CATEGORIES = ['相談', '協業', 'その他'] as const
export type Category = (typeof CATEGORIES)[number]

export const contactSchema = z.object({
  name: z.string().min(1, '名前を入力してください').max(100, '名前は100文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  category: z.enum(CATEGORIES, {
    error: '相談種別を選択してください',
  }),
  body: z
    .string()
    .min(1, 'メッセージを入力してください')
    .max(3000, 'メッセージは3000文字以内で入力してください'),
})

export type ContactInput = z.infer<typeof contactSchema>
