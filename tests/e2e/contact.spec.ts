/** @file E2E acceptance tests for contact validation and protected work detail routes. */
import { expect, test } from '@playwright/test'

test('empty contact submission shows required field errors', async ({ page }) => {
  await page.goto('/contact')

  await page.getByRole('button', { name: '送信する' }).click()

  await expect(page.getByText('名前を入力してください')).toBeVisible()
  await expect(page.getByText('メールアドレスを入力してください')).toBeVisible()
  await expect(page.getByText('相談種別を選択してください')).toBeVisible()
  await expect(page.getByText('メッセージを入力してください')).toBeVisible()
})

test('unpublished work detail returns 404', async ({ page }) => {
  const response = await page.goto('/works/tech-consulting-nda')

  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'ページが見つかりません' })).toBeVisible()
  await expect(page.getByText('NDA')).toHaveCount(0)
})
