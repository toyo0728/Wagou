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

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
