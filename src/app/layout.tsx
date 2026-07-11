import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Metadata } from 'next';
import {
  siteName,
  siteDescription,
  siteUrl,
  defaultOpenGraph,
} from '@/lib/metadata';

// フォントはプロジェクトごとに差し替える(CSS変数名は globals.css 側と合わせる)
const notoSansJP = Noto_Sans_JP({
  weight: ['700'],
  variable: '--font-noto-sans-jp',
});

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif-jp',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  description: siteDescription,
  openGraph: defaultOpenGraph,
  // 公開時に index: true, follow: true へ変更する
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
