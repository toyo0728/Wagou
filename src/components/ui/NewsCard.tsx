import styles from './NewsCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

type NewsCardProps = {
  src: string;
  title: string;
  category: string;
  href: string;
};

export default function NewsCard({ src, title, category, href }: NewsCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.thumbnail}
          src={src}
          alt=""
          width="364"
          height="243"
        />
        <span className={styles.category}>{category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </Link>
  );
}
