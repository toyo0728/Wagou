import styles from './Heading.module.css';
import Image from 'next/image';

export type HeadingProps = {
  mainText: string;
};

export default function Heading(props: HeadingProps) {
  return (
    <div className={styles.heading}>
      <Image src="/heading.webp" alt="Wagou" width={100} height={38} />
      <h2 className={styles.main}>{props.mainText}</h2>
    </div>
  );
}
