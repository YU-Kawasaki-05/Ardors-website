---
title: タスクサマリー（AI プロンプト一覧）
phase: 04
status: draft
updated: 2026-04-17
---

# 04\_タスク — サマリー

## このフォルダの目的

各ドキュメントは、AI エージェント（Claude Code / Codex 等）に渡す **実装プロンプト集** です。
個々のコーディング手順ではなく、「1PR = 1プロンプト」の粒度で記述します。

---

## ファイル構成

| ファイル                                                                 | 内容                                         |
| ------------------------------------------------------------------------ | -------------------------------------------- |
| [00\_サマリー\_summary.md](./00_サマリー_summary.md)                     | このファイル。全体像・並列ガイド・ID対応表   |
| [01\_共通ブロック\_common-blocks.md](./01_共通ブロック_common-blocks.md) | 全プロンプト末尾に付与する共通ブロック       |
| [02_sprint0_setup.md](./02_sprint0_setup.md)                             | Sprint 0: プロジェクトセットアップ           |
| [03_sprint1_layout-components.md](./03_sprint1_layout-components.md)     | Sprint 1: ナビゲーション・共通コンポーネント |
| [04_sprint2_public-pages.md](./04_sprint2_public-pages.md)               | Sprint 2: P0 静的公開ページ群                |
| [05_sprint3_contact.md](./05_sprint3_contact.md)                         | Sprint 3: コンタクトフォーム + API           |
| [06_sprint4_i18n-seo.md](./06_sprint4_i18n-seo.md)                       | Sprint 4: 国際化 (JA/EN) + SEO/OGP           |
| [07_sprint5_security-quality.md](./07_sprint5_security-quality.md)       | Sprint 5: セキュリティ強化・品質保証         |
| [08_backlog_p1-cms.md](./08_backlog_p1-cms.md)                           | Backlog (P1): CMS・Note RSS・Search Console  |

---

## 0.1 タスク ID 体系

```
ARD-XX  ... Ardors Website 実装タスク
          XX = 00〜29: P0 コア実装
          XX = 30〜: P1 バックログ
```

---

## 0.2 並列実行ガイド

### 基本方針

- **依存のない PR のみ** 並列実行する（最大 2〜3 本推奨）。
- 同じファイルを変更する PR 同士は **直列** にする。
- 各タスクの `変更対象ファイル` 欄を必ず確認してから並列判断を行う。
- Sprint 0（セットアップ）は必ず完了してから Sprint 1 以降へ進む。

---

### Sprint 0: プロジェクトセットアップ（直列必須）

- **直列必須**: `ARD-00` → `ARD-01` → `ARD-02`
  - Next.js 初期化 → 開発ツール設定 → CI/CD 設定 の順に依存する。
  - このスプリント完了後に全員が着手可能になる。

---

### Sprint 1: ナビゲーション・共通コンポーネント

- **直列必須**: `ARD-03` → `ARD-04`, `ARD-05`
  - `ARD-03`（ナビゲーション設定）が完了してから Header/Footer を実装する。
- **並列 OK**: `ARD-04` と `ARD-05`
  - Header と Footer は変更ファイルが重複しない。
- **並列 OK**: `ARD-06`（共通 UI ブロック）は `ARD-03` 完了後、`ARD-04`/`ARD-05` と並列可。

---

### Sprint 2: P0 静的公開ページ群（高並列）

- **前提**: Sprint 1 の `ARD-03`〜`ARD-06` が完了していること。
- **すべて並列 OK**: `ARD-07`, `ARD-08`, `ARD-09`, `ARD-10`, `ARD-11`, `ARD-12`, `ARD-13`, `ARD-14`
  - 各ページは独立したファイル (`app/xxx/page.tsx`) を持ち、重複しない。
  - ただし `ARD-10`（実績一覧）と `ARD-11`（実績詳細）は **共通の型定義** (`types/works.ts`) を触るため、型定義を先に確定させるか、片方を先行マージする。

---

### Sprint 3: コンタクトフォーム + API（直列必須）

- **直列必須**: `ARD-15` → `ARD-16`
  - フォーム UI (`app/contact/page.tsx`) → API ルート (`app/api/contact/route.ts`) の順に実装。
  - `ARD-16` は `ARD-15` の型定義・バリデーションスキーマに依存する。
- **並列 OK**: `ARD-15` は Sprint 2 と並列可（変更ファイルが独立）。

---

### Sprint 4: 国際化・SEO（部分並列）

- **並列 OK**: `ARD-17`（国際化）と `ARD-18`（OGP/SEO）は独立。
  - ただし `ARD-17` は全ページの `layout.tsx` と `page.tsx` に触るため、Sprint 2 が完全マージ済みであること。
- **直列**: `ARD-19`（GA4 基本統合）は `ARD-18` の `<head>` 構造確定後に実施。
- **直列**: `ARD-25`（GA4 行動イベント実装）は `ARD-19` 完了後に実施。

---

### Sprint 5: セキュリティ・品質（直列推奨）

- **直列推奨**: `ARD-20`（セキュアヘッダー）→ `ARD-21`（バリデーション強化）
  - `ARD-20` は `next.config.ts` と `middleware.ts` を変更。
  - `ARD-21` は `app/api/contact/route.ts`（Sprint 3 依存）を変更。
- **並列 OK**: `ARD-22`（テスト環境）は Sprint 2 完了後、`ARD-20`/`ARD-21` と並列可。
- **並列 OK**: `ARD-23`（CWV 最適化）と `ARD-24`（A11y）は互いに独立。

---

### Backlog (P1): CMS・Note RSS・Search Console（低優先度）

- **並列非推奨**: `ARD-30`（Note RSS）と `ARD-31`（管理者認証）は `app/` の異なる領域だが、P0 完了後に着手。
- **直列必須**: `ARD-31` → `ARD-32`（CMS）— 認証基盤が先。
- **並列 OK**: `ARD-33`（Search Console）は他の P1 と独立。

---

## 0.3 ヒューマンゲート

### ゲート A（Sprint 0 完了後 — 環境確認）

- `pnpm dev` でローカル開発サーバーが起動することを確認。
- Vercel へのプレビューデプロイが成功することを確認。
- `.env.local` / `.env.example` が揃っていることを確認。

### ゲート B（Sprint 2 完了後 — 全ページ目視確認）

- 全 12 ページ（SCR-01〜SCR-12）がブラウザで表示されることを確認。
- モバイル表示（375px, 768px）で崩れがないことを確認。

### ゲート C（Sprint 3 完了後 — コンタクトフォーム動作確認）

- 正常系：メール送信 or DB 保存が成功することを確認。
- 異常系：バリデーションエラー・レート制限が動作することを確認。

### ゲート D（Sprint 5 完了後 — 本番リリース前）

- `pnpm lint && pnpm typecheck && pnpm test` が全 pass。
- Lighthouse スコア：Performance ≥ 90, A11y ≥ 90, Best Practices ≥ 90, SEO ≥ 90。
- セキュリティヘッダー検査（securityheaders.com 等）でグレード A 以上。
- CVSS 7.0+ の脆弱性ゼロ（`pnpm audit` 確認）。

---

## 0.4 ARD ID → FR / SCR 対応表

| ARD    | 対応 FR / SCR                   | 概要                                                   | スプリント   |
| ------ | ------------------------------- | ------------------------------------------------------ | ------------ |
| ARD-00 | —                               | Next.js プロジェクト初期化                             | Sprint 0     |
| ARD-01 | —                               | TypeScript + Tailwind + ESLint + Prettier              | Sprint 0     |
| ARD-02 | —                               | Git hooks + Vercel CI/CD                               | Sprint 0     |
| ARD-03 | FR-07, FR-08, BR-76             | ナビゲーション設定（単一ソース）                       | Sprint 1     |
| ARD-04 | FR-07                           | Header コンポーネント                                  | Sprint 1     |
| ARD-05 | FR-08                           | Footer コンポーネント                                  | Sprint 1     |
| ARD-06 | FR-09, FR-10                    | CTABlock / TrustBlock 共通コンポーネント               | Sprint 1     |
| ARD-07 | FR-01, SCR-01                   | トップページ                                           | Sprint 2     |
| ARD-08 | FR-02, SCR-02                   | サービスページ                                         | Sprint 2     |
| ARD-09 | FR-03, SCR-03                   | プロフィールページ                                     | Sprint 2     |
| ARD-10 | FR-04, SCR-04                   | 実績一覧ページ                                         | Sprint 2     |
| ARD-11 | FR-05, SCR-05                   | 実績詳細ページ                                         | Sprint 2     |
| ARD-12 | FR-06, SCR-06                   | SaaS 紹介ページ                                        | Sprint 2     |
| ARD-13 | FR-60, FR-61, FR-62, SCR-09〜11 | プライバシー・利用規約・特商法ページ                   | Sprint 2     |
| ARD-14 | SCR-12                          | 404 ページ                                             | Sprint 2     |
| ARD-15 | FR-20, FR-21, SCR-07, SCR-08    | コンタクトフォーム UI                                  | Sprint 3     |
| ARD-16 | FR-22, BR-30〜34                | コンタクト API + レート制限                            | Sprint 3     |
| ARD-17 | FR-08 (i18n)                    | JA/EN 国際化                                           | Sprint 4     |
| ARD-18 | FR-73                           | OGP メタタグ + 構造化データ                            | Sprint 4     |
| ARD-19 | FR-32                           | GA4 基本統合                                           | Sprint 4     |
| ARD-20 | BR-40〜43, FR-71                | セキュアヘッダー (CSP/HSTS 等)                         | Sprint 5     |
| ARD-21 | BR-30〜34, FR-70                | サーバーサイドバリデーション強化                       | Sprint 5     |
| ARD-22 | FR-76                           | テスト環境構築 (Vitest + Playwright)                   | Sprint 5     |
| ARD-23 | FR-74                           | Core Web Vitals 最適化                                 | Sprint 5     |
| ARD-24 | FR-75                           | A11y 監査 & 修正                                       | Sprint 5     |
| ARD-25 | FR-32                           | GA4 行動イベント計測（CTA/実績詳細/フォーム到達/送信） | Sprint 4     |
| ARD-30 | FR-30                           | Note RSS 統合                                          | Backlog (P1) |
| ARD-31 | FR-42, SCR-A1                   | 管理者認証                                             | Backlog (P1) |
| ARD-32 | FR-40, FR-41, SCR-A2, SCR-A3    | ケース CMS (CRUD + 公開管理)                           | Backlog (P1) |
| ARD-33 | FR-33                           | Google Search Console 統合                             | Backlog (P1) |
