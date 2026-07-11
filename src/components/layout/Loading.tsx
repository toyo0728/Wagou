'use client';

import { useEffect, useState } from 'react';
import styles from './Loading.module.css';

// 0→100% までのカウント時間(ms)とフェードアウト時間(ms)
const COUNT_DURATION = 2000;
const FADE_DURATION = 600;

// このモジュールを評価してから一度でも再生したか。
// 初回アクセス/リロードではページ全体が再読み込みされてモジュールが再評価され
// false に戻るため再生する。アプリ内(<Link>)のページ遷移ではモジュールが
// メモリに残り true のままなので、他ページからトップへ戻っても再生しない。
let hasPlayed = false;

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  // 遷移で戻ってきた場合は初期状態から隠しておき、チラつきを防ぐ
  const [isHidden, setIsHidden] = useState(hasPlayed);

  useEffect(() => {
    // 初回アクセス/リロード時の一回だけ再生する
    if (hasPlayed) return;
    hasPlayed = true;

    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const ratio = Math.min((now - start) / COUNT_DURATION, 1);
      setProgress(Math.round(ratio * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setIsFadingOut(true);
        window.setTimeout(() => setIsHidden(true), FADE_DURATION);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // 表示中はスクロールを止める(iOS のタッチスクロールも抑止)
  useEffect(() => {
    if (isHidden) return;

    const preventTouch = (e: TouchEvent) => e.preventDefault();

    const { overflow } = document.body.style;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventTouch, { passive: false });

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = overflow;
      document.removeEventListener('touchmove', preventTouch);
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <div
      className={`${styles.loading} ${isFadingOut ? styles.isFadingOut : ''}`}
      aria-hidden="true"
    >
      <div className={styles.inner}>
        <picture className={styles.logo}>
          <source media="(width < 768px)" srcSet="/loading-sp.webp" />
          <img src="/loading-pc.webp" alt="" />
        </picture>
        <p className={styles.percent}>
          {progress}
          <span className={styles.unit}>%</span>
        </p>
      </div>
    </div>
  );
}
