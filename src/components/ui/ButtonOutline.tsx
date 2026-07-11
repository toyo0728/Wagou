import styles from './ButtonOutline.module.css';
import Link from 'next/link';

type ButtonOutlineProps = {
  text: string;
  href?: string;
  onClick?: () => void;
};

export default function ButtonOutline({ text, href, onClick }: ButtonOutlineProps) {
  if (href) {
    return (
      <Link href={href} className={styles.buttonOutline}>
        {text}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={styles.buttonOutline}>
      {text}
    </button>
  );
}
