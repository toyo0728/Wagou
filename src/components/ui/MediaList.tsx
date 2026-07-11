import styles from './MediaList.module.css';

type MediaListProps = {
  date: string;
  title: string;
};

export default function MediaList({ date, title }: MediaListProps) {
  return (
    <div className={styles.item}>
      <p className={styles.date}>{date}</p>
      <p className={styles.title}>{title}</p>
    </div>
  );
}
