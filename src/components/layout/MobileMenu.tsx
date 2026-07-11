'use client';

import { useState } from 'react';
import MenuOverlay from './MenuOverlay';
import type { NavItem } from './navItems';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  navItems: NavItem[];
};

// FirstView 内(SP)のハンバーガー。スクロール前の初期表示用。
export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.hamburger}
        aria-label="メニューを開く"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <MenuOverlay
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
