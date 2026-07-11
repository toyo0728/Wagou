import styles from './Button.module.css';
import Link from 'next/link';

type ButtonProps = {
  href: string;
  text: string;
};

export default function Button(props: ButtonProps) {
  return (
    <Link href={props.href} className={styles.button}>
      {props.text}
    </Link>
  );
}
