import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import SmoothScrollLink from '@/components/ui/SmoothScrollLink';

const menuItems = [
  { label: '和合について', href: '/concept' },
  { label: 'おしながき', href: '/#menu' },
  { label: '茶・メディテーション', href: '/#service' },
  { label: '日々のこと', href: '/news/' },
  { label: 'メディア情報', href: '/#media' },
  { label: 'アクセス', href: '/#access' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topCurve} />
      <div className={styles.inner}>
        <div className={styles.group}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logoLink}>
              <Image
                className={styles.logo}
                src="/logo-black.webp"
                alt="茶舗和合"
                width={130}
                height={130}
              />
            </Link>
            <div className={styles.address}>
              <p className={styles.shopName}>茶舗和合</p>
              <p className={styles.addressText}>愛知県常滑市栄町6丁目166</p>
            </div>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              {menuItems.map((item, index) => (
                <li key={item.href} className={styles.menuItem}>
                  {index > 0 && <span className={styles.divider} aria-hidden />}
                  <SmoothScrollLink href={item.href} className={styles.menuLink}>
                    {item.label}
                  </SmoothScrollLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.note}>
          <p>
            このサイトは「茶舗和合」様のご協力のもと作成した
            <br className={styles.spBr} aria-hidden />
            コーディング用の練習課題です。
          </p>
          <p>copyright</p>
        </div>
      </div>
    </footer>
  );
}
