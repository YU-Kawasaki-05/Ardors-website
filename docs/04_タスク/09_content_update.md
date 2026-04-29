---
title: Backlog (P1) — コンテンツ本番化・Products 化
phase: 04
sprint: backlog
updated: 2026-04-29
---

# Backlog (P1): コンテンツ本番化・Products 化

## 並列ガイド

- **前提**: Sprint 0〜5（P0 全タスク）と ARD-30〜33 が完了していること。
- **直列推奨**: `ARD-34`（コンテンツ本番化）→ `ARD-35`（法務・marubo利用規約整理）
  - ARD-34 は公開ページの情報設計・コピー・実績データを更新する。
  - ARD-35 は決済・利用規約・特商法など法務寄りの整理を行う。
- **並列非推奨**: ARD-34 と Products ルーティング変更は同一PRで扱う。ナビゲーション、サイトマップ、内部リンク、i18n が密結合するため。

---

## ARD-34: プロフィール・サービス・実績・プロダクト紹介の本番コンテンツ化

**変更対象ファイル**: `config/navigation.ts`, `data/profile.ts`, `data/services.ts`, `data/works.json`, `data/products.ts`（または `data/saas.ts` 改名）, `app/products/page.tsx`, `app/saas/page.tsx`, `lib/i18n/ja.ts`, `lib/i18n/en.ts`, `app/sitemap.ts`

```text
[Task Title]
ARD-34: プロフィール・サービス・実績・プロダクト紹介の本番コンテンツ化

Goal
- 仮コンテンツを実態に合わせた本番用コピーへ置き換える。
- /saas を /products に変更し、自作プロダクト・構想中プロダクトを掲載できる構成にする。
- marubo を専用LPではなく、かわさき / Ardors のプロダクト実績の一つとして掲載する。
- 技術力の誇示ではなく、顧客志向・事業理解・実行力・プロダクト開発経験を伝える。

Context
- サイトの主役は marubo 単体ではなく、かわさき本人 / Ardors / 開発者としての活動。
- marubo は「学習塾向けAIチャット・生徒管理システム」として、プロダクト実績の一つに位置づける。
- 表示名は JA: `かわさき`, EN: `Yu Kawasaki` を基準にする。
- Ardors は将来法人化時の名称候補として残す。
- 価格は当面ページに出さず、内容に応じた見積もり・相談導線に留める。
- 参考方向: noova.jp のように、プロダクトや開発実績を公開しつつ、事業体らしさを出す。

Scope
- 変更 OK:
  - `config/navigation.ts`
    - `/saas` のナビゲーションを `/products` に変更。
    - JA 表記は `プロダクト`、EN 表記は `Products`。
  - `app/products/page.tsx`
    - 既存 `app/saas/page.tsx` を Products ページへ移行。
    - marubo と構想中プロダクトを掲載する。
  - `app/saas/page.tsx`
    - `/products` へ redirect する最小ページに変更、または Next.js の redirect 設定で対応。
  - `data/products.ts`（推奨）
    - `data/saas.ts` から Products 用データへ再構成。
  - `data/profile.ts`
    - 表示名、肩書き、経歴、スキル、外部リンクを実態に合わせて更新。
  - `data/services.ts`
    - サービス分類を更新し、価格表示を消す。
  - `data/works.json`
    - サンプル実績を本番用の初期4件に差し替える。
  - `lib/i18n/ja.ts` / `lib/i18n/en.ts`
    - トップ、プロフィール、サービス、Products、実績のコピーを更新。
  - `app/sitemap.ts`
    - `/products` を追加し、必要に応じて `/saas` を削除または扱いを整理。
  - docs 追記
    - 必要なら `docs/00_共通/決定事項ログ_decision-log.md` に `/saas` → `/products` の決定を追記。
- 変更 NG:
  - Stripe 決済実装。
  - marubo 専用の決済・Customer Portal・Webhook 実装。
  - marubo 専用利用規約の本実装。
  - 実績 CMS の外部DB化。
  - スクリーンショット画像の新規作成・追加（今回はテキストのみ）。

Content Direction
- トップコピーは以下方向で作る。
  - `価値を生む開発で、事業の次の一歩をつくる。`
  - または同等の意味で、価値創出・事業の次の一歩・プロダクトづくりを含める。
- トップに `プロジェクト数 7` は出さない。
- トップの導線優先順位:
  1. 実績を見る
  2. 問い合わせる
  3. Products を見る
- 技術スタックは出すが、技術力一本で勝負する見せ方にしない。
- `業務改善・効率化支援` をサービス分類に含める。
- Stripe は `決済導入相談` / `相談可能` 程度の温度感にする。
- UI/UX デザイン単体は主力サービスにしない。
- 価格は非表示にする。

Profile Requirements
- 表示名:
  - JA: `かわさき`
  - EN: `Yu Kawasaki`
- 肩書きは固定しすぎず、文章で説明する。
- 経歴に含める内容:
  - 2024.4〜2025.6: プライム上場企業A（製薬業界）にて AI / IT コンサルタントとして従事。
  - 2025.7〜現在: marubo の開発・販売。
  - 2026.3〜現在: プライム上場企業B（インフラ業界）の開発プロジェクトにて受け入れテスト自動化。
  - その他開発経歴多数。
- スキルとして出す候補:
  - 生成AI
  - TypeScript
  - React
  - Node.js
  - AWS
  - GitHub Actions
  - Python
  - PostgreSQL
  - Stripe
- 外部リンク:
  - GitHub は `https://github.com/YU-Kawasaki-05/Ardors-website` 直リンクでよい。
  - X は `https://x.com/foooten_`。

Products Requirements
- `/products` を新設または移行する。
- `/saas` は `/products` へ redirect する。
- Products ページは marubo 専用LPにしない。
- 掲載内容:
  - marubo
  - 名前なしの構想中プロダクト 1件
- marubo 一文説明:
  - `学習塾向けAIチャット・生徒管理システム`
- marubo が解決する課題:
  - 学習塾の生徒が安全かつ効果的に AI を利用して学習を進められるようにする。
  - 塾側が生徒の学習状況や AI 使用状況を把握・監視できるようにする。
  - AI 活用を教育現場で管理可能な形にする。
- marubo の AI 活用範囲:
  - チャット返信
  - 分析
  - 学習状況のレポート生成
- marubo の技術スタックは基本公開OK。
- marubo の利用者数は出さない。
- marubo の GitHub repo はサイトから直接リンクしない。
- marubo のスクリーンショットは今回は用意せず、テキストのみで開始する。
- CTA は `利用相談する` を優先する。

Works Requirements
- 初期実績は4件でよい。
- 掲載候補:
  1. marubo
  2. Ardors website
  3. プライム上場企業A AI / IT コンサル
  4. プライム上場企業B 受け入れテスト自動化
- marubo:
  - NDAなし。
  - 実績として使用OK。
  - ヒアリング、設計、開発、テストまで担当。
  - GitHub repo は実績リンクとして載せない。
- Ardors website:
  - このサイト自体を実績として掲載OK。
  - GitHub repo は公開OK。
  - AIエージェント活用は記載してもしなくてもよい。
- プライム上場企業A:
  - 業界: 製薬業界。
  - 企業名は匿名。
  - AI活用、業務改善、業務改善システムのPoC開発。
  - 資料作成、社内報作成、社内システム・業務相談、AI活用解説資料作成。
  - PoC 的に作ったシステムが評価され、社内システムに実装された。
  - 数値成果は出さない。
- プライム上場企業B:
  - 業界: インフラ業界。
  - 企業名は匿名。
  - 新規アプリ開発における受け入れテスト自動化。
  - Playwright、mabl、JavaScript、API を活用。
  - mabl 側・実装側とのやり取りも担当。
  - 作成したテストは学習に活用され、MCP 経由で Claude Code によるテストケース量産につながる。
  - 工数削減、属人性低下、品質向上を目指している。
  - 数値や具体例は出さない。

English Requirements
- 英語ページは自然な品質で作る。
- 英語は日本語よりプロフェッショナル寄りのトーンでよい。
- marubo は日本語のみ紹介でよい。
- 匿名実績は英語化しなくてよい。
- EN 未対応の実績は `locales.en` を省略し、EN サイトでは非表示にする。
- トップ、プロフィール、サービスは英語も更新する。

Implementation Hints
- `data/saas.ts` は `data/products.ts` へ改名または新規作成するのが自然。
- 既存の `SAAS` 型が Products 構造に合わない場合は、`ProductItem` / `ProductsData` のような型に再設計する。
- `app/saas/page.tsx` は `redirect('/products')` だけのページにするのが最小で安全。
- `config/navigation.ts` の `saas` key は `products` key へ変更してよい。ただし既存参照を検索して漏れなく更新する。
- `app/sitemap.ts` に `/products` を追加し、`/saas` の扱いを整理する。
- `app/robots.ts` は変更不要想定。
- Header / Footer は `config/navigation.ts` 経由なので、BR-76 を守る。
- `data/works.json` は Vercel 上で bundle fallback されるため、公開実績のソースとして引き続き使用する。
- 価格は出さない。サービスページでは「まずは相談」「内容に応じて提案」程度にする。

Acceptance Criteria (Done)
- [ ] `/products` が表示される。
- [ ] `/saas` にアクセスすると `/products` に redirect される。
- [ ] Header / Footer の表記が JA `プロダクト` / EN `Products` になる。
- [ ] トップページのコピーが `価値を生む開発` / `事業の次の一歩` の方向に更新されている。
- [ ] トップページに `プロジェクト数 7` が表示されていない。
- [ ] プロフィール表示名が JA `かわさき`, EN `Yu Kawasaki` になっている。
- [ ] プロフィールに回答済みの経歴・価値観・技術スタックが反映されている。
- [ ] サービスページから価格表示が削除されている。
- [ ] サービスに `業務改善・効率化支援` が含まれている。
- [ ] Stripe は `相談可能` 程度の表現になっている。
- [ ] Products ページに marubo と構想中プロダクト1件が掲載されている。
- [ ] marubo は `学習塾向けAIチャット・生徒管理システム` として説明されている。
- [ ] marubo の GitHub repo へ直接リンクしていない。
- [ ] 実績が初期4件（marubo / Ardors website / 製薬業界AI・ITコンサル / インフラ業界受け入れテスト自動化）に更新されている。
- [ ] 実績に根拠のない数値成果が表示されていない。
- [ ] EN ページに未翻訳の日本語や仮コピーが出ていない。
- [ ] EN 未対応実績は英語サイトで非表示になっている。
- [ ] `/sitemap.xml` に `/products` が含まれている。
- [ ] `pnpm lint` / `pnpm typecheck` / `pnpm build` が通る。

PR report notes
- What: 仮コンテンツを本番用に更新し、/saas を /products へ移行。
- Why: 実態に合うプロフィール・実績・プロダクト紹介に更新し、仕事相談と協業導線を強化するため。
- How to test:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - `/ja`, `/en`, `/ja/products`, `/en/products`, `/ja/works`, `/en/works`, `/ja/profile`, `/en/profile` を手動確認。
- Risks/Follow-ups:
  - marubo 決済・利用規約・特商法の詳細整備は ARD-35 以降。
  - スクリーンショットは今回は追加しない。
  - 実績内容は公開可能範囲に留め、数値成果は出さない。
- Human action required:
  - コピー内容の最終確認。
  - marubo 専用利用規約・返金/キャンセル方針は別途確認。
```

---

## ARD-35: marubo の法務・支払い方針を整理する（後続タスク候補）

**変更対象ファイル**: `data/legal/*.ts`, `docs/05_マニュアル/*`, 必要に応じて `docs/03_技術設計/*`

```text
[Task Title]
ARD-35: marubo の法務・支払い方針を整理する

Goal
- marubo の月額課金開始に備え、利用規約・返金/キャンセル方針・特商法表記の方針を整理する。
- Stripe 実装前に、販売条件とユーザーへの説明を明確にする。

Context
- marubo は 2026年5月から月額課金予定。
- このサイトに直接決済を入れるのは現時点では先送り。
- marubo 専用利用規約を作成予定。
- 特商法ページでは本名 `川崎 祐` を出してよい。

Scope
- 変更 OK:
  - marubo 専用利用規約のドラフト作成。
  - 返金なし / 月単位契約 / 解約連絡方式の整理。
  - 特商法ページの見直し。
  - Stripe Checkout / Customer Portal 実装前の方針メモ作成。
- 変更 NG:
  - Stripe Checkout 実装。
  - Stripe Webhook 実装。
  - 課金状態管理の実装。

Acceptance Criteria (Done)
- [ ] marubo の利用規約ドラフトが存在する。
- [ ] 返金・キャンセル・解約方針が明文化されている。
- [ ] 特商法ページに必要な更新方針が整理されている。
- [ ] Stripe 実装前に決めるべき項目が一覧化されている。
```
