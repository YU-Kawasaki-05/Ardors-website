---
title: 全 PR 共通ブロック
phase: 04
updated: 2026-04-13
---

# 01_共通ブロック — 全 PR プロンプトへの共通付記

各タスクプロンプトの末尾に **必ず** このブロックを貼り付けて AI に渡すこと。

---

## A. プロジェクト概要ブロック（コンテキスト確立用）

```text
## Project Context

Repository: Ardors-website
Purpose: 個人ポートフォリオ兼 SaaS 紹介サイト（freelance designer/developer 向け）
Framework: Next.js (App Router) + TypeScript + Tailwind CSS
Deploy: Vercel Hobby

Docs reference:
- docs/01_要件定義/03_機能一覧_feature-list.md  ... FR-* 一覧
- docs/01_要件定義/04_画面遷移図_screen-transition.md ... SCR-* 一覧
- docs/01_要件定義/05_受入基準_acceptance-criteria.md ... AC-* (Gherkin)
- docs/01_要件定義/wireframes/ ... 画面ワイヤーフレーム
- docs/00_共通/用語集_glossary.md ... 用語定義

Key constraints (BR-*):
- BR-76: ナビゲーション定義は単一ファイルに集約する
- BR-40〜43: サーバーサイドバリデーション必須・セキュアヘッダー必須
- FR-74: LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1（75th percentile）
- FR-75: WCAG 2.1 AA 準拠（キーボード操作・コントラスト比 4.5:1 以上）
```

---

## B. 「詰まったとき」ブロック

```text
If blocked:
- 外部サービス / ENV / Secrets が必要で失敗する場合、値を推測して追加しない。
- 代わりに、どのコマンドで何が不足しているかを PR 本文に明記して停止する。
- `.env.example` に必要な変数名（値なし）を追記して PR に含める。
```

---

## C. クオリティバーブロック

```text
Quality bar:
- 変更は最小限。既存の実装パターン・命名・型定義に合わせる。
- スコープ外の修正は行わない。必要なら「次 PR 提案」として PR 本文に記載する。
- 新規ファイルには `/** @file <説明> */` JSDoc コメントを冒頭に付与する。
- Tailwind クラスは `cn()` utility（clsx + tailwind-merge）経由で結合する。
- `any` 型を使わない。型が不明な場合は `unknown` + type guard を使う。
- Server Component / Client Component の境界を意識する（不要な `"use client"` を付けない）。
```

---

## D. PR レポートフォーマット（必須）

```text
PR report format (必須):
1) What（何を変えたか — 変更ファイル列挙）
2) Why（なぜ必要か — 対応する FR-* / SCR-* / AC-* を明記）
3) How to test（実行コマンドと期待結果）
4) Risks / Follow-ups
5) Human action required（手動作業の有無）

Self-review (3 行):
- 1 PR スコープを守れているか
- Done が機械判定可能か（lint/typecheck/test が pass するか）
- ENV / 外部依存で詰まりそうな点がないか
```

---

## E. バリデーションコマンドブロック

```text
Validation commands:
- 基本: `pnpm lint` / `pnpm typecheck` / `pnpm test`
- 可能なら: `pnpm build`（失敗時は Secrets を推測せず、不足 ENV を PR 本文へ記載）
- E2E: `pnpm test:e2e`（Playwright — テスト環境構築後に有効）
```

---

## F. プロンプト末尾テンプレート（コピー用）

実際に AI へ渡すプロンプトの末尾に、上記 A〜E を結合した以下のブロックを貼り付けてください。

```text
---
## Project Context

Repository: Ardors-website
Purpose: 個人ポートフォリオ兼 SaaS 紹介サイト（freelance designer/developer 向け）
Framework: Next.js (App Router) + TypeScript + Tailwind CSS
Deploy: Vercel Hobby

Docs reference:
- docs/01_要件定義/03_機能一覧_feature-list.md
- docs/01_要件定義/05_受入基準_acceptance-criteria.md
- docs/01_要件定義/wireframes/

Key constraints:
- BR-76: ナビゲーション定義は単一ファイルに集約
- BR-40〜43: サーバーサイドバリデーション必須・セキュアヘッダー必須
- FR-74: LCP ≤ 2.5s / INP ≤ 200ms / CLS ≤ 0.1
- FR-75: WCAG 2.1 AA 準拠

If blocked:
- 外部サービス / ENV / Secrets が必要で失敗する場合、値を推測しない。
- 不足 ENV を `.env.example` に追記し PR 本文に明記して停止する。

Quality bar:
- 変更は最小限。既存パターン・命名に合わせる。
- 新規ファイルには /** @file */ JSDoc を付与。
- Tailwind は cn() 経由、`any` 型を使わない。
- 不要な "use client" を付けない。

PR report format (必須):
1) What 2) Why（FR-*/SCR-* 明記） 3) How to test 4) Risks/Follow-ups 5) Human action required

Self-review: スコープ守れているか / Done が機械判定可能か / ENV 詰まり点はないか

Validation commands:
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build`
---
```
