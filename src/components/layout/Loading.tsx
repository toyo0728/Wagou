'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Loading.module.css';

// 0→100% までのカウント時間(ms)とフェードアウト時間(ms)
const COUNT_DURATION = 2000;
const FADE_DURATION = 600;

// 一度ローディングを再生したかの記録キー。
// localStorage に保存するため、ブラウザ(端末)を変えるまで再生しない。
const STORAGE_KEY = 'wagou:loaded';

// SSR では useEffect にフォールバック(useLayoutEffect の警告回避)
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function hasLoadedBefore() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    // プライベートモード等で localStorage が使えない場合は毎回再生
    return false;
  }
}

function markLoaded() {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* noop */
  }
}

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  // 初回訪問以外はローディングをスキップする
  const skip = useRef(false);

  // 描画前に判定し、2回目以降はチラつかせずに即座に隠す
  useIsomorphicLayoutEffect(() => {
    if (hasLoadedBefore()) {
      skip.current = true;
      setIsHidden(true);
    }
  }, []);

  useEffect(() => {
    // サイトに入った最初の一回だけ再生する
    if (skip.current) return;
    markLoaded();

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
    if (isHidden || skip.current) return;

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
