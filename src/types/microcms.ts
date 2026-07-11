import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk';

// microCMS「category」API(newsから参照されるカテゴリー)。
// name=日本語表示名, slag=英語スラッグ(microCMS上のフィールドID綴りに合わせている)
export type Category = {
  name: string;
  slag: string;
} & MicroCMSListContent;

// microCMS「news」APIのスキーマ。
export type News = {
  title: string;
  // アイキャッチは未設定の記事があり得るので任意
  eyecatch?: MicroCMSImage;
  // カテゴリーは複数コンテンツ参照なので配列
  category: Category[];
  // 本文(リッチエディタ)
  content: string;
} & MicroCMSListContent;
