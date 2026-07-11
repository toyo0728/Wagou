import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/metadata';

// /robots.txt として配信される。
// インデックス可否自体は layout.tsx の metadata.robots(meta robots)で制御する
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
