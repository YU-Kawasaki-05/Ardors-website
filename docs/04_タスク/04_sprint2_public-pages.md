---
title: Sprint 2 — P0 静的公開ページ群
phase: 04
sprint: 2
updated: 2026-04-13
---

# Sprint 2: P0 静的公開ページ群

## 並列ガイド

- **前提**: Sprint 1（ARD-03〜06）が完了していること。
- **すべて並列 OK**: `ARD-07`〜`ARD-14`（各ページは独立したファイルを変更）
- **例外**: `ARD-10`（実績一覧）と `ARD-11`（実績詳細）は `types/works.ts` を共有する。
  どちらかを先行させて型定義を確定させるか、型定義のみを先に別 PR（ARD-10a）として切り出す。
- 最大 3〜4 PR を同時進行することを推奨。

---

## ARD-07: トップページ (SCR-01)

**変更対象ファイル**: `app/page.tsx`

```text
[Task Title]
ARD-07: トップページ（/）を実装する

Goal
- サイトのエントリーポイントとなるトップページを実装する。
- ヒーローセクション・エントリー分岐・トラストブロック・CTA を含む。

Context
- 要件: FR-01（トップページ）, BR-01（ヒーロー 3 要素）, BR-02（CTA 2 つ以上）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（SCR-01）
- 受入基準: docs/01_要件定義/05_受入基準_acceptance-criteria.md（AC-01-*）

Scope
- 変更 OK:
  - app/page.tsx
- 変更 NG:
  - components/layout/（Header/Footer は ARD-04/05 の成果物を使うだけ）
  - config/navigation.ts

Implementation Hints
- ページ構成（上から順）:
  1. Hero: キャッチコピー（対象 / 提供価値 / CTA）
  2. Entry branches: 「相談したい / 実績を見たい / 私を知りたい」の 3 分岐ナビ（FR-09）
  3. TrustBlock コンポーネント（ARD-06）
  4. 次ページ推奨リンク 2 件（FR-09）
  5. CTABlock コンポーネント（ARD-06）
- コンテンツは日本語ハードコード（ARD-17 で i18n 化）。
- 画像はプレースホルダー（Next.js の `<Image>` with placeholder="blur" またはダミー）。

Acceptance Criteria (Done)
- [ ] / にアクセスするとトップページが表示される
- [ ] ヒーローに「対象・価値・CTA」の 3 要素が存在する（AC-01-01）
- [ ] エントリー分岐 3 リンクがそれぞれ正しいページへ遷移する
- [ ] TrustBlock と CTABlock が表示されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-08: サービスページ (SCR-02)

**変更対象ファイル**: `app/services/page.tsx`（新規）

```text
[Task Title]
ARD-08: サービスページ（/services）を実装する

Goal
- 提供サービスの一覧・説明を表示するページを実装する。

Context
- 要件: FR-02（サービスページ）, BR-02（CTA 2 つ以上）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（SCR-02）

Scope
- 変更 OK: app/services/page.tsx（新規）
- 変更 NG: 他ページ、共通コンポーネント

Implementation Hints
- ページ構成:
  1. ページタイトル + 概要
  2. サービスカード一覧（Web 開発 / UI デザイン / SaaS 開発等）
  3. 各サービスカード: サービス名・概要・価格帯（テキスト）・CTA
  4. 次推奨ページリンク 2 件
  5. CTABlock
- サービスコンテンツは定数ファイル（`data/services.ts`）に分離する（CMS 化を見越して）。

Acceptance Criteria (Done)
- [ ] /services にアクセスするとサービスページが表示される
- [ ] サービスが 2 件以上リスト表示される
- [ ] CTA が 2 つ以上存在する
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-09: プロフィールページ (SCR-03)

**変更対象ファイル**: `app/profile/page.tsx`（新規）

```text
[Task Title]
ARD-09: プロフィールページ（/profile）を実装する

Goal
- サイト運営者のプロフィール・スキルセット・経歴を表示するページを実装する。

Context
- 要件: FR-03（プロフィールページ）, BR-02（CTA 2 つ以上）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（SCR-03）
- TrustBlock で使用する技術スタックと整合させる

Scope
- 変更 OK: app/profile/page.tsx（新規）
- 変更 NG: 他ページ

Implementation Hints
- ページ構成:
  1. 氏名 + 肩書 + 一言自己紹介
  2. スキルセット（カテゴリ別タグ）
  3. 経歴タイムライン
  4. 外部リンク（GitHub・Note）
  5. CTA（お問い合わせ）
- コンテンツは data/profile.ts に定数として切り出す。
- GitHub リンクは `target="_blank" rel="noopener noreferrer"`（FR-31）。

Acceptance Criteria (Done)
- [ ] /profile にアクセスするとプロフィールページが表示される
- [ ] スキルセットが表示される
- [ ] GitHub リンクが別タブで開く
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-10: 実績一覧ページ (SCR-04)

**変更対象ファイル**: `app/works/page.tsx`（新規）, `types/works.ts`（新規）, `data/works.ts`（新規）

```text
[Task Title]
ARD-10: 実績一覧ページ（/works）を実装する

Goal
- 実績（ケーススタディ）の一覧を表示するページを実装する。
- アウトカム別フィルタリングと URL 状態保持を実装する。

Context
- 要件: FR-04（実績一覧）, BR-10（ケース詳細 3 要素）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（SCR-04）
- 受入基準: AC-04-01（フィルタ）, AC-04-02（URL 状態保持）

Scope
- 変更 OK:
  - app/works/page.tsx（新規）
  - types/works.ts（新規 — ARD-11 と共有する型定義）
  - data/works.ts（新規 — ダミーコンテンツ 3〜5 件）
- 変更 NG: 他ページ・共通コンポーネント

Implementation Hints
- Work 型:
  ```ts
  export type Work = {
    slug: string
    title: string
    category: string
    outcomes: string[]  // アウトカムタグ（フィルタ用）
    thumbnail?: string
    publishedAt: string
    published: boolean
  }
  ```
- フィルタは URL クエリパラメータ（`?outcome=xxx`）で状態を保持する（AC-04-02）。
- 未公開（published: false）の実績は一覧に表示しない（BR-11）。
- フィルタ UI は Client Component（URL 操作が必要なため）。

Acceptance Criteria (Done)
- [ ] /works に実績一覧が表示される
- [ ] アウトカムでフィルタできる
- [ ] フィルタ状態が URL に反映され、URL を共有すると同じフィルタが適用される（AC-04-02）
- [ ] 未公開実績が表示されない
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-11: 実績詳細ページ (SCR-05)

**変更対象ファイル**: `app/works/[slug]/page.tsx`（新規）

```text
[Task Title]
ARD-11: 実績詳細ページ（/works/{slug}）を実装する

Goal
- 実績（ケーススタディ）の詳細を表示する動的ルートページを実装する。
- 課題・対応・結果の 3 セクション構成で表示する。

Context
- 要件: FR-05（実績詳細）, BR-10（3 要素必須）, BR-11（未公開 → 404）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（SCR-05）
- 受入基準: AC-05-01（3 要素表示）, AC-05-02（未公開 → 404）
- 前提: ARD-10 の types/works.ts が存在すること

Scope
- 変更 OK:
  - app/works/[slug]/page.tsx（新規）
  - types/works.ts への WorkDetail 型追加
  - data/works.ts へ詳細フィールド追加
- 変更 NG: app/works/page.tsx（ARD-10 成果物）

Implementation Hints
- `generateStaticParams` で data/works.ts の published: true のスラッグを事前生成。
- 未公開または存在しないスラッグは `notFound()` を返す（AC-05-02）。
- WorkDetail 型に追加するフィールド:
  ```ts
  type WorkDetail = Work & {
    problem: string      // 課題
    solution: string     // 対応
    result: string       // 結果
    techStack: string[]
    nextWorks?: string[] // 「次に読む実績」スラッグ
  }
  ```
- ページ末尾に「次に読む実績」リンクを 2 件表示（FR-09）。

Acceptance Criteria (Done)
- [ ] /works/{slug} で実績詳細が表示される
- [ ] 課題・対応・結果の 3 セクションが存在する（AC-05-01）
- [ ] 未公開スラッグで 404 ページが返る（AC-05-02）
- [ ] 「次に読む実績」リンクが表示される
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-12: SaaS 紹介ページ (SCR-06)

**変更対象ファイル**: `app/saas/page.tsx`（新規）

```text
[Task Title]
ARD-12: SaaS 紹介ページ（/saas）を実装する

Goal
- 開発中または提供予定の SaaS プロダクトを紹介するページを実装する。

Context
- 要件: FR-06（SaaS 紹介）, BR-02（CTA 2 つ以上）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-01-06_public-core.md（SCR-06）

Scope
- 変更 OK: app/saas/page.tsx（新規）
- 変更 NG: 他ページ

Implementation Hints
- ページ構成:
  1. SaaS コンセプト（ヒーロー）
  2. 主要機能リスト
  3. 対象ユーザー像
  4. 提供予定・開発状況（WIP バッジ等）
  5. 興味を持ったユーザーへの CTA（連絡・情報登録）
- コンテンツは data/saas.ts に定数として切り出す。

Acceptance Criteria (Done)
- [ ] /saas にアクセスするとページが表示される
- [ ] CTA が 2 つ以上存在する
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-13: 法的ページ群（プライバシー / 利用規約 / 特商法）(SCR-09〜11)

**変更対象ファイル**: `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/legal/tokushoho/page.tsx`（すべて新規）

```text
[Task Title]
ARD-13: プライバシーポリシー・利用規約・特定商取引法ページを実装する

Goal
- 法的要件を満たすページ群を実装する。
- コンテンツはプレースホルダー（後で差し替え）でよい。

Context
- 要件: FR-60（プライバシーポリシー）, FR-61（利用規約）, FR-62（特商法）
- 画面: SCR-09（/privacy）, SCR-10（/terms）, SCR-11（/legal/tokushoho）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-07-12_conversion-legal.md

Scope
- 変更 OK:
  - app/privacy/page.tsx（新規）
  - app/terms/page.tsx（新規）
  - app/legal/tokushoho/page.tsx（新規）
- 変更 NG: 他ページ・レイアウト

Implementation Hints
- 3 ページとも同じ構造: ページタイトル + 最終更新日 + 条文テキスト（Markdown 形式可）。
- コンテンツは `data/legal/` 以下の個別 `.ts` ファイルに定数として切り出す。
- 更新日は ISO 形式 (`"2026-04-13"`) で定数管理する。
- フッターリンクから遷移できることを確認する。

Acceptance Criteria (Done)
- [ ] /privacy, /terms, /legal/tokushoho それぞれにアクセスできる
- [ ] 各ページにタイトルと最終更新日が表示される
- [ ] フッターのリンクから遷移できる
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-14: 404 ページ (SCR-12)

**変更対象ファイル**: `app/not-found.tsx`（新規）

```text
[Task Title]
ARD-14: 404 ページを実装する

Goal
- 存在しない URL にアクセスした際の 404 ページを実装する。
- トップページへの誘導リンクとクイックリンクを含む。

Context
- 要件: SCR-12（404）
- 受入基準: AC-12-01（404 + ホームリンク表示）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-07-12_conversion-legal.md（SCR-12）

Scope
- 変更 OK: app/not-found.tsx（新規）
- 変更 NG: 他ページ

Implementation Hints
- Next.js App Router の規約: `app/not-found.tsx` が 404 ページとして使われる。
- 構成:
  1. 404 メッセージ（日本語）
  2. トップページへ戻るリンク（メインCTA）
  3. クイックリンク 3〜4 件（サービス / 実績 / お問い合わせ）
- ユーモアや親しみやすいコピーにする（ブランドトーンに合わせて）。

Acceptance Criteria (Done)
- [ ] 存在しない URL で 404 ページが表示される
- [ ] トップページへの誘導リンクが存在する（AC-12-01）
- [ ] クイックリンクが 3 件以上ある
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```
