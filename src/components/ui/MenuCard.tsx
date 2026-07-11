import styles from './MenuCard.module.css';
import Image from 'next/image';

type MenuCardProps = {
  src: string;
  title: string;
  onClick: () => void;
};

export default function MenuCard({ src, title, onClick }: MenuCardProps) {
  return (
    <button type="button" onClick={onClick} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.thumbnail}
          src={src}
          alt={title}
          width="300"
          height="225"
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.button}>詳細へ</span>
      </div>
    </button>
  );
}
