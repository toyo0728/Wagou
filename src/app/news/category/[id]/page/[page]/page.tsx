import Heading from '@/components/ui/Heading';
import NewsList from '@/components/ui/NewsList';
import Pagination from '@/components/ui/Pagination';
import styles from '../../../../News.module.css';
import { getCategoryById, getNewsListByCategory } from '@/lib/microcms';
import Breadcrumb from '@/components/layout/Breadcrumb';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';
import { notFound } from 'next/navigation';

type NewsProps = {
  params: Promise<{ id: string; page: string }>;
};

export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { id, page } = await params;
  const category = await getCategoryById(decodeURIComponent(id));

  if (!category) {
    return {};
  }

  const description = `「${category.slag}」の記事一覧ページです。`;
  return {
    title: `「${category.slag}」の記事`,
    description,
    alternates: {
      canonical: `/news/category/${category.id}/page/${page}/`,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: `「${category.slag}」の記事 | ${siteName}`,
      description,
      url: `/news/category/${category.id}/page/${page}/`,
    },
  };
}

export default async function News({ params }: NewsProps) {
  const { id, page } = await params;
  const category = await getCategoryById(decodeURIComponent(id));
  const currentPage = parseInt(page);

  if (!category || Number.isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const perPage = 9;
  const { contents: posts, totalCount } = await getNewsListByCategory(
    category.id,
    perPage,
    currentPage
  );

  if (posts.length === 0) {
    notFound();
  }

  const totalPages = Math.ceil(totalCount / perPage);

  const breadcrumbItems = [
    { href: '/', text: 'トップページ' },
    { href: '/news/', text: '日々のこと' },
    { href: `/news/category/${category.id}/`, text: category.slag },
    {
      href: `/news/category/${category.id}/page/${currentPage}/`,
      text: `ページ ${currentPage}`,
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <Heading mainText={category.slag} />
        <div className={styles.contents}>
          <NewsList posts={posts} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/news/category/${category.id}/`}
          />
        </div>
      </div>
      <Breadcrumb items={breadcrumbItems} />
    </>
  );
}
