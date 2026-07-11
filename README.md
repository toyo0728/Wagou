# Next.js ベーステンプレート

コーポレートサイト / LP 制作用の Next.js (App Router) ベーステンプレート。

## セットアップ

```bash
cp .env.example .env   # 環境変数を設定
npm install
npm run dev            # http://localhost:3000
```

## 主な機能

- CSS Modules + postcss-nesting ベースのコンポーネント一式(Header / Footer / フォーム部品など)
- WordPress REST API 連携のお知らせ機能(一覧・詳細・カテゴリ・ページネーション)
- microCMS クライアント(`src/lib/microcms.ts`)
- SSGform 等の外部サービス向けお問い合わせフォーム
- メタデータ・OGP の一元管理(`src/lib/metadata.ts`)

新規プロジェクト開始時の手順・コーディング規約は [CLAUDE.md](./CLAUDE.md) を参照。

## 新規案件を始める手順

1. フォルダごとコピーして案件名にリネームし、package.json の name を変更
2. .env.example を .env にコピーし、値を設定(WordPress や microCMS の URL、フォーム送信先など)
3. src/lib/metadata.ts の siteName / siteDescription を案件のものに書き換え
4. public/ の画像を差し替え:logo.svg、ogp.png(1200×630)、no-image.svg、src/app/favicon.ico
5. src/app/layout.tsx のフォントと src/app/globals.css のカラートークン(CSS 変数)をデザインに合わせて変更
6. CMS の画像を使う場合は next.config.mjs の images.remotePatterns にドメインを追加
7. Header / Footer / CtaSection / Sidebar のナビゲーションや会社情報・電話番号を書き換え
8. 公開時のみ:layout.tsx の robots を index: true, follow: true に変更し、.env の NEXT_PUBLIC_URL を本番 URL に設定(それまでは検索エンジンにインデックスされない設定になっています)

日常の開発コマンド

npm run dev      # 開発サーバー起動 → http://localhost:3000
npm run build    # 本番ビルド
npm run lint     # ESLint チェック
npm run format   # Prettier で整形

テンプレートに最初から入っているもの

- トップページ (src/app/(home)/) — ページ固有のセクションは _components/ に置く構成
- お知らせ機能 (src/app/news/) — WordPress REST API 連携済みで、一覧・詳細・カテゴリ別・ページネーションまで動きます。環境変数が未設定でも空データでビルドが通る設計なので、CMS を使わない案件でもそのまま置いておけます
- お問い合わせフォーム (src/app/contact/) — SSGform などの外部サービスに POST する方式で、完了ページ付き
- 共通部品 — src/components/layout/(Header、Footer、パンくず、ページタイトルなど)と src/components/ui/(Button、Input などの小物)
- SEO まわり — sitemap.xml、robots.txt、OGP のデフォルト設定が済んでいます
