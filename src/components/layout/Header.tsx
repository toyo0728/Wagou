'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import MenuOverlay from './MenuOverlay';
import { navItems } from './navItems';
import styles from './Header.module.css';

// 下層ページ用ヘッダー(ロゴ + ハンバーガー)。
// トップページ('/')ではロゴ/ハンバーガーを FirstView・FixedHeader 側が担うため描画しない。
export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (pathname === '/') return null;

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="茶舗 和合 トップへ">
          <Image
            src="/first-view/logo-black.webp"
            alt="茶舗 和合"
            width={100}
            height={100}
            priority
          />
        </Link>

        <button
          type="button"
          className={styles.hamburger}
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
