---
title: Sprint 5 — セキュリティ強化・品質保証
phase: 04
sprint: 5
updated: 2026-04-17
---

# Sprint 5: セキュリティ強化・品質保証

## 並列ガイド

- **前提**: Sprint 3（ARD-15, ARD-16）が完了していること。
- **直列推奨**: `ARD-20`（セキュアヘッダー）→ `ARD-21`（バリデーション強化）
  - ARD-20 は `next.config.ts` と `middleware.ts` を変更。
  - ARD-21 は `app/api/contact/route.ts`（ARD-16 の成果物）を修正。
- **並列 OK**: `ARD-22`（テスト環境）は ARD-20/21 と並列可（変更ファイルが独立）。
- **並列 OK**: `ARD-23`（CWV 最適化）と `ARD-24`（A11y 監査）は互いに独立。

---

## ARD-20: セキュアヘッダー設定 (BR-40〜43, FR-71)

**変更対象ファイル**: `next.config.ts`, `middleware.ts`

````text
[Task Title]
ARD-20: HTTP セキュリティヘッダー（CSP / HSTS 等）を全レスポンスに付与する

Goal
- 全レスポンスに必須のセキュリティヘッダーを付与する。
- Content Security Policy を最小権限原則で設定する。

Context
- 要件: FR-71（セキュアヘッダー）, BR-42（CSP/HSTS/X-Frame-Options/X-Content-Type-Options 適用）
- 受入基準: AC-70-01（ヘッダー存在確認）

Scope
- 変更 OK:
  - next.config.ts（headers() 設定）
  - middleware.ts（CSP nonce 生成、必要な場合）
- 変更 NG: アプリケーションコード（セキュリティ設定のみ変更）

Implementation Hints
- next.config.ts の headers():
  ```ts
  const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "script-src 'self' 'nonce-{NONCE}' https://www.googletagmanager.com",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self' https://www.google-analytics.com",
        "frame-ancestors 'none'",
      ].join('; '),
    },
  ]
````

- CSP nonce が必要な場合は middleware.ts で生成し、`x-nonce` ヘッダーで渡す。
- 'unsafe-inline' を style-src に含めるのは Tailwind の都合上許容（将来的に strict-dynamic へ移行可）。

Acceptance Criteria (Done)

- [ ] `curl -I https://preview-url` で X-Content-Type-Options, X-Frame-Options, HSTS が返る
- [ ] securityheaders.com でグレード A 以上を取得する（手動確認）
- [ ] `pnpm lint` / `pnpm typecheck` / `pnpm build` が通る

````

---

## ARD-21: サーバーサイドバリデーション強化 (BR-30〜34)

**変更対象ファイル**: `app/api/contact/route.ts`, `lib/sanitize.ts`（新規）

```text
[Task Title]
ARD-21: コンタクト API の入力バリデーションを強化し、XSS/SQLi パターンを拒否する

Goal
- ARD-16 で実装した /api/contact に、XSS・SQLi 等のパターンを検出・拒否するロジックを追加する。
- 危険な文字列をサニタイズするユーティリティを lib/sanitize.ts に実装する。

Context
- 要件: BR-34（SQLi/XSS/CSRF パターン拒否）, FR-70（セキュリティ）
- 前提: ARD-16（/api/contact/route.ts が存在する）

Scope
- 変更 OK:
  - app/api/contact/route.ts（サニタイズ処理の追加）
  - lib/sanitize.ts（新規 — 危険パターン検出ユーティリティ）
- 変更 NG:
  - lib/schemas/contact.ts（Zod スキーマ変更は慎重に。変更が必要なら PR 本文で明記）
  - フォーム UI（ARD-15 の成果物）

Implementation Hints
- lib/sanitize.ts に実装するチェック:
  ```ts
  const DANGEROUS_PATTERNS = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,   // onclick= 等
    /SELECT\s+.+\s+FROM/i,
    /INSERT\s+INTO/i,
    /DROP\s+TABLE/i,
    /UNION\s+SELECT/i,
  ]

  export function containsDangerousPattern(input: string): boolean {
    return DANGEROUS_PATTERNS.some((pattern) => pattern.test(input))
  }
````

- route.ts での使用:
  - フィールドごとに `containsDangerousPattern` をチェック。
  - 検出時は 400 + `{ message: 'Invalid input' }` を返す（詳細なパターン名は含まない）。
- CSRF 対策: Next.js は SameSite Cookie をデフォルトで設定するため、追加の CSRF トークンは不要。
  ただし `Content-Type: application/json` のみを受け付ける（フォームポストを拒否）。

Acceptance Criteria (Done)

- [ ] `<script>alert(1)</script>` をフォーム送信すると 400 が返る
- [ ] `SELECT * FROM users` を本文に入れると 400 が返る
- [ ] 通常のメッセージは正常に送信できる（既存動作を壊さない）
- [ ] lib/sanitize.ts にテストが書きやすい純粋関数として実装されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る

````

---

## ARD-22: テスト環境構築 (Vitest + Playwright)

**変更対象ファイル**: `vitest.config.ts`（新規）, `tests/`（新規）, `playwright.config.ts`（新規）, `package.json`

```text
[Task Title]
ARD-22: Vitest（ユニットテスト）と Playwright（E2E テスト）の環境を構築する

Goal
- ユニットテスト（Vitest）と E2E テスト（Playwright）の実行環境を整える。
- 既存の重要ロジック（バリデーション、サニタイズ）の初期テストを作成する。

Context
- 要件: FR-76（テスト可能性）, AC-* の Gherkin 受入基準を自動化する土台
- 受入基準: docs/01_要件定義/05_受入基準_acceptance-criteria.md

Scope
- 変更 OK:
  - vitest.config.ts（新規）
  - playwright.config.ts（新規）
  - tests/unit/lib/sanitize.test.ts（新規 — ARD-21 のサニタイズ関数テスト）
  - tests/unit/lib/schemas/contact.test.ts（新規 — Zod スキーマテスト）
  - tests/e2e/contact.spec.ts（新規 — フォーム送信 E2E）
  - package.json（scripts: test, test:e2e 追加）
- 変更 NG: アプリケーションコード

Implementation Hints
- Vitest 設定:
  ```ts
  // vitest.config.ts
  import { defineConfig } from 'vitest/config'
  export default defineConfig({
    test: { environment: 'node', include: ['tests/unit/**/*.test.ts'] }
  })
````

- Playwright 設定:
  ```ts
  // playwright.config.ts
  export default defineConfig({
    testDir: './tests/e2e',
    use: { baseURL: 'http://localhost:3000' },
    webServer: { command: 'pnpm dev', url: 'http://localhost:3000', reuseExistingServer: true },
  })
  ```
- 初期ユニットテスト対象:
  - `lib/sanitize.ts` の `containsDangerousPattern`（正常系 / XSS / SQLi）
  - `lib/schemas/contact.ts` の Zod スキーマ（必須チェック / 文字数上限）
- 初期 E2E テスト対象:
  - /contact フォームで空送信するとエラー表示（AC-07-01）
  - /works で存在しないスラッグは 404 になる（AC-05-02）

Acceptance Criteria (Done)

- [ ] `pnpm test` で Vitest が実行され、初期テストがすべて pass する
- [ ] `pnpm test:e2e` で Playwright が実行され、初期 E2E テストが pass する
- [ ] CI（GitHub Actions）に test / test:e2e ステップが追加されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る

````

---

## ARD-23: Core Web Vitals 最適化 (FR-74)

**変更対象ファイル**: 各 `app/*/page.tsx`（画像最適化）, `next.config.ts`（画像ドメイン設定）

```text
[Task Title]
ARD-23: Core Web Vitals の目標値（LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1）を達成する

Goal
- Lighthouse と Web Vitals で目標値を達成する。
- 主な最適化: 画像の Next.js Image コンポーネント化・フォント最適化・不要レンダリング削減。

Context
- 要件: FR-74（Core Web Vitals 基準）
- 基準: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1（75th percentile）

Scope
- 変更 OK:
  - 全 app/*/page.tsx（`<img>` → `<Image>` 置換）
  - next.config.ts（images.remotePatterns 設定）
  - app/layout.tsx（フォント: next/font 最適化）
- 変更 NG: ビジネスロジック・API ルート・コンポーネント構造の大幅変更

Implementation Hints
- 画像: `<img>` をすべて `next/image` の `<Image>` に置換。`priority` は LCP 候補のみ。
- フォント: `next/font/google` で Google Fonts を使用（FOUT 防止）。
- CLS 対策: 画像に width/height（またはアスペクト比）を必ず指定。
- 不要な `'use client'` を削除（Server Component に戻せるものは戻す）。
- Lighthouse 計測: `pnpm build && pnpm start` 後に Chrome DevTools で計測。

Acceptance Criteria (Done)
- [ ] Lighthouse Performance スコア ≥ 90（ローカルビルド）
- [ ] LCP ≤ 2.5s, CLS ≤ 0.1 が Lighthouse で確認できる
- [ ] すべての `<img>` が `<Image>` に置換されている（または置換不要の理由が PR に明記）
- [ ] `pnpm lint` / `pnpm typecheck` が通る
````

---

## ARD-24: アクセシビリティ監査 & 修正 (FR-75)

**変更対象ファイル**: 各 `app/*/page.tsx`, `components/**/*.tsx`（修正箇所のみ）

````text
[Task Title]
ARD-24: WCAG 2.1 AA 準拠のアクセシビリティ監査を実施し、検出した問題を修正する

Goal
- axe-core / Lighthouse A11y で検出された問題をすべて解消する。
- キーボード操作・スクリーンリーダー対応・コントラスト比を基準値以上にする。

Context
- 要件: FR-75（アクセシビリティ）
- 基準: WCAG 2.1 AA 準拠
- AC-75-01: Tab キーで全インタラクティブ要素を操作できる
- AC-75-02: 見出し階層が正しい（h1 が各ページに 1 つ）
- AC-75-03: コントラスト比 4.5:1 以上（通常テキスト）

Scope
- 変更 OK:
  - 各 app/*/page.tsx（h1 追加・alt 属性修正等）
  - components/**/*.tsx（aria-label 追加・フォーカス管理等）
- 変更 NG: ビジネスロジック・レイアウト構造の大幅変更（A11y 修正の最小範囲に限定）

Implementation Hints
- 監査ツール: `pnpm dlx @axe-core/cli http://localhost:3000` または Lighthouse A11y。
- よくある修正:
  - 全 `<img>` に `alt` 属性を追加。
  - `<button>` に aria-label を追加（アイコンのみのボタン）。
  - 各ページに h1 が 1 つあることを確認（h2 → h3 の順序を守る）。
  - リンクに `aria-current="page"` を適切に設定。
  - コントラスト比: Tailwind の色クラスを変更（gray-400 → gray-600 等）。
  - フォーカスリング: `focus:outline-none` を削除し `focus-visible:ring-2` を追加。
- Playwright の A11y テスト統合:
  ```ts
  import { checkA11y } from 'axe-playwright'
  test('a11y on /contact', async ({ page }) => {
    await page.goto('/contact')
    await checkA11y(page)
  })
````

Acceptance Criteria (Done)

- [ ] Lighthouse Accessibility スコア ≥ 90
- [ ] axe-core で Critical / Serious の問題がゼロ
- [ ] Tab キーで全フォームフィールドとリンクを操作できる（AC-75-01）
- [ ] 各ページに h1 が 1 つある（AC-75-02）
- [ ] `pnpm lint` / `pnpm typecheck` が通る

```

```
