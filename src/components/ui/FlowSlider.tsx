'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import FlowCard from '@/components/ui/FlowCard';
import styles from './FlowSlider.module.css';

export type FlowItem = {
  number: string;
  title: string;
  description: string;
  src: string;
  alt?: string;
};

type FlowSliderProps = {
  items: FlowItem[];
};

export default function FlowSlider({ items }: FlowSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const count = items.length;

  const goTo = useCallback(
    (next: number) => {
      const el = trackRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(count - 1, next));
      setIndex(clamped);
      const max = el.scrollWidth - el.clientWidth;
      const left = count > 1 ? (clamped / (count - 1)) * max : 0;
      el.scrollTo({ left, behavior: 'smooth' });
    },
    [count],
  );

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) {
      setIndex(0);
      setProgress(0);
      return;
    }
    const ratio = el.scrollLeft / max;
    setProgress(ratio);
    const nearest = Math.round(ratio * (count - 1));
    setIndex(Math.max(0, Math.min(count - 1, nearest)));
  }, [count]);

  useEffect(() => {
    const onResize = () => handleScroll();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [handleScroll]);

  const thumbSize = 100 / count;
  const thumbLeft = progress * (100 - thumbSize);

  return (
    <div className={styles.slider}>
      <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
        {items.map((item) => (
          <div className={styles.slide} data-card key={item.number}>
            <FlowCard
              number={item.number}
              title={item.title}
              description={item.description}
              src={item.src}
              alt={item.alt}
            />
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.bar}>
          <span
            className={styles.thumb}
            style={{ width: `${thumbSize}%`, left: `${thumbLeft}%` }}
          />
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="前のカードへ"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
              <path
                d="M15 4L7 12L15 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="次のカードへ"
            onClick={() => goTo(index + 1)}
            disabled={index === count - 1}
          >
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden>
              <path
                d="M9 4L17 12L9 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
