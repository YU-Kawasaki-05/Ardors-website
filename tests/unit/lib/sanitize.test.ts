/** @file Unit tests for dangerous input pattern detection (ARD-22, BR-34). */
import { describe, expect, it } from 'vitest'

import { containsDangerousPattern } from '@/lib/sanitize'

describe('containsDangerousPattern', () => {
  it('allows normal inquiry text', () => {
    expect(containsDangerousPattern('Next.js のサイト制作について相談したいです。')).toBe(false)
  })

  it('detects XSS-oriented input', () => {
    expect(containsDangerousPattern('<script>alert(1)</script>')).toBe(true)
    expect(containsDangerousPattern('javascript:alert(1)')).toBe(true)
    expect(containsDangerousPattern('<img src=x onerror=alert(1)>')).toBe(true)
  })

  it('detects SQL injection-oriented input', () => {
    expect(containsDangerousPattern('SELECT * FROM users')).toBe(true)
    expect(containsDangerousPattern('INSERT INTO users VALUES (1)')).toBe(true)
    expect(containsDangerousPattern('DROP TABLE contacts')).toBe(true)
    expect(containsDangerousPattern('UNION SELECT password FROM users')).toBe(true)
  })
})
