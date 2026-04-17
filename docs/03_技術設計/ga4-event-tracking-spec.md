# GA4 イベント定義（ARD-25 / FR-32）

## 目的

- FR-32 / BR-32-01 / BR-32-02 を満たすため、公開サイトで発生する主要行動イベントを統一仕様で計測する。
- ARD-19 で導入した GA4 基本タグ（`page_view`）に対し、行動イベントを追加する。

## 対象イベント

| event_name         | 発火タイミング                          | 実装箇所                                                 |
| ------------------ | --------------------------------------- | -------------------------------------------------------- |
| `cta_click`        | `CTABlock` の主/副 CTA クリック時       | `components/ui/CTABlock.tsx`                             |
| `work_detail_view` | 実績詳細ページ初回表示時（1回のみ）     | `app/works/[slug]/_components/WorkDetailViewTracker.tsx` |
| `contact_reach`    | 問い合わせフォーム初回表示時（1回のみ） | `app/contact/_components/ContactForm.tsx`                |
| `contact_submit`   | 問い合わせ API 成功レスポンス受信直後   | `app/contact/_components/ContactForm.tsx`                |

## イベントパラメータ

### 共通パラメータ（BR-32-02）

| key         | 型             | 例                              | 備考                                                                                  |
| ----------- | -------------- | ------------------------------- | ------------------------------------------------------------------------------------- |
| `page_path` | `string`       | `/works/corporate-site-renewal` | locale prefix を除いた URL path                                                       |
| `locale`    | `'ja' \| 'en'` | `ja`                            | pathname prefix から抽出。未判定時は `ja`                                             |
| `source`    | `string`       | `google.com` / `direct`         | `document.referrer` が同一オリジン外なら hostname、取得不可/同一オリジンなら `direct` |

### 個別パラメータ

| event_name         | key                | 型       | 例                       |
| ------------------ | ------------------ | -------- | ------------------------ |
| `cta_click`        | `cta_label`        | `string` | `相談する`               |
| `cta_click`        | `cta_target`       | `string` | `/ja/contact`            |
| `cta_click`        | `cta_area`         | `string` | `cta_block`              |
| `work_detail_view` | `work_slug`        | `string` | `corporate-site-renewal` |
| `work_detail_view` | `work_category`    | `string` | `Web 開発`               |
| `contact_submit`   | `contact_category` | `string` | `相談`                   |

## 挙動ポリシー

- 開発環境 (`NODE_ENV !== 'production'`) ではイベント送信を無効化する。
- `NEXT_PUBLIC_GA4_ID` 未設定時はイベント送信を無効化する。
- `window.gtag` 未定義時は no-op とし、UI 操作を失敗させない。
- `contact_reach` / `work_detail_view` は `useRef` を用いて重複送信を防止する。

## 実装モジュール

- 送信ラッパー: `lib/analytics/gtag.ts`
- イベント型・コンテキスト生成: `lib/analytics/events.ts`
