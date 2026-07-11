import styles from './NewsSection.module.css';
import Heading from '@/components/ui/Heading';
import NewsCard from '@/components/ui/NewsCard';
import Button from '@/components/ui/Button';
import { getNewsList } from '@/lib/microcms';

export default async function NewsSection() {
  // トップページには最新3件を表示する
  const { contents: posts } = await getNewsList(3);

  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <Heading mainText="日々のこと" />
        <div className={styles.inner}>
          <div className={styles.cards}>
            {posts.map((post) => (
              <NewsCard
                key={post.id}
                src={post.eyecatch?.url ?? '/no-image.svg'}
                category={post.category?.[0]?.slag ?? ''}
                title={post.title}
                href={`/news/${post.id}/`}
              />
            ))}
          </div>
          <Button href="/news/" text="一覧へ" />
        </div>
      </div>
    </section>
  );
}
