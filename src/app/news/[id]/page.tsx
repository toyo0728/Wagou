export const dynamic = 'force-static';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Post.module.css';
import Category from '@/components/ui/news/Category';
import Sidebar from '@/components/layout/Sidebar';
import { getNewsDetail, getNewsList } from '@/lib/microcms';
import { formatDate } from '@/utils/date';
import { stripHtmlTags } from '@/utils/string';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName, siteUrl } from '@/lib/metadata';

type NewsProps = {
  params: Promise<{ id: string }>;
};

// 全記事を静的生成する。ここに無いIDは(dynamicParams既定=true)オンデマンド生成される
export async function generateStaticParams() {
  const { contents } = await getNewsList(100);
  return contents.map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getNewsDetail(id);

  if (!post) {
    return {};
  }

  const description = stripHtmlTags(post.content).slice(0, 120);
  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/news/${id}/`,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: `${post.title} | ${siteName}`,
      description,
      url: `/news/${id}/`,
      images: post.eyecatch?.url ? [post.eyecatch.url] : defaultOpenGraph.images,
    },
  };
}

export default async function Post({ params }: NewsProps) {
  const { id } = await params;

  const post = await getNewsDetail(id);

  if (!post) {
    notFound();
  }

  const category = post.category?.[0];
  const publishedAt = post.publishedAt ?? post.createdAt;

  const breadcrumbItems = [
    { href: '/', text: 'トップページ' },
    { href: '/news/', text: '日々のこと' },
    { href: `/news/${id}/`, text: post.title },
  ];

  // 検索結果にパンくずを表示させるための構造化データ(BreadcrumbList)
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.text,
      item: new URL(item.href, siteUrl).toString(),
    })),
  };

  return (
    <>
      <div className={styles.main}>
        <article className={styles.contents}>
          <Image
            className={styles.eyecatch}
            src={post.eyecatch?.url ?? '/no-image.svg'}
            alt=""
            width={post.eyecatch?.width ?? 600}
            height={post.eyecatch?.height ?? 400}
            priority
          />
          <div className={styles.meta}>
            {category && (
              <Link href={`/news/category/${category.id}/`}>
                <Category name={category.slag.toUpperCase()} />
              </Link>
            )}
            <time className={styles.date} dateTime={publishedAt}>
              {formatDate(publishedAt)}
            </time>
          </div>
          <div className={styles.body}>
            <h1 className={styles.title}>{post.title}</h1>
            <div
              className={styles.article}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
      </div>
      <nav className={styles.breadcrumb} aria-label="パンくずリスト">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <ol className={styles.breadcrumbList}>
          {breadcrumbItems.map((item, index) => {
            const isCurrent = index === breadcrumbItems.length - 1;
            return (
              <li className={styles.breadcrumbItem} key={item.href}>
                {index > 0 && (
                  <svg
                    className={styles.breadcrumbArrow}
                    width="7"
                    height="11"
                    viewBox="0 0 7 11"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M1 1L5.5 5.5L1 10"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {isCurrent ? (
                  <span
                    className={`${styles.breadcrumbLink} ${styles.isCurrent}`}
                    aria-current="page"
                  >
                    {item.text}
                  </span>
                ) : (
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.text}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
