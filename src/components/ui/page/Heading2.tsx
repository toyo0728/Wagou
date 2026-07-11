import styles from './Heading2.module.css';

type Heading2Props = {
  text: string;
};

export default function Heading2({ text }: Heading2Props) {
  return (
    <h2 className={styles.heading}>
      {text}
    </h2>
  );
}
