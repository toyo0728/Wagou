# 和合(Wagou)コーポレートサイト / LP

日本茶・茶メディテーション処「和合」のブランドサイト。Next.js(App Router)で制作した、1ページ完結型 LP + お知らせ機能を備えたコーポレートサイトです。

> 制作情報(公開 URL・制作期間・クライアント名など)はあとで追記

---

## 概要

| 項目           | 内容                                                            |
| -------------- | --------------------------------------------------------------- |
| 種別           | コーポレートサイト / ブランド LP                                |
| 業種           | 日本茶・茶メディテーション(和カフェ)                          |
| 公開 URL       | (あとで追記)                                                  |
| 制作期間       | (あとで追記)                                                  |
| 担当範囲       | **フロントエンド実装 / マークアップ・コーディング / CMS 構築**   |
| フレームワーク | Next.js 16(App Router)/ React 19 / TypeScript                 |

---

## 担当範囲

### フロントエンド実装
- Next.js 16(App Router)+ React 19 + TypeScript による実装
- Server Components を基本に、インタラクションが必要な末端だけ `'use client'` に分離
- スクロール連動アニメーション、スライダー、モーダルなどの UI ロジックを自作(外部 UI ライブラリ非依存)

### マークアップ・コーディング
- CSS Modules + postcss-nesting によるコンポーネント単位のスタイリング
- モバイルファースト設計(`@media (width >= 768px)` / `(width >= 1024px)` のレンジ記法で統一)
- デザイントークン(`globals.css` の CSS 変数)で配色・余白を一元管理し、ハードコードを排除
- `next/font`(Noto Sans JP / Noto Serif JP)によるフォント最適化、`next/image` + WebP による画像最適化

### CMS 構築
- microCMS でお知らせ(「日々のこと」)の `news` / `category` スキーマを設計・連携
- 記事一覧・詳細・カテゴリ別一覧・ページネーションを実装
- CMS 未接続時でもエラーで落とさず空データを返すフォールバック設計

---

## 主な実装ポイント

- **ファーストビュースライダー** — 自動再生 + ドットナビゲーション付きのメインビジュアル。`role="tablist"` / `aria-selected` などアクセシビリティ属性を付与([FirstViewSlider.tsx](src/app/(home)/_components/FirstViewSlider.tsx))
- **スクロール連動フェードイン** — `IntersectionObserver` を汎用ラッパー化。`fade` / `pop` のバリアントと遅延指定で、要素を順番に登場させる([ScrollFade.tsx](src/components/ui/ScrollFade.tsx))
- **おしながきモーダル** — メニュー画像タップで詳細を表示するモーダル UI([MenuModal.tsx](src/components/ui/MenuModal.tsx))
- **固定ヘッダー / スライドインメニュー** — スクロールに応じた固定ヘッダーと、モバイル用オーバーレイメニュー([FixedHeader.tsx](src/components/layout/FixedHeader.tsx) / [MobileMenu.tsx](src/components/layout/MobileMenu.tsx))
- **スムーススクロール** — ページ内アンカー(`/#menu` など)への滑らかな遷移([SmoothScrollLink.tsx](src/components/ui/SmoothScrollLink.tsx))
- **お知らせ機能(microCMS)** — 一覧 / 詳細 / カテゴリ別 / ページネーション。記事詳細は `generateStaticParams` で静的生成([news/](src/app/news/))
- **SEO 対応** — ページ単位の `generateMetadata`、OGP、`sitemap.xml`、`robots.txt`、パンくずの構造化データ(JSON-LD `BreadcrumbList`)を実装

---

## 画面構成

| ページ / セクション          | 内容                                             |
| ---------------------------- | ------------------------------------------------ |
| トップ(1 ページ LP)        | ファーストビュー → 和合について → 茶・メディテーション → おしながき → ご利用の流れ → 日々のこと → メディア情報 → アクセス |
| 和合について(`/concept`)   | ブランドコンセプトの下層ページ                   |
| 日々のこと(`/news`)        | お知らせ一覧・詳細・カテゴリ別・ページネーション |
| お問い合わせ(`/contact`)   | 外部フォームサービスへ POST、完了ページ付き       |

---

## 技術スタック

- **Next.js 16(App Router)** / React 19 / TypeScript
- **スタイリング**: CSS Modules + postcss-nesting(Tailwind CSS 4 併用可)
- **CMS**: microCMS(`microcms-js-sdk`)
- **フォント**: `next/font`(Noto Sans JP / Noto Serif JP)
- **画像**: `next/image` + WebP
- **Lint / Format**: ESLint(eslint-config-next)/ Prettier

---

## セットアップ

```bash
cp .env.example .env   # 環境変数(microCMS の値・フォーム送信先など)を設定
npm install
npm run dev            # http://localhost:3000
```

### コマンド

```bash
npm run dev      # 開発サーバー起動 → http://localhost:3000
npm run build    # 本番ビルド
npm run lint     # ESLint チェック
npm run format   # Prettier で整形
```

---

## ディレクトリ構成(抜粋)

```
src/
├── app/
│   ├── (home)/_components/   # トップページの各セクション(FirstView, Menu, Flow ...)
│   ├── news/                 # お知らせ(microCMS 連携:一覧 / 詳細 / カテゴリ / ページネーション)
│   ├── concept/              # 和合について
│   ├── contact/              # お問い合わせ(+ thanks/ 完了ページ)
│   ├── layout.tsx            # 共通レイアウト(Header + children + Footer)
│   ├── globals.css           # リセット CSS + デザイントークン(CSS 変数)
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── layout/               # Header, Footer, FixedHeader, MobileMenu, Breadcrumb ...
│   └── ui/                   # Button, ScrollFade, MenuModal, NewsList, Pagination ...
├── lib/
│   ├── metadata.ts           # サイト名 / 説明 / OGP のデフォルト
│   └── microcms.ts           # microCMS フェッチ関数群
├── types/microcms.ts         # news / category のスキーマ型
└── utils/                    # 純粋関数(date.ts, string.ts)
```

開発の詳細な規約・設計方針は [CLAUDE.md](./CLAUDE.md) を参照。
