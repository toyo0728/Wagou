'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

type SmoothScrollLinkProps = {
  href: string;
  className?: string;
  tabIndex?: number;
  onClick?: () => void;
  children: ReactNode;
};

// ナビの list から押したときだけ、同一ページ内のアンカー(/#menu 等)へ
// スムーススクロールで移動する Link。別ページへの遷移は通常どおり Next に任せる。
export default function SmoothScrollLink({
  href,
  onClick,
  ...rest
}: SmoothScrollLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    const hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;

    const targetPath = normalizePath(href.slice(0, hashIndex));
    // ハッシュを含んでいても遷移先が別ページなら通常遷移
    if (targetPath !== normalizePath(pathname)) return;

    const el = document.getElementById(href.slice(hashIndex + 1));
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', href);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}

function normalizePath(path: string) {
  return path.replace(/\/+$/, '') || '/';
}
