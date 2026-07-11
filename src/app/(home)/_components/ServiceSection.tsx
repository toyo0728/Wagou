import Image from 'next/image';
import Link from 'next/link';
import styles from './ServiceSection.module.css';
import Heading from '@/components/ui/Heading';
import ScrollFade from '@/components/ui/ScrollFade';

type ServiceItem = {
  src: string;
  label: string;
  href: string;
};

type MeditationItem = {
  src: string;
  title: string;
};

const services: ServiceItem[] = [
  { src: '/service/service-tea.webp', label: 'お茶を楽しむ', href: '/' },
  { src: '/service/service-products.webp', label: '商品を買う', href: '/' },
];

const meditations: MeditationItem[] = [
  { src: '/service/meditation-therapy.webp', title: 'セラピー' },
  { src: '/service/meditation-ochakai.webp', title: 'お茶を感じる会' },
  { src: '/service/meditation-yoga.webp', title: 'ヨガ' },
];

export default function ServiceSection() {
  return (
    <section id="service" className={styles.service}>
      <Heading mainText="和合でできること" />

      <div className={styles.serviceRow}>
        {services.map((service, i) => (
          <ScrollFade key={service.label} delay={i * 120} className={styles.serviceCard}>
            <div className={styles.serviceImage}>
              <Image
                src={service.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 464px, 90vw"
                className={styles.cover}
              />
            </div>
            <span className={styles.serviceTab}>{service.label}</span>
            <Link href={service.href} className={styles.serviceBtn}>
              詳しくはこちら
            </Link>
          </ScrollFade>
        ))}
      </div>

      <div className={styles.banner}>
        <div className={styles.bannerBg}>
          <Image
            src="/service/meditation-bg.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 966px, 100vw"
            className={styles.bannerBgImage}
            aria-hidden
          />
        </div>

        <div className={styles.bannerContent}>
          <div className={styles.medHead}>
            <p className={styles.medTitle}>茶・メディテーション</p>
            <p className={styles.medSub}>茶房で心も身体も癒す時間を。</p>
          </div>

          <div className={styles.medGroup}>
            <div className={styles.medCards}>
              {meditations.map((item, i) => (
                <ScrollFade key={item.title} delay={i * 120} className={styles.medCard}>
                  <div className={styles.medImage}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 262px, 80vw"
                      className={styles.cover}
                    />
                  </div>
                  <span className={styles.medLabel}>{item.title}</span>
                </ScrollFade>
              ))}
            </div>

            <Link href="/" className={styles.medBtn}>
              詳しくはこちら
            </Link>
          </div>
        </div>

        <ScrollFade variant="pop" className={styles.illust} aria-hidden>
          <Image src="/service/service-illust.webp" alt="" width={190} height={142} />
        </ScrollFade>
      </div>
    </section>
  );
}
