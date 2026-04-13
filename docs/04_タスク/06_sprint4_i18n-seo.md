---
title: Sprint 4 — 国際化 (JA/EN) + SEO/OGP
phase: 04
sprint: 4
updated: 2026-04-13
---

# Sprint 4: 国際化 (JA/EN) + SEO/OGP

## 並列ガイド

- **前提**: Sprint 2（ARD-07〜14）が完全マージ済みであること。
  - ARD-17 は全ページの `layout.tsx` と `page.tsx` に触るため、Sprint 2 完了後に着手する。
- **並列 OK**: `ARD-17`（国際化）と `ARD-18`（OGP/SEO）は独立して進行可。
- **直列**: `ARD-19`（GA4）は ARD-18 の `<head>` 構造確定後に実施を推奨。

---

## ARD-17: JA/EN 国際化対応 (FR-08)

**変更対象ファイル**: `config/i18n.ts`（新規）, `lib/i18n/ja.ts`（新規）, `lib/i18n/en.ts`（新規）, 各 `app/*/page.tsx`（言語切替対応）

```text
[Task Title]
ARD-17: サイト全体に JA/EN 言語切替を実装する

Goal
- 全ページで日本語・英語を切り替えられる仕組みを実装する。
- 言語切替時にページコンテキスト（現在の URL）を保持する（BR-20）。
- 翻訳文字列は lib/i18n/ 以下のファイルで一元管理する（BR-21: プレースホルダー禁止）。

Context
- 要件: FR-08（言語切替）, BR-20（切替時ページ保持）, BR-21（プレースホルダー禁止）
- config/navigation.ts には既に label.ja / label.en が定義されている（ARD-03）

Scope
- 変更 OK:
  - config/i18n.ts（言語設定、新規）
  - lib/i18n/ja.ts（日本語文字列、新規）
  - lib/i18n/en.ts（英語文字列、新規）
  - app/layout.tsx（言語設定の組み込み）
  - 各 app/*/page.tsx（ハードコードされたテキストを i18n 関数経由に置き換え）
  - components/layout/Header.tsx（言語切替ボタンの実装）
  - components/layout/Footer.tsx（言語切替ボタンの実装）
- 変更 NG:
  - app/api/ 以下（API は言語対応不要）

Implementation Hints
- 実装方針: Next.js 組み込みの `next-intl` ライブラリ または 独自シンプル実装を選択する。
  - `next-intl` 推奨（App Router 対応、ルーティング統合が容易）。
  - URL 構造: `/ja/...` / `/en/...` の prefix 方式 or `?lang=en` クエリ方式。
  - BR-20 を満たすなら prefix 方式（`/en/services` 等）が確実。
- 言語切替ボタン: Header / Footer の ARD-04/05 のプレースホルダーを本実装に差し替え。
- 翻訳キー命名: `page.top.hero.title`, `nav.services` 等のドット記法。
- 英語コンテンツはネイティブ品質でなくてよい（後で修正可）が、BR-21 により未翻訳の日本語文字列は残さない。

Acceptance Criteria (Done)
- [ ] Header / Footer に言語切替ボタンが表示される
- [ ] 言語を切り替えると全ページのコンテンツが切り替わる
- [ ] 言語切替時に現在のページを保持する（/en/works → /ja/works 等、BR-20）
- [ ] 翻訳されていない文字列がない（BR-21）
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-18: OGP メタタグ + 構造化データ (FR-71)

**変更対象ファイル**: `app/layout.tsx`, 各 `app/*/page.tsx`（metadata export 追加）

```text
[Task Title]
ARD-18: 全ページに OGP メタタグと構造化データ（JSON-LD）を実装する

Goal
- 各ページに適切な title / description / OGP タグを設定する。
- 主要ページに JSON-LD 構造化データを追加する（SEO 強化）。

Context
- 要件: FR-71（SEO/OGP 対応）
- Next.js の Metadata API（`export const metadata`）を使用する。

Scope
- 変更 OK:
  - app/layout.tsx（デフォルト metadata 設定）
  - 各 app/*/page.tsx（ページ個別の metadata export 追加）
  - components/JsonLd.tsx（JSON-LD 注入コンポーネント、新規）
- 変更 NG: API ルート・共通コンポーネント（Header/Footer）

Implementation Hints
- app/layout.tsx の defaultMetadata:
  ```ts
  export const metadata: Metadata = {
    title: { default: 'Ardors', template: '%s | Ardors' },
    description: 'フリーランス Web 開発者・デザイナーの Ardors ポートフォリオ',
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: 'https://ardors.jp',
      siteName: 'Ardors',
    },
    twitter: { card: 'summary_large_image' },
  }
  ```
- 各ページでの上書き例（app/works/[slug]/page.tsx）:
  ```ts
  export async function generateMetadata({ params }): Promise<Metadata> {
    const work = getWork(params.slug)
    return {
      title: work.title,
      description: work.summary,
      openGraph: { images: [work.thumbnail ?? '/og-default.png'] },
    }
  }
  ```
- JSON-LD 対象ページ: トップ（WebSite）, プロフィール（Person）, 実績詳細（Article）。
- OGP 画像は public/og-default.png をプレースホルダーとして配置（1200x630px の単色 PNG でよい）。

Acceptance Criteria (Done)
- [ ] 全ページに title と description が設定されている
- [ ] トップページの OGP タグが SNS シェア時に正しく表示される（手動確認）
- [ ] 実績詳細ページに Article JSON-LD が含まれる
- [ ] `<head>` に重複した title タグが存在しない
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-19: GA4 基本統合 (FR-32)

**変更対象ファイル**: `components/GoogleAnalytics.tsx`（新規）, `app/layout.tsx`

```text
[Task Title]
ARD-19: Google Analytics 4 をサイトに統合する

Goal
- GA4 トラッキングタグを全ページに組み込む。
- ページビューの自動計測を有効にする。
- NEXT_PUBLIC_GA4_ID 環境変数経由で設定し、開発環境では無効化する。

Context
- 要件: FR-32（GA4 イベントトラッキング）
- 前提: ARD-18 の `<head>` 構造確定後

Scope
- 変更 OK:
  - components/GoogleAnalytics.tsx（新規）
  - app/layout.tsx（GoogleAnalytics コンポーネントの追加）
  - .env.example（NEXT_PUBLIC_GA4_ID= を追記）
- 変更 NG: 他ページ・API ルート

Implementation Hints
- Client Component として実装（`'use client'`）。
- `next/script` の `strategy="afterInteractive"` で gtag.js を読み込む。
- `NEXT_PUBLIC_GA4_ID` が未設定の場合はスクリプトを注入しない（開発環境対応）。
- コンタクトフォーム送信の `contact_submit` イベントは ARD-15 で別途実装してもよい（スコープ外 → 次 PR 提案）。

Acceptance Criteria (Done)
- [ ] NEXT_PUBLIC_GA4_ID を設定すると `<head>` に gtag スクリプトが注入される
- [ ] NEXT_PUBLIC_GA4_ID が未設定のとき何も注入されない
- [ ] .env.example に NEXT_PUBLIC_GA4_ID= が追記されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```
