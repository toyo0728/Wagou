import styles from './Heading3.module.css';

type Heading3Props = {
  text: string;
  isCenter?: boolean;
};

export default function Heading3({ text, isCenter = false }: Heading3Props) {
  return (
    <h3
      className={`${styles.heading} ${isCenter ? styles.isCenter : ''}`}
    >
      <span className={styles.line} aria-hidden="true" />
      <span className={styles.text}>{text}</span>
      <span className={styles.line} aria-hidden="true" />
    </h3>
  );
}
