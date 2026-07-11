'use client';

import { type CSSProperties, type ElementType, type ReactNode, useEffect, useRef, useState } from 'react';
import styles from './ScrollFade.module.css';

type ScrollFadeProps = {
  /** レンダリングするタグ。既存レイアウトを崩さないよう置き換え元と同じものを指定する（既定: div） */
  as?: ElementType;
  /** アニメーションの種類。'fade' = 静かにフェードアップ / 'pop' = 下からひょこっと弾む（イラスト向け） */
  variant?: 'fade' | 'pop';
  /** 表示までの遅延(ms)。ずらして順番に出したいときに使う */
  delay?: number;
  /** 一度表示したら監視を解除する（既定: true） */
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  // 任意の属性（aria-*, key など）を透過
  [key: string]: unknown;
};

export default function ScrollFade({
  as,
  variant = 'fade',
  delay = 0,
  once = true,
  className = '',
  style,
  children,
  ...rest
}: ScrollFadeProps) {
  const Tag = (as ?? 'div') as ElementType;
  const variantClass = variant === 'pop' ? styles.pop : styles.fade;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${isVisible ? styles.isVisible : ''} ${className}`}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
