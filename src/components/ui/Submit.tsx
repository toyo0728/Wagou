import styles from './Submit.module.css';

export default function Submit({
  text,
  disabled = false,
}: {
  text: string;
  disabled?: boolean;
}) {
  return (
    <button className={styles.submit} type="submit" disabled={disabled}>
      {text}
    </button>
  );
}
