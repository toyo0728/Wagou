import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// このサイトは ISR(revalidate) を使わない完全静的構成のため、
// ビルド時にプリレンダーしたページを静的アセットから配信する方式を使う。
// R2/KV などの外部リソースは不要。
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
