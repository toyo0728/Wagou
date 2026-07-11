// サイト全体のメタ情報をここで一元管理する。
// 新規プロジェクトではまずこのファイルを書き換えること。
export const siteName = 'Wagou';

export const siteDescription =
  'サイトの説明文が入ります。サイトの説明文が入ります。';

// 本番URLが決まったら差し替える(OGP・canonicalの基準になる)
export const siteUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const defaultOpenGraph = {
  title: siteName,
  description: siteDescription,
  images: ['/ogp.png'],
  url: '/',
  siteName,
  type: 'website',
  locale: 'ja_JP',
};
