import Pagination from '@/components/ui/Pagination';
import NewsList from '@/components/ui/NewsList';
import styles from '../../News.module.css';
import { getNewsList } from '@/lib/microcms';
import Breadcrumb from '@/components/layout/Breadcrumb';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';
import Heading from '@/components/ui/Heading';
import { notFound } from 'next/navigation';

type NewsProps = {
  params: Promise<{ page: string }>;
};

export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { page } = await params;
  return {
    title: '日々のこと',
    description: '日々のこと一覧ページです。',
    alternates: {
      canonical: `/news/page/${page}/`,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: `日々のこと | ${siteName}`,
      url: `/news/page/${page}/`,
    },
  };
}

export default async function News({ params }: NewsProps) {
  const { page } = await params;
  const currentPage = parseInt(page);

  if (Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const perPage = 9;
  const { contents: posts, totalCount } = await getNewsList(
    perPage,
    currentPage
  );

  if (posts.length === 0) {
    notFound();
  }

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
          { href: `/news/page/${currentPage}/`, text: `ページ ${currentPage}` },
        ]}
      />
    </>
  );
}
