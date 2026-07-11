'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import styles from './FirstView.module.css';

const SLIDES = [
  {
    src: '/first-view/slider-1.webp',
    alt: '茶舗の店内でお茶を準備する様子',
  },
  {
    src: '/first-view/slider-2.webp',
    alt: '急須からお茶を注ぐ手元',
    crop: true,
  },
  {
    src: '/first-view/slider-3.webp',
    alt: '店舗外観',
  },
  {
    src: '/first-view/slider-4.webp',
    alt: '施術の様子',
  },
  {
    src: '/first-view/slider-5.webp',
    alt: 'カウンターでお茶をいただく様子',
  },
] as const;

const AUTOPLAY_MS = 4000;

export default function FirstViewSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = SLIDES.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [count]);

  return (
    <>
      <figure className={styles.leaf} aria-label="メインビジュアル">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`${styles.slide} ${index === activeIndex ? styles.isActive : ''}`}
            aria-hidden={index !== activeIndex}
          >
            {'crop' in slide && slide.crop ? (
              <div className={styles.leafImageCropWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={index === activeIndex ? slide.alt : ''}
                  className={styles.leafImageCrop}
                />
              </div>
            ) : (
              <Image
                src={slide.src}
                alt={index === activeIndex ? slide.alt : ''}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 69vw, 90vw"
                className={styles.leafImage}
              />
            )}
          </div>
        ))}
      </figure>

      <div className={styles.dots} role="tablist" aria-label="スライド切り替え">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`${index + 1}枚目: ${slide.alt}`}
            className={`${styles.dot} ${index === activeIndex ? styles.isActive : ''}`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </>
  );
}
