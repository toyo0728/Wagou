'use client';

import { useEffect, useState } from 'react';
import ReserveButton from '@/components/ui/ReserveButton';
import MenuOverlay from './MenuOverlay';
import { navItems } from './navItems';
import styles from './FixedHeader.module.css';

// FirstView を超えたら、ハンバーガーと予約ボタンをスクロールに追従(SP / PC 共通)
export default function FixedHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const firstView = document.querySelector('[data-section="first-view"]');
    if (!firstView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = !entry.isIntersecting;
        setIsVisible(visible);
        // FirstView に戻ってきたら、開いていたメニューは閉じる
        if (!visible) setIsMenuOpen(false);
      },
      { threshold: 0 },
    );

    observer.observe(firstView);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className={`${styles.hamburger} ${isVisible ? styles.isVisible : ''}`}
        aria-label="メニューを開く"
        aria-expanded={isMenuOpen}
        aria-hidden={!isVisible}
        tabIndex={isVisible ? 0 : -1}
        onClick={() => setIsMenuOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`${styles.fixedReserve} ${isVisible ? styles.isVisible : ''}`}
        aria-hidden={!isVisible}
      >
        <ReserveButton className={styles.reserveButton} tabIndex={isVisible ? 0 : -1} />
      </div>

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
