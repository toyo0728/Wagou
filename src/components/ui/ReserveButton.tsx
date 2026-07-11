import Link from 'next/link';
import styles from './ReserveButton.module.css';

type ReserveButtonProps = {
  href?: string;
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
};

export default function ReserveButton({
  href = '/contact/',
  className,
  onClick,
  tabIndex,
}: ReserveButtonProps) {
  return (
    <Link
      href={href}
      className={`${styles.reserveButton} ${className ?? ''}`}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <span className={styles.reserveShape} aria-hidden />
      <span className={styles.reserveTexts}>
        <span className={styles.reserveMain}>予約する</span>
        <span className={styles.reserveSub}>Reserve</span>
      </span>
      <span className={styles.reserveIllust} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/menu/reserve-illust.webp" alt="" />
      </span>
    </Link>
  );
}
