import styles from './Sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { getNewsList } from '@/lib/microcms';
import { formatDate } from '@/utils/date';

export default async function Sidebar() {
  // サイドバー「最近の投稿」用に最新5件を取得
  const { contents: recentPosts } = await getNewsList(5);

  return (
    <div className={styles.sidebar}>
      <Link href="/contact/" className={styles.reservation}>
        <Image
          className={styles.reservationImage}
          src="/reservation.webp"
          alt="ご予約はこちら"
          width={300}
          height={183}
        />
      </Link>
      {recentPosts.length > 0 && (
        <div className={styles.recent}>
          <h2 className={styles.recentHeading}>最近の投稿</h2>
          <div className={styles.recentList}>
            {recentPosts.map((recent) => {
              const date = recent.publishedAt ?? recent.createdAt;
              return (
                <Link
                  href={`/news/${recent.id}/`}
                  className={styles.post}
                  key={recent.id}
                >
                  <time className={styles.postDate} dateTime={date}>
                    {formatDate(date, '/')}
                  </time>
                  <p className={styles.postTitle}>{recent.title}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
