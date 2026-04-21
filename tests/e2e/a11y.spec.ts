/** @file Accessibility audits for public pages (ARD-24, FR-75). */
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const PUBLIC_PATHS = [
  '/ja',
  '/ja/services',
  '/ja/profile',
  '/ja/works',
  '/ja/works/corporate-site-renewal',
  '/ja/saas',
  '/ja/contact',
  '/ja/contact/complete',
  '/ja/privacy',
  '/ja/terms',
  '/ja/legal/tokushoho',
] as const

type HeadingInfo = {
  level: number
  text: string
}

function formatAxeViolations(
  violations: Awaited<ReturnType<InstanceType<typeof AxeBuilder>['analyze']>>['violations'],
): string {
  return violations
    .map((violation) => {
      const targets = violation.nodes.map((node) => node.target.join(' ')).join(', ')
      return `${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help} [${targets}]`
    })
    .join('\n')
}

test.describe('accessibility audit', () => {
  for (const path of PUBLIC_PATHS) {
    test(`${path} has no serious axe issues and a valid heading outline`, async ({ page }) => {
      await page.goto(path)

      const axeResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      const blockingViolations = axeResults.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious',
      )

      expect(blockingViolations, formatAxeViolations(blockingViolations)).toEqual([])

      const h1Count = await page.locator('h1').count()
      expect(h1Count).toBe(1)

      const headings = await page.locator('h1, h2, h3, h4, h5, h6').evaluateAll((elements) =>
        elements.map((element) => ({
          level: Number(element.tagName.slice(1)),
          text: element.textContent?.trim() ?? '',
        })),
      )
      expect(getSkippedHeading(headings)).toBeNull()
    })
  }
})

test('contact form fields are reachable with Tab in a logical order', async ({ page }) => {
  await page.goto('/ja/contact')

  await page.getByLabel('お名前').focus()
  await expect(page.getByLabel('お名前')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByLabel('メールアドレス')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByLabel('相談種別')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByLabel('メッセージ')).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('main').getByRole('link', { name: 'プライバシーポリシー' }),
  ).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: '送信する' })).toBeFocused()
})

function getSkippedHeading(headings: HeadingInfo[]): HeadingInfo | null {
  let previousLevel = 0

  for (const heading of headings) {
    if (previousLevel > 0 && heading.level > previousLevel + 1) {
      return heading
    }

    previousLevel = heading.level
  }

  return null
}
