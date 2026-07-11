'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import ReserveButton from '@/components/ui/ReserveButton';
import SmoothScrollLink from '@/components/ui/SmoothScrollLink';
import type { NavItem } from './navItems';
import styles from './MenuOverlay.module.css';

type MenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
};

// ハンバーガーから開くスライドインメニュー(SP / PC 共通)
export default function MenuOverlay({ isOpen, onClose, navItems }: MenuOverlayProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.isOpen : ''}`}
      aria-hidden={!isOpen}
    >
      <div className={styles.stage}>
        <button
          type="button"
          className={styles.backdrop}
          aria-label="メニューを閉じる"
          tabIndex={isOpen ? 0 : -1}
          onClick={onClose}
        />

        <nav className={styles.panel} aria-label="ナビゲーション">
          {/* カンプ(280x879)の比率を固定したボックス。中身はこの中に絶対配置する */}
          <div className={styles.content}>
            <button
              type="button"
              className={styles.close}
              aria-label="メニューを閉じる"
              tabIndex={isOpen ? 0 : -1}
              onClick={onClose}
            >
              <span />
              <span />
            </button>

            <Link
              href="/"
              className={styles.logo}
              tabIndex={isOpen ? 0 : -1}
              onClick={onClose}
            >
              <Image src="/first-view/logo-black.webp" alt="茶舗 和合" width={100} height={100} />
            </Link>

            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <SmoothScrollLink
                    href={item.href}
                    className={styles.navLink}
                    tabIndex={isOpen ? 0 : -1}
                    onClick={onClose}
                  >
                    {item.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>

            <ReserveButton
              className={styles.reserve}
              tabIndex={isOpen ? 0 : -1}
              onClick={onClose}
            />
          </div>
        </nav>
      </div>
    </div>
  );
}
