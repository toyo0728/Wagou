import Pagination from '@/components/ui/Pagination';
import NewsList from '@/components/ui/NewsList';
import styles from './News.module.css';
import { getNewsList } from '@/lib/microcms';
import Breadcrumb from '@/components/layout/Breadcrumb';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';
import Heading from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: '日々のこと',
  description: '日々のこと一覧ページです。',
  alternates: {
    canonical: '/news/',
  },
  openGraph: {
    ...defaultOpenGraph,
    title: `日々のこと | ${siteName}`,
    url: '/news/',
  },
};

export default async function News() {
  const perPage = 9;
  const currentPage = 1;
  const { contents: posts, totalCount } = await getNewsList(perPage);
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <>
      <div className={styles.container}>
        <Heading mainText="日々のこと" />
        <div className={styles.contents}>
          <NewsList posts={posts} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/news/"
          />
        </div>
      </div>
      <Breadcrumb
        items={[
          { href: '/', text: 'トップページ' },
          { href: '/news/', text: '日々のこと' },
        ]}
      />
    </>
  );
}
