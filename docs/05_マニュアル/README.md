---
title: 運用マニュアル一覧
phase: 05
updated: 2026-04-26
---

# 運用マニュアル一覧

このディレクトリは、実装後に人間が行う設定・登録・確認作業の手順をまとめる場所です。

## 読む順番

1. [01_env_external-services.md](./01_env_external-services.md)
   - Vercel 環境変数
   - 管理者ログイン
   - Resend / GA4 / Search Console / Note RSS
   - CMS データストアの注意点
2. [02_content-operations.md](./02_content-operations.md)
   - 実績、プロフィール、サービス、SaaS、法務、Note 記事の登録・更新
   - JA/EN コンテンツの扱い
3. [03_release-checklist.md](./03_release-checklist.md)
   - 1 task 1 branch の進め方
   - PR 前後の確認
   - merge 後のローカル同期とブランチ整理

## 運用上の前提

- このリポジトリでは `git push` は人間が実行します。
- 作業ブランチは `feature/*` を使います。
- `.env.local` や本番シークレットはコミットしません。
- 本番反映前に `pnpm lint` / `pnpm typecheck` / `pnpm build` を通します。
- 外部サービスの管理画面 UI は変更されることがあります。画面名が変わっている場合も、必要な値と確認観点はこのマニュアルを基準にしてください。

## 現時点の重要な未完了作業

- Vercel の本番・Preview 環境変数を設定する。
- Resend の送信ドメインを確認し、問い合わせメール送信を実送信で確認する。
- GA4 の DebugView で `page_view` と行動イベントを確認する。
- Google Search Console の所有権確認と sitemap 送信を行う。
- `NOTE_RSS_URL` を設定して `/notes` の実データ表示を確認する。
- 実績 CMS の本番永続化方針を決める。現状の file ストアはローカル・開発確認向けです。
