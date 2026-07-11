'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from './MenuModal.module.css';

export type MenuItem = {
  id: string;
  src: string;
  title: string;
  description: string;
};

type MenuModalProps = {
  item: MenuItem;
  onClose: () => void;
};

export default function MenuModal({ item, onClose }: MenuModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.imageWrap}>
          <Image
            className={styles.thumbnail}
            src={item.src}
            alt={item.title}
            width="300"
            height="225"
          />
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.footer}>
          <button type="button" className={styles.close} onClick={onClose}>
            <span className={styles.closeText}>閉じる</span>
            <svg
              className={styles.closeIcon}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              aria-hidden="true"
            >
              <line x1="1" y1="1" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
              <line x1="14" y1="1" x2="1" y2="14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
