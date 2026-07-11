import Heading from '@/components/ui/Heading';
import NewsList from '@/components/ui/NewsList';
import Pagination from '@/components/ui/Pagination';
import styles from '../../News.module.css';
import {
  getCategories,
  getCategoryById,
  getNewsListByCategory,
} from '@/lib/microcms';
import Breadcrumb from '@/components/layout/Breadcrumb';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';
import { notFound } from 'next/navigation';

type NewsProps = {
  params: Promise<{ id: string }>;
};

// URLパラメータ [id] はカテゴリーのコンテンツID(数字)。登録済みカテゴリー分を静的生成する
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({
  params,
}: NewsProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryById(decodeURIComponent(id));

  if (!category) {
    return {};
  }

  const description = `「${category.slag}」の記事一覧ページです。`;
  return {
    title: `「${category.slag}」の記事`,
    description,
    alternates: {
      canonical: `/news/category/${category.id}/`,
    },
    openGraph: {
      ...defaultOpenGraph,
      title: `「${category.slag}」の記事 | ${siteName}`,
      description,
      url: `/news/category/${category.id}/`,
    },
  };
}

export default async function News({ params }: NewsProps) {
  const { id } = await params;
  const category = await getCategoryById(decodeURIComponent(id));

  if (!category) {
    notFound();
  }

  const currentPage = 1;
  const perPage = 9;
  const { contents: posts, totalCount } = await getNewsListByCategory(
    category.id,
    perPage
  );
  const totalPages = Math.ceil(totalCount / perPage);

  const breadcrumbItems = [
    { href: '/', text: 'トップページ' },
    { href: '/news/', text: '日々のこと' },
    { href: `/news/category/${category.id}/`, text: category.slag },
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
