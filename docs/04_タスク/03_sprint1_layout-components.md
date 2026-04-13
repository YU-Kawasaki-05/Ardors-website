---
title: Sprint 1 — ナビゲーション・共通コンポーネント
phase: 04
sprint: 1
updated: 2026-04-13
---

# Sprint 1: ナビゲーション・共通コンポーネント

## 並列ガイド

- **直列必須**: `ARD-03` → `ARD-04`, `ARD-05`, `ARD-06`
  - ARD-03（ナビゲーション設定）が完了してから Header/Footer/UI ブロックを実装する。
- **並列 OK**: `ARD-04`（Header）, `ARD-05`（Footer）, `ARD-06`（CTABlock/TrustBlock）
  - 3 つとも変更ファイルが重複しないため同時進行可。
- **前提**: Sprint 0（ARD-00〜02）が完了していること。

---

## ARD-03: ナビゲーション設定（単一ソースオブトゥルース）

**変更対象ファイル**: `config/navigation.ts`（新規）

```text
[Task Title]
ARD-03: 全ページのナビゲーション定義を単一ファイルに集約する

Goal
- サイト内の全ページ（URL, ラベル JA/EN, 表示順, ナビ種別）を
  1 ファイル（config/navigation.ts）に定義する。
- Header・Footer・サイトマップはすべてこの設定を読み込んで使用する（BR-76）。
- 新しいページを追加する際に変更するファイルが 3 箇所以内に収まるよう設計する。

Context
- 要件: FR-07（グローバルヘッダー）, FR-08（フッター・言語切替）, BR-76（変更容易性）
- 画面一覧: docs/01_要件定義/04_画面遷移図_screen-transition.md
- SCR-01〜12（公開）, SCR-A1〜A3（管理者）

Scope
- 変更 OK:
  - config/navigation.ts（新規作成）
  - types/navigation.ts（型定義、新規作成）
- 変更 NG:
  - app/ 以下のページファイル（ARD-04〜06 で使用する）

Implementation Hints
- 型定義の例:
  ```ts
  export type NavItem = {
    key: string        // 一意識別子 (e.g. "works")
    href: string       // パス (e.g. "/works")
    label: { ja: string; en: string }
    showInHeader: boolean
    showInFooter: boolean
    isAdmin?: boolean  // 管理者専用ページ
  }
  ```
- 公開ページ（SCR-01〜12）を showInHeader / showInFooter に振り分ける。
- 管理者ページ（SCR-A1〜A3）は `isAdmin: true` で区別する。
- 言語別ラベルは将来の i18n 対応（ARD-17）を見越して `label.ja` / `label.en` を持たせる。

Acceptance Criteria (Done)
- [ ] config/navigation.ts が存在し、全 SCR-* ページのエントリが含まれる
- [ ] NavItem 型が types/navigation.ts に定義されている
- [ ] `pnpm typecheck` が通る
- [ ] 1 エントリを追加するだけで Header/Footer に反映される設計になっている
```

---

## ARD-04: Header コンポーネント

**変更対象ファイル**: `components/layout/Header.tsx`（新規）, `app/layout.tsx`

```text
[Task Title]
ARD-04: グローバル Header コンポーネントを実装する

Goal
- サイト全ページに表示されるヘッダーを実装する。
- ARD-03 の config/navigation.ts からナビゲーション項目を読み込む。
- モバイル対応（ハンバーガーメニュー）を含む。

Context
- 要件: FR-07（グローバルヘッダー）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（Header 部分）
- 受入基準: docs/01_要件定義/05_受入基準_acceptance-criteria.md（AC-07-*）
- 言語切替 UI は ARD-17 で実装予定。このタスクではプレースホルダーボタン（表示のみ）でよい。

Scope
- 変更 OK:
  - components/layout/Header.tsx（新規）
  - app/layout.tsx（Header コンポーネントの組み込み）
- 変更 NG:
  - config/navigation.ts（ARD-03 成果物を読み込むだけ）
  - Footer（ARD-05 担当）

Implementation Hints
- Server Component として実装（インタラクションのない部分）。
- ハンバーガーメニューの開閉は `'use client'` の子コンポーネントに切り出す。
- Tailwind で実装。ブレークポイント: md（768px）でハンバーガー → 横並びナビに切替。
- アクティブなリンクのスタイル: `aria-current="page"` 属性を使用。
- ロゴはテキストで代用（画像は assets が確定後に差し替え）。
- 固定ヘッダー（sticky top-0）とし、スクロール時も表示を維持する。

Acceptance Criteria (Done)
- [ ] 全ページのレイアウト（app/layout.tsx）に Header が表示される
- [ ] config/navigation.ts の showInHeader: true の項目がヘッダーに表示される
- [ ] モバイル（375px）でハンバーガーメニューが機能する
- [ ] キーボードナビゲーション（Tab キー）でメニュー項目を移動できる（FR-75）
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-05: Footer コンポーネント

**変更対象ファイル**: `components/layout/Footer.tsx`（新規）, `app/layout.tsx`

```text
[Task Title]
ARD-05: グローバル Footer コンポーネントを実装する

Goal
- サイト全ページに表示されるフッターを実装する。
- ARD-03 の config/navigation.ts からサブナビ（showInFooter: true）を読み込む。
- コピーライト・SNS リンク・言語切替プレースホルダーを含む。

Context
- 要件: FR-08（フッター・言語切替）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（Footer 部分）
- 言語切替 UI は ARD-17 で実装。このタスクではプレースホルダーボタンでよい。

Scope
- 変更 OK:
  - components/layout/Footer.tsx（新規）
  - app/layout.tsx（Footer コンポーネントの組み込み）
- 変更 NG:
  - config/navigation.ts
  - Header（ARD-04 担当）

Implementation Hints
- Server Component として実装。
- コピーライト: `© {new Date().getFullYear()} Ardors. All rights reserved.`
- GitHub リンク: FR-31 より外部リンク（`target="_blank" rel="noopener noreferrer"`）。
- フッターナビは config/navigation.ts の showInFooter: true を使用。
- 言語切替ボタンはテキストボタン（`JA / EN`）をプレースホルダーとして配置。

Acceptance Criteria (Done)
- [ ] 全ページのレイアウトに Footer が表示される
- [ ] config/navigation.ts の showInFooter: true の項目がフッターに表示される
- [ ] GitHub へのリンクが別タブで開く
- [ ] コピーライト年が自動で現在年になる
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-06: 共通 UI ブロック（CTABlock / TrustBlock）

**変更対象ファイル**: `components/ui/CTABlock.tsx`（新規）, `components/ui/TrustBlock.tsx`（新規）

```text
[Task Title]
ARD-06: CTABlock と TrustBlock 共通コンポーネントを実装する

Goal
- 複数ページで再利用される CTA ブロックと信頼ブロックを共通コンポーネントとして実装する。
- 各ページで import して使用できる状態にする（Sprint 2 で使用）。

Context
- 要件: FR-09（ナビゲーションフロー）, FR-10（信頼ブロック）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md
- BR-02: ページあたり最低 2 CTA
- 信頼ブロック要素 4 つ: 対応ドメイン / 主要技術 / 実績サマリー / GitHub リンク

Scope
- 変更 OK:
  - components/ui/CTABlock.tsx（新規）
  - components/ui/TrustBlock.tsx（新規）
  - components/ui/index.ts（barrel export、新規または追記）
- 変更 NG:
  - app/ 以下のページファイル（Sprint 2 で使用）

Implementation Hints
- CTABlock の Props:
  ```ts
  type CTABlockProps = {
    heading: string
    description?: string
    primaryCTA: { label: string; href: string }
    secondaryCTA?: { label: string; href: string }
  }
  ```
- TrustBlock の要素:
  - domains: string[]（例: ["Web 開発", "UI/UX デザイン"]）
  - techStack: string[]（例: ["Next.js", "TypeScript", "Figma"]）
  - outcomes: string（例: "受託 12 件・継続率 80%"）
  - githubHref: string
- 両コンポーネントとも Server Component で実装。
- スタイルは Tailwind のみ（追加 CSS ファイルを作らない）。

Acceptance Criteria (Done)
- [ ] CTABlock が heading + primaryCTA を必須 Props として受け取り表示する
- [ ] TrustBlock が 4 要素（domains, techStack, outcomes, githubHref）を表示する
- [ ] `pnpm lint` / `pnpm typecheck` が通る
- [ ] Storybook や単体テストは不要（Sprint 5 の ARD-22 で追加）
```
