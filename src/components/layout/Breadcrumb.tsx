import styles from './Breadcrumb.module.css';
import Link from 'next/link';
import { siteUrl } from '@/lib/metadata';

type BreadcrumbProps = {
  items: {
    href: string;
    text: string;
  }[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  // 検索結果にパンくずを表示させるための構造化データ(BreadcrumbList)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.text,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };

  return (
    <div className={styles.Breadcrumb}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className={styles.Container}>
        <ul className={styles.Lists}>
          {items.map((item) => (
            <li className={styles.List} key={item.href}>
              <Link href={item.href} className={styles.Link}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
