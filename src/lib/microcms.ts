import { createClient } from 'microcms-js-sdk';
import type { MicroCMSListResponse } from 'microcms-js-sdk';
import type { Category, News } from '@/types/microcms';

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// お知らせ記事のエンドポイント名
const ENDPOINT = 'news';
// カテゴリー(newsから参照されるコンテンツ)のエンドポイント名
const CATEGORY_ENDPOINT = 'category';

// カテゴリー一覧を取得する。エラー時は空配列を返す
export async function getCategories(): Promise<Category[]> {
  try {
    const { contents } = await client.getList<Category>({
      endpoint: CATEGORY_ENDPOINT,
      queries: { limit: 100 },
    });
    return contents;
  } catch {
    return [];
  }
}

// スラッグ(slag)からカテゴリーを1件取得する。見つからなければ null
export async function getCategoryBySlug(slag: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.slag === slag) ?? null;
}

// コンテンツID(数字。URLの [id] に使う)からカテゴリーを1件取得する。見つからなければ null
export async function getCategoryById(id: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((category) => category.id === id) ?? null;
}

const emptyList: MicroCMSListResponse<News> = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 0,
};

// 記事一覧を取得する(page は 1 始まり)。エラー時は空リストを返す
export async function getNewsList(
  perPage: number,
  page: number = 1
): Promise<MicroCMSListResponse<News>> {
  const offset = (page - 1) * perPage;
  try {
    return await client.getList<News>({
      endpoint: ENDPOINT,
      queries: { limit: perPage, offset, orders: '-publishedAt' },
    });
  } catch {
    return { ...emptyList, offset, limit: perPage };
  }
}

// カテゴリー別の記事一覧を取得する。コンテンツ参照はカテゴリーのコンテンツIDで絞り込む
export async function getNewsListByCategory(
  categoryId: string,
  perPage: number,
  page: number = 1
): Promise<MicroCMSListResponse<News>> {
  const offset = (page - 1) * perPage;
  try {
    return await client.getList<News>({
      endpoint: ENDPOINT,
      queries: {
        limit: perPage,
        offset,
        orders: '-publishedAt',
        filters: `category[contains]${categoryId}`,
      },
    });
  } catch {
    return { ...emptyList, offset, limit: perPage };
  }
}

// 記事詳細を取得する。見つからない場合は null を返す(ページ側で notFound() する)
export async function getNewsDetail(contentId: string): Promise<News | null> {
  try {
    return await client.getListDetail<News>({
      endpoint: ENDPOINT,
      contentId,
    });
  } catch {
    return null;
  }
}
