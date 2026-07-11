import Image from 'next/image';
import Link from 'next/link';
import styles from './FirstView.module.css';
import FirstViewSlider from './FirstViewSlider';
import MobileMenu from '@/components/layout/MobileMenu';
import { navItems } from '@/components/layout/navItems';
import SmoothScrollLink from '@/components/ui/SmoothScrollLink';

export default function FirstView() {
  return (
    <section className={styles.firstView} aria-label="ファーストビュー" data-section="first-view">
      <div className={styles.stage}>
        <div className={styles.bg} aria-hidden>
          <Image
            src="/first-view/bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.bgImage}
          />
        </div>

        <FirstViewSlider />

        <div className={styles.fvBottom} aria-hidden>
          <Image
            src="/first-view/fv-bottom.webp"
            alt=""
            width={1440}
            height={310}
            className={styles.fvBottomImage}
          />
        </div>

        <Link href="/" className={styles.logo} aria-label="茶舗 和合 トップへ">
          <Image src="/first-view/logo-black.webp" alt="茶舗 和合" width={130} height={130} priority />
        </Link>

        <MobileMenu navItems={navItems} />

        <nav className={styles.nav} aria-label="メインナビゲーション">
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.label}>
                <SmoothScrollLink href={item.href} className={styles.navLink}>
                  {item.label}
                </SmoothScrollLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.concept} aria-hidden>
          <div className={`${styles.conceptCol} ${styles.conceptShop}`}>
            <p className={styles.conceptText}>茶舗和合</p>
          </div>
          <div className={`${styles.conceptCol} ${styles.conceptHarmony}`}>
            <p className={styles.conceptText}>和み合う</p>
          </div>
          <div className={`${styles.conceptCol} ${styles.conceptRest}`}>
            <p className={styles.conceptText}>ひと休み</p>
          </div>
        </div>

        <div className={styles.bears} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/first-view/top-illust.webp" alt="" className={styles.bearsImage} />
        </div>
      </div>
    </section>
  );
}
