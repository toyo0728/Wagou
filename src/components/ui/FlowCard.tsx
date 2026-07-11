import Image from 'next/image';
import styles from './FlowCard.module.css';

type FlowCardProps = {
  number: string;
  title: string;
  description: string;
  src: string;
  alt?: string;
};

export default function FlowCard({ number, title, description, src, alt = '' }: FlowCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 250px, 100vw"
        />
      </div>
      <div className={styles.body}>
        <div className={styles.number}>
          <span className={styles.dot} aria-hidden />
          <span className={styles.numberText}>{number}</span>
        </div>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>{title}</h3>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
