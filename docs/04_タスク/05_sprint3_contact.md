---
title: Sprint 3 — コンタクトフォーム + API
phase: 04
sprint: 3
updated: 2026-04-13
---

# Sprint 3: コンタクトフォーム + API

## 並列ガイド

- **直列必須**: `ARD-15` → `ARD-16`
  - ARD-15 でフォームの型定義・バリデーションスキーマを確定させてから API を実装する。
- **並列 OK**: ARD-15 は Sprint 2 と並列実行可（変更ファイルが独立）。
- ARD-16 は ARD-15 マージ後に着手する。

---

## ARD-15: コンタクトフォーム UI (SCR-07, SCR-08)

**変更対象ファイル**: `app/contact/page.tsx`（新規）, `app/contact/complete/page.tsx`（新規）, `lib/schemas/contact.ts`（新規）

```text
[Task Title]
ARD-15: コンタクトフォーム画面（/contact）と送信完了画面（/contact/complete）を実装する

Goal
- ユーザーがメッセージを送信できるコンタクトフォームを実装する。
- クライアントサイドバリデーション（即時フィードバック）と送信完了画面を含む。
- フォームのバリデーションスキーマを lib/schemas/contact.ts に定義する（ARD-16 と共有）。

Context
- 要件: FR-20（コンタクトフォーム）, FR-21（送信完了）, BR-30〜33（バリデーションルール）
- ワイヤーフレーム: docs/01_要件定義/wireframes/SCR-07-12_conversion-legal.md（SCR-07, SCR-08）
- 受入基準: docs/01_要件定義/05_受入基準_acceptance-criteria.md（AC-07-*, AC-08-*）

Scope
- 変更 OK:
  - app/contact/page.tsx（新規 — フォーム UI）
  - app/contact/complete/page.tsx（新規 — 送信完了）
  - lib/schemas/contact.ts（新規 — Zod スキーマ）
- 変更 NG:
  - app/api/contact/（ARD-16 担当）
  - 共通コンポーネント

Implementation Hints
- フォームフィールド（BR-30〜33）:
  ```
  name      : 必須, 1〜100 文字
  email     : 必須, RFC 5322 準拠
  category  : 必須, select（相談 / 協業 / その他）
  body      : 必須, 1〜3000 文字
  ```
- Zod スキーマを lib/schemas/contact.ts に定義し、クライアント・サーバー両方から import する。
- フォーム実装は React Hook Form + Zod resolver を推奨（または Next.js Server Actions）。
- 心理的安心メッセージ（BR-31）:
  - 「相談のみでも歓迎」「返信は〇営業日以内」などをフォーム上部に表示。
- バリデーションエラーはフィールド直下にインライン表示（AC-07-01）。
- 送信完了画面（/contact/complete）は静的ページ。完了後にトップへの誘導リンクを置く。

Acceptance Criteria (Done)
- [ ] /contact にフォームが表示される
- [ ] 必須フィールドが空の状態で送信するとエラーメッセージが表示される（AC-07-01）
- [ ] メール形式が不正な場合にエラーが表示される
- [ ] 3000 文字を超えるとエラーが表示される（BR-32）
- [ ] 送信成功後 /contact/complete に遷移する
- [ ] lib/schemas/contact.ts に Zod スキーマが定義されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```

---

## ARD-16: コンタクト API + レート制限 (BR-30〜34)

**変更対象ファイル**: `app/api/contact/route.ts`（新規）, `middleware.ts`（レート制限追加）

```text
[Task Title]
ARD-16: コンタクトフォームの API エンドポイントとレート制限を実装する

Goal
- /api/contact に POST エンドポイントを実装する。
- サーバーサイドバリデーション（lib/schemas/contact.ts の Zod スキーマを再利用）を行う。
- IP ベースのレート制限（5 件 / 分）を実装する。
- 送信内容をメール or 外部サービスに転送する。

Context
- 要件: FR-22（スパム対策・バリデーション）, BR-30〜34
- BR-30: 名前・メール・カテゴリ・本文のサーバーサイド検証
- BR-32: 本文 1〜3000 文字
- BR-33: IP ベース 5 件 / 分のレート制限
- BR-34: SQLi / XSS / CSRF パターンを拒否
- 前提: ARD-15 の lib/schemas/contact.ts が存在すること

Scope
- 変更 OK:
  - app/api/contact/route.ts（新規）
  - middleware.ts（レート制限ロジック追加、なければ新規）
  - .env.example（メール送信に必要な ENV 変数名追記）
- 変更 NG:
  - lib/schemas/contact.ts（ARD-15 の成果物、読み込むだけ）
  - app/contact/page.tsx

Implementation Hints
- レート制限の実装方針（ENV や外部サービス不要にする）:
  - `Map<string, { count: number; resetAt: number }>` をモジュールスコープで保持。
  - Vercel Hobby では Edge Runtime が使えないため Node.js Runtime で実装。
  - または `@upstash/ratelimit` + Upstash Redis（外部サービス利用の場合は ENV に明記）。
- メール送信:
  - `RESEND_API_KEY` があれば Resend を使用。
  - なければ `CONTACT_EMAIL_TO` に送信先メールアドレスを設定し、Nodemailer or fetch で送信。
  - どちらもない場合は console.log してスタブとする（PR 本文に明記）。
- レスポンス:
  - 成功: `{ ok: true }`
  - バリデーションエラー: 400 + `{ errors: ... }`
  - レート超過: 429 + `{ message: "Too Many Requests" }`
  - サーバーエラー: 500 + `{ message: "Internal Server Error" }`（スタックトレースを含まない、BR-40）

Acceptance Criteria (Done)
- [ ] POST /api/contact が正常なリクエストで 200 を返す
- [ ] 不正なリクエスト（バリデーションエラー）で 400 を返す（AC-07-02）
- [ ] 同一 IP から 5 件超えで 429 を返す（BR-33）
- [ ] レスポンスにスタックトレースが含まれない（BR-40）
- [ ] .env.example に必要な環境変数名が記載されている
- [ ] `pnpm lint` / `pnpm typecheck` が通る
```
