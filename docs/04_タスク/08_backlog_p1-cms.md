---
title: Backlog (P1) — CMS・Note RSS・GA4 拡張
phase: 04
sprint: backlog
updated: 2026-04-13
---

# Backlog (P1): CMS・Note RSS・GA4 拡張

## 並列ガイド

- **前提**: Sprint 0〜5（P0 全タスク）が完了していること。
- **直列必須**: `ARD-31`（管理者認証）→ `ARD-32`（CMS 実装）
  - 認証基盤なしに CMS 画面を実装しない。
- **並列 OK**: `ARD-30`（Note RSS）は他の P1 タスクと独立。
- **並列 OK**: `ARD-33`（Search Console）は他と独立。
- **並列非推奨**: `ARD-31` と `ARD-32` は同じ `app/admin/` ディレクトリを変更するため直列。

---

## ARD-30: Note RSS 統合 (FR-30)

**変更対象ファイル**: `app/notes/page.tsx`（新規）, `lib/note-rss.ts`（新規）

```text
[Task Title]
ARD-30: Note の RSS フィードを取得してブログ記事一覧ページ（/notes）に表示する

Goal
- Note の RSS エンドポイントから記事一覧を取得し、/notes ページに表示する。
- 記事クリックで Note の元ページへ外部遷移する（自前 MDX ブログは作らない）。

Context
- 要件: FR-30（Note RSS 統合）
- Note の RSS URL は .env.example の NOTE_RSS_URL に設定する。
- ISR（Incremental Static Regeneration）で定期再取得する（Vercel Hobby 対応）。

Scope
- 変更 OK:
  - lib/note-rss.ts（RSS フェッチ・パース、新規）
  - app/notes/page.tsx（新規）
  - .env.example（NOTE_RSS_URL= 追記）
  - config/navigation.ts（/notes ページのエントリ追加）
- 変更 NG: 他ページ・API ルート

Implementation Hints
- RSS パース: `fast-xml-parser` または `rss-parser` ライブラリを使用。
- Next.js の fetch キャッシュ:
  ```ts
  const res = await fetch(process.env.NOTE_RSS_URL!, {
    next: { revalidate: 3600 }, // 1 時間ごとに再取得
  })
  ```
- 取得フィールド: title / link / pubDate / description（抜粋）。
- NOTE_RSS_URL が未設定の場合はプレースホルダーカード 3 件を表示する（開発環境対応）。

Acceptance Criteria (Done)
- [ ] /notes に Note の記事一覧が表示される
- [ ] 各記事リンクで Note の元ページへ別タブで遷移する
- [ ] NOTE_RSS_URL 未設定でもページが壊れない
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-31: 管理者認証 (FR-42, SCR-A1)

**変更対象ファイル**: `app/admin/login/page.tsx`（新規）, `app/admin/layout.tsx`（新規）, `middleware.ts`（認証ガード追加）, `lib/auth.ts`（新規）

```text
[Task Title]
ARD-31: 管理者ログイン画面と認証ガードを実装する

Goal
- /admin/* へのアクセスを認証済みユーザーのみに制限する。
- メールアドレス + パスワードでのログイン（または Magic Link）を実装する。
- 未認証の /admin/* アクセスは /admin/login にリダイレクトする。

Context
- 要件: FR-42（管理者認証）, SCR-A1（/admin/login）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-A1-A3_admin-cms.md（SCR-A1）
- ユーザー: U-05（サイト運営者 1 名のみ）— マルチユーザー不要

Scope
- 変更 OK:
  - app/admin/login/page.tsx（新規）
  - app/admin/layout.tsx（新規 — 認証チェック）
  - middleware.ts（/admin/* ルートの認証ガード追加）
  - lib/auth.ts（セッション管理ユーティリティ、新規）
  - .env.example（ADMIN_EMAIL, ADMIN_PASSWORD_HASH または 認証サービス KEY を追記）
- 変更 NG: /admin/cases/（ARD-32 担当）

Implementation Hints
- シンプル実装（マルチユーザー不要なため）:
  - 環境変数 `ADMIN_EMAIL` / `ADMIN_PASSWORD_HASH`（bcrypt ハッシュ）で照合。
  - セッションは `iron-session` + HTTP-only Cookie で管理。
  - または NextAuth.js（Credentials Provider）を使用。
- middleware.ts:
  ```ts
  export const config = { matcher: ['/admin/:path*'] }
  // /admin/login は除外し、それ以外は Cookie チェック → 未認証なら /admin/login へ
  ```
- ログアウト: DELETE /api/auth/logout でセッション Cookie を削除。

Acceptance Criteria (Done)
- [ ] 未認証で /admin/cases にアクセスすると /admin/login にリダイレクトされる
- [ ] 正しい認証情報でログインすると /admin/cases へ遷移する
- [ ] ログアウト後は /admin/* にアクセスできない
- [ ] ADMIN_EMAIL / ADMIN_PASSWORD_HASH が .env.example に記載されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-32: ケース CMS（CRUD + 公開管理）(FR-40, FR-41, SCR-A2, SCR-A3)

**変更対象ファイル**: `app/admin/cases/page.tsx`（新規）, `app/admin/cases/[id]/page.tsx`（新規）, `app/api/admin/cases/route.ts`（新規）, データストア

```text
[Task Title]
ARD-32: 管理者向けケース（実績）CMS を実装する（一覧・編集・公開管理）

Goal
- 管理者がブラウザから実績（ケーススタディ）を作成・編集・削除・公開/非公開切替できる。
- フロントエンドの実績一覧（ARD-10/11）と同じデータソースを使用する。

Context
- 要件: FR-40（ケース CRUD）, FR-41（公開コントロール）, BR-10（3 要素必須）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-A1-A3_admin-cms.md（SCR-A2, SCR-A3）
- 前提: ARD-31（管理者認証）が完了していること

Scope
- 変更 OK:
  - app/admin/cases/page.tsx（新規 — 一覧）
  - app/admin/cases/[id]/page.tsx（新規 — 編集フォーム）
  - app/api/admin/cases/route.ts（新規 — GET/POST）
  - app/api/admin/cases/[id]/route.ts（新規 — PUT/DELETE）
  - データストア選択（以下のいずれか）:
    - ファイルベース（JSON ファイル in data/）— Vercel Hobby 制約あり
    - Vercel KV または Vercel Postgres（要 ENV 設定）
    - Supabase（要 ENV 設定）
  - .env.example（データストア接続情報の変数名追記）
- 変更 NG:
  - 公開側のページ（app/works/）— データ読み込み部分の修正は最小限に

Implementation Hints
- データストアは .env.example に記載してヒューマンゲートで選択する。
  - ENV 未設定の場合は data/works.json をファイルストアとして使用するフォールバックを実装。
- 編集フォームのフィールド:
  - title（必須）, slug（必須・URL 用）, category, thumbnail, published（boolean）
  - problem / solution / result（必須 — BR-10）, techStack（配列）
- 公開/非公開のトグルは一覧画面から即座に切替できる（AC-A2-01）。
- 削除は確認ダイアログ付き（誤操作防止）。
- ISR の revalidate: 編集後に `revalidatePath('/works')` を呼ぶ。

Acceptance Criteria (Done)
- [ ] /admin/cases に実績一覧が表示される
- [ ] 新規作成・編集・削除が管理画面から操作できる
- [ ] 公開/非公開トグルを操作すると、フロント側の /works に反映される（AC-A2-01）
- [ ] .env.example にデータストア変数が記載されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-33: Google Search Console 統合 (FR-33)

**変更対象ファイル**: `app/layout.tsx`（verification meta tag）, `public/sitemap.xml`（新規）

```text
[Task Title]
ARD-33: Google Search Console のサイト確認とサイトマップを設定する

Goal
- Google Search Console のドメイン確認用 meta タグを設定する。
- /sitemap.xml を自動生成する（全公開ページを含む）。
- robots.txt を設定する。

Context
- 要件: FR-33（Search Console 統合）

Scope
- 変更 OK:
  - app/layout.tsx（verification タグ追加）
  - app/sitemap.ts（Next.js 組み込みサイトマップ生成、新規）
  - app/robots.ts（robots.txt 生成、新規）
  - .env.example（GOOGLE_SITE_VERIFICATION= 追記）
- 変更 NG: 他ページ・API ルート

Implementation Hints
- Next.js のサイトマップ生成:
  ```ts
  // app/sitemap.ts
  export default function sitemap(): MetadataRoute.Sitemap {
    return [
      { url: 'https://ardors.jp', lastModified: new Date() },
      { url: 'https://ardors.jp/services', lastModified: new Date() },
      // ... 全公開ページ
    ]
  }
  ```
- robots.ts:
  ```ts
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: { userAgent: '*', allow: '/', disallow: '/admin/' },
      sitemap: 'https://ardors.jp/sitemap.xml',
    }
  }
  ```
- Search Console の確認用 meta タグ:
  ```ts
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION }
  ```

Acceptance Criteria (Done)
- [ ] /sitemap.xml にアクセスすると公開ページ一覧が XML で返る
- [ ] /robots.txt に /admin/ が disallow されている
- [ ] GOOGLE_SITE_VERIFICATION が設定されると meta タグが注入される
- [ ] .env.example に GOOGLE_SITE_VERIFICATION= が追記されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```
