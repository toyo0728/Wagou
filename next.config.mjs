/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    useLightningcss: true,
  },
  images: {
    remotePatterns: [
      // 使用するCMSの画像ドメインを追加する
      new URL('https://images.microcms-assets.io/**'),
      // 例) WordPressを使う場合:
      // new URL('https://example.com/**'),
    ],
  },
};

export default nextConfig;

// OpenNext (Cloudflare) の開発用初期化。`next dev` 実行時に Cloudflare の
// バインディング(env)をローカルで利用できるようにする。本番ビルドには影響しない。
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
