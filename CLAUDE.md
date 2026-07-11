# CLAUDE.md

このリポジトリは、コーポレートサイト / LP 制作用の Next.js ベーステンプレート。
flow-meister プロジェクトの構成・規約を汎用化したもの。新規案件はこのテンプレートをコピーして開始する。

## コマンド

```bash
npm run dev      # 開発サーバー起動 (http://localhost:3000)
npm run build    # 本番ビルド
npm run lint     # ESLint
npm run format   # Prettier で整形
```

## 技術スタック

- **Next.js 16 (App Router)** / React 19 / TypeScript(`strict: false` だが `strictNullChecks: true`、`allowJs: true`)
- **CSS Modules + postcss-nesting** がスタイリングの基本。Tailwind CSS 4 も併用可(例: `src/components/ui/ButtonTailwind.tsx`)
- **CMS**: WordPress REST API(`src/lib/wordpress.ts`)または microCMS(`src/lib/microcms.ts`)
- **フォーム送信**: SSGform 等の外部サービスに POST(`NEXT_PUBLIC_SSG_FORM`)
- `next.config.mjs`: `trailingSlash: true`(内部リンクは `/news/` のように末尾スラッシュ付きで書く)、Lightning CSS 有効

## ディレクトリ構成

```
src/
├── app/                      # ルーティング(App Router)
│   ├── layout.tsx            # 共通レイアウト: Header + children + CtaSection + Footer
│   ├── globals.css           # リセットCSS + デザイントークン(:root のCSS変数)
│   ├── (home)/               # トップページ。ページ固有セクションは _components/ に置く
│   ├── news/                 # お知らせ(WordPress連携・ページネーション/カテゴリ対応)
│   │   ├── page.tsx          #   一覧(1ページ目)
│   │   ├── page/[page]/      #   一覧(2ページ目以降)
│   │   ├── [id]/             #   記事詳細
│   │   └── category/[id]/    #   カテゴリ別一覧(+ page/[page]/ でページネーション)
│   ├── contact/              # お問い合わせ(+ thanks/ 完了ページ)
│   ├── sitemap.ts            # /sitemap.xml(固定ページ + WordPress記事)
│   ├── robots.ts             # /robots.txt(インデックス可否は layout.tsx の metadata.robots で制御)
│   ├── error.tsx             # エラーページ('use client' 必須、metadata 不可)
│   └── not-found.tsx         # 404ページ
├── components/
│   ├── layout/               # Header, Footer, OneColumn, TwoColumn, Sidebar,
│   │                         # Breadcrumb, PageFirstView, CtaSection, Form
│   └── ui/                   # Button, Heading, Input, Label など小さな部品
│                             # NewsCard, NewsList, Pagination(お知らせ一覧の共通部品)
├── lib/                      # 外部サービス連携・サイト設定
│   ├── metadata.ts           # siteName / siteDescription / defaultOpenGraph(★最初に書き換える)
│   ├── wordpress.ts          # WordPress REST API フェッチ関数群
│   └── microcms.ts           # microCMS クライアント
├── types/                    # 共有型定義(wordpress.ts など)
└── utils/                    # 純粋関数(date.ts, string.ts)
```

## コーディング規約

### コンポーネント

- **Server Components がデフォルト**。`'use client'` は state やイベントハンドラが必要な末端コンポーネントだけに付ける(例: `Header`, `HamburgerIcon`)
- 1コンポーネント = `Name.tsx` + `Name.module.css` の同名ペア。`export default function`、パスカルケースで命名
- Props は各ファイル内で `type XxxProps = {...}` として定義する
- ページ固有のセクションはそのページの `_components/` に、複数ページで使うものは `src/components/` に置く
- 汎用部品(ui)はデータフェッチしない。フェッチはページまたは layout 系コンポーネント(例: `Sidebar`)で行い、props で渡す
- インポートはエイリアス `@/`(= `src/`)を使う

### スタイリング(CSS Modules)

- クラス名はキャメルケース(`styles.logoLink`)。状態クラスは `isOpen`, `isCurrent`, `isCenter` のように `is` プレフィックス
- **モバイルファースト**。ブレイクポイントは `@media (width >= 768px)`(タブレット)と `@media (width >= 1024px)`(PC)のレンジ記法で統一
- hover は `@media (any-hover: hover) { &:hover {...} }` で囲む(タッチデバイス対策)
- 色は `globals.css` の `:root` に定義した CSS 変数(`var(--Blue-500)` など)を使う。ハードコードしない
- ネスト記法(postcss-nesting)を使ってよい
- 複数クラスの結合はテンプレートリテラル: `` className={`${styles.a} ${styles.b}`} ``

### ページとメタデータ

- サイト名・説明・OGP のデフォルトは `src/lib/metadata.ts` で一元管理。各ページは:

```tsx
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'ページ名',
  description: 'ページの説明。',
  openGraph: {
    ...defaultOpenGraph,
    title: `ページ名 | ${siteName}`,
    url: '/path/',
  },
};
```

- 動的ページは `generateMetadata({ params })` を使う。`params` は Promise なので `await params` すること(Next.js 15+)
- 下層ページの基本構成: `PageFirstView`(ページタイトル)→ `OneColumn` または `TwoColumn`(本文)→ `Breadcrumb`(パンくず)
- データが見つからない場合は `notFound()` を呼ぶ

### データフェッチ(WordPress)

- `src/lib/wordpress.ts` の関数を Server Component から直接 `await` で呼ぶ
- 型は `wp-types` パッケージ(`WP_REST_API_Post` など)+ `src/types/wordpress.ts` の補助型(`FeaturedMedia`, `Term`)
- アイキャッチ: `post._embedded?.['wp:featuredmedia']?.[0]`、カテゴリ: `post._embedded?.['wp:term']?.[0]`。**どちらも未設定の記事があり得る**ので `undefined` を考慮し、アイキャッチは `/no-image.svg` にフォールバックする
- 記事一覧の描画は `NewsList`(カード一覧)+ `Pagination`(ページ番号。`basePath` は末尾スラッシュ付きで渡し、1ページ目は `basePath` 自体にリンクされる)を使う。一覧ページにコピペしない
- 環境変数(`WORDPRESS_POST_URL` / `WORDPRESS_CATEGORIES_URL`)が未設定のときは空データを返す設計。CMS 未接続でもビルドは通る
- ページネーションは REST API のレスポンスヘッダー `X-WP-TotalPages` を使う(`getTotalPages`)
- 静的化したいページは `export const dynamic = 'force-static'`、ISR は fetch の `{ next: { revalidate: 60 } }` を使う

### データフェッチ(microCMS)

- `src/lib/microcms.ts` の `client` を使う。**このモジュールは import 時に環境変数を検証して throw する**ので、microCMS を使わない案件では import しないこと

```tsx
import { client } from '@/lib/microcms';
const data = await client.get({
  endpoint: 'news',
  queries: { limit: 3, orders: '-publishedAt' },
});
```

### フォーム

- `src/components/layout/Form.tsx` が雛形。SSGform 等の外部サービスに `action={URL} method="POST"` で直接送信し、完了後 `/contact/thanks/` に遷移させる
- フィールドは `Label`(必須/任意タグ付き)+ `Input` / `Textarea` / `Radio` / `Checkbox` + エラーメッセージの組で構成

## 新規プロジェクト開始時のチェックリスト

1. このフォルダをコピーし、`package.json` の `name` を変更
2. `.env.example` を `.env` にコピーして値を設定
3. `src/lib/metadata.ts` の `siteName` / `siteDescription` を書き換える
4. `public/` のプレースホルダーを差し替える: `logo.svg`(ロゴ)、`ogp.png`(1200×630 推奨)、`no-image.svg`(記事のフォールバック画像)、`src/app/favicon.ico`
5. `src/app/layout.tsx` のフォントと `globals.css` のカラートークンをデザインに合わせて変更
6. `next.config.mjs` の `images.remotePatterns` に CMS の画像ドメインを追加
7. `Header` / `Footer` / `CtaSection` / `Sidebar` のナビゲーション・会社情報・電話番号を書き換える
8. **公開時**: `src/app/layout.tsx` の `robots` を `index: true, follow: true` に変更し、`.env` の `NEXT_PUBLIC_URL` を本番 URL にする

## 注意事項

- `.env` は git 管理外(`.gitignore` で `.env*` を除外)。共有は `.env.example` で行う
- VSCode 設定(`.vscode/settings.json`)で保存時に Prettier + ESLint fix が走る
- `error.tsx` は Client Component 必須のため `metadata` を export できない(ビルドエラーになる)
