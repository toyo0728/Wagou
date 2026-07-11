import styles from './Label.module.css';

type LabelProps = {
  text: string;
  isRequired?: boolean;
  id?: string;
  note?: string;
};

export default function Label({
  text,
  isRequired = true,
  id = '',
  note = '',
}: LabelProps) {
  return (
    <div className={styles.label}>
      <label htmlFor={id} className={styles.text}>
        {text}
      </label>
      {isRequired && <span className={styles.tag}>必須</span>}
      {note && <span className={styles.note}>{note}</span>}
    </div>
  );
}
