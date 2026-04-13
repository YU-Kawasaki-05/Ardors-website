---
title: Sprint 0 — プロジェクトセットアップ
phase: 04
sprint: 0
updated: 2026-04-13
---

# Sprint 0: プロジェクトセットアップ

## 並列ガイド

- **直列必須**: `ARD-00` → `ARD-01` → `ARD-02`
- ARD-00 が完了してから ARD-01 へ、ARD-01 が完了してから ARD-02 へ進む。
- このスプリントが完了してからスプリント 1 以降の着手が可能。

---

## ARD-00: Next.js プロジェクト初期化

**変更対象ファイル**: `package.json`, `next.config.ts`, `.gitignore`, `README.md`（新規）

```text
[Task Title]
ARD-00: Next.js (App Router) プロジェクトを初期化する

Goal
- `create-next-app` を使って Next.js プロジェクトを初期化し、
  リポジトリのルートに配置する。
- 既存の docs/ や codex/ ディレクトリを壊さないこと。

Context
- リポジトリ: Ardors-website（現在はドキュメントのみ、アプリコードなし）
- デプロイ先: Vercel Hobby
- 要件参照: docs/01_要件定義/00_サマリー_summary.md
- 採用技術: Next.js (App Router) / TypeScript / Tailwind CSS / pnpm

Scope
- 変更 OK:
  - リポジトリルートへの Next.js プロジェクトファイル追加
    （package.json, next.config.ts, tsconfig.json, app/, public/, etc.）
  - .gitignore への node_modules / .next / .env.local 追記
  - .env.example 新規作成（空でよい）
- 変更 NG:
  - docs/ 以下のファイル（ドキュメントを削除・移動しない）
  - codex/ / .agents/ / .claude/ 以下

Implementation Hints
- コマンド例:
  ```bash
  pnpm create next-app@latest . \
    --typescript \
    --tailwind \
    --app \
    --src-dir \
    --import-alias "@/*" \
    --no-eslint  # ESLint は ARD-01 で別途設定
  ```
- `src/app/` ではなく `app/` レイアウトでもよい（プロジェクトの慣習に合わせる）。
- デフォルトの `app/page.tsx` は最小スタブ（`<main>Ardors — WIP</main>`）に差し替える。
- `public/` には `.gitkeep` のみ置く。

Acceptance Criteria (Done)
- [ ] `pnpm install` が成功する
- [ ] `pnpm dev` でローカルサーバーが起動し、ブラウザで表示できる
- [ ] `pnpm build` が成功する
- [ ] docs/, codex/, .agents/, .claude/ が削除・移動されていない
- [ ] .gitignore に node_modules / .next / .env.local が含まれる
- [ ] .env.example が存在する（空でよい）
```

---

## ARD-01: 開発ツール設定（TypeScript strict / ESLint / Prettier）

**変更対象ファイル**: `tsconfig.json`, `.eslintrc.*` or `eslint.config.*`, `.prettierrc`, `package.json`

```text
[Task Title]
ARD-01: TypeScript strict モード・ESLint・Prettier を設定する

Goal
- TypeScript の strict モードを有効にする。
- Next.js 公式推奨の ESLint 設定を整える。
- Prettier を導入し、ESLint との競合を解消する。
- husky + lint-staged で commit 時に自動チェックを走らせる。

Context
- 前提: ARD-00 完了済み（Next.js プロジェクトが存在する）
- 要件: FR-76（変更 3 箇所ルール）を守るため、型安全・Lint クリーンを維持する

Scope
- 変更 OK:
  - tsconfig.json（strict: true, paths 設定）
  - eslint.config.ts（または .eslintrc.json）
  - .prettierrc（シングルクォート, セミコロンなし, print-width 100）
  - package.json（devDependencies: prettier, eslint-config-prettier, husky, lint-staged）
  - .husky/pre-commit（lint-staged 実行）
- 変更 NG:
  - アプリケーションコード（app/ 以下）は Lint エラーが出ても ARD-01 では修正しない

Implementation Hints
- ESLint 設定:
  ```json
  {
    "extends": ["next/core-web-vitals", "next/typescript", "prettier"]
  }
  ```
- Prettier 設定:
  ```json
  {
    "singleQuote": true,
    "semi": false,
    "printWidth": 100,
    "trailingComma": "all"
  }
  ```
- lint-staged:
  ```json
  {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
  ```
- `pnpm dlx husky init` で .husky/ を生成する。

Acceptance Criteria (Done)
- [ ] `pnpm lint` がエラーなく通る
- [ ] `pnpm typecheck`（`tsc --noEmit`）がエラーなく通る
- [ ] `git commit` 時に lint-staged が自動実行される
- [ ] tsconfig.json に `"strict": true` が設定されている
```

---

## ARD-02: Vercel CI/CD + Git 環境設定

**変更対象ファイル**: `vercel.json`（新規）, `.github/workflows/ci.yml`（新規）, `.env.example`

```text
[Task Title]
ARD-02: Vercel デプロイ設定と GitHub Actions CI を構成する

Goal
- Vercel へのプレビューデプロイ（feature/* ブランチ）と本番デプロイ（main ブランチ）を設定する。
- GitHub Actions で PR ごとに lint / typecheck / build を実行する。
- .env.example に本番で必要な環境変数名を列挙する。

Context
- 前提: ARD-01 完了済み
- デプロイ先: Vercel Hobby（1 プロジェクト、自動プレビュー有効）
- CLAUDE.md の push ポリシー: AI は git push しない。ヒューマンが push・PR を行う。

Scope
- 変更 OK:
  - vercel.json（ビルドコマンド・出力ディレクトリ指定）
  - .github/workflows/ci.yml（lint + typecheck + build のみ）
  - .env.example（変数名の追記、値は空または例示値のみ）
- 変更 NG:
  - Secrets の実際の値を .env.example / コードに書かない
  - .env.local を作成しない（存在する場合も変更しない）

Implementation Hints
- vercel.json の例:
  ```json
  {
    "buildCommand": "pnpm build",
    "outputDirectory": ".next",
    "installCommand": "pnpm install"
  }
  ```
- GitHub Actions:
  ```yaml
  name: CI
  on: [push, pull_request]
  jobs:
    check:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: pnpm/action-setup@v4
        - uses: actions/setup-node@v4
          with: { node-version: 22, cache: pnpm }
        - run: pnpm install
        - run: pnpm lint
        - run: pnpm typecheck
        - run: pnpm build
  ```
- .env.example に追記する変数の例:
  ```
  # Contact form
  CONTACT_EMAIL_TO=
  RESEND_API_KEY=

  # GA4 (P1)
  NEXT_PUBLIC_GA4_ID=
  ```

Acceptance Criteria (Done)
- [ ] .github/workflows/ci.yml が push 時に lint / typecheck / build を実行する
- [ ] vercel.json が存在する
- [ ] .env.example に最低限の変数名が列挙されている（値なし）
- [ ] CI ワークフローが GitHub 上でグリーンになる（Secrets 依存なしで pass）
```
