import NewsCard from '@/components/ui/NewsCard';
import styles from './NewsList.module.css';
import type { News } from '@/types/microcms';

type NewsListProps = {
  posts: News[];
};

export default function NewsList({ posts }: NewsListProps) {
  if (posts.length === 0) {
    return <p className={styles.empty}>記事がありません</p>;
  }

  return (
    <ul className={styles.list}>
      {posts.map((post) => (
        <li className={styles.item} key={post.id}>
          <NewsCard
            href={`/news/${post.id}/`}
            src={post.eyecatch?.url ?? '/no-image.svg'}
            title={post.title}
            category={post.category?.[0]?.slag ?? ''}
          />
        </li>
      ))}
    </ul>
  );
}
