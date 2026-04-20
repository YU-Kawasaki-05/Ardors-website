/** @file Unit tests for contact form validation schema (ARD-22, FR-20/FR-76). */
import { describe, expect, it } from 'vitest'

import { contactSchema } from '@/lib/schemas/contact'

const validContactInput = {
  name: '山田 太郎',
  email: 'taro@example.com',
  category: '相談',
  body: 'Webサイト制作について相談したいです。',
}

describe('contactSchema', () => {
  it('accepts a valid contact input', () => {
    expect(contactSchema.safeParse(validContactInput).success).toBe(true)
  })

  it('rejects missing required fields', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: '',
      category: undefined,
      body: '',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      expect(errors.name).toBeDefined()
      expect(errors.email).toBeDefined()
      expect(errors.category).toBeDefined()
      expect(errors.body).toBeDefined()
    }
  })

  it('rejects body text longer than 3000 characters', () => {
    const result = contactSchema.safeParse({
      ...validContactInput,
      body: 'a'.repeat(3001),
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.body).toBeDefined()
    }
  })
})
