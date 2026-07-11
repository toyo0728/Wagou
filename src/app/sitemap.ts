import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/metadata';
import { getNewsList } from '@/lib/microcms';

// /sitemap.xml として配信される。固定ページを追加したらここにも足すこと
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['/', '/news/', '/contact/'].map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
  }));

  // microCMS 未接続・エラー時は getNewsList が空リストを返すので固定ページのみになる
  const { contents: posts } = await getNewsList(100);
  const postRoutes = posts.map((post) => ({
    url: new URL(`/news/${post.id}/`, siteUrl).toString(),
    lastModified: new Date(post.revisedAt ?? post.updatedAt),
  }));

  return [...staticRoutes, ...postRoutes];
}
