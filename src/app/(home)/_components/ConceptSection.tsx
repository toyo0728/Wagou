import Image from 'next/image';
import styles from './ConceptSection.module.css';
import ScrollFade from '@/components/ui/ScrollFade';

const leaves = [
  {
    className: 'leaf1',
    src: '/concept/photo-child.webp',
    sizes: '(min-width: 1024px) 22vw, 50vw',
  },
  {
    className: 'leaf2',
    src: '/concept/photo-sign.webp',
    sizes: '(min-width: 1024px) 22vw, 68vw',
  },
  {
    className: 'leaf3',
    src: '/concept/photo-tea.webp',
    sizes: '(min-width: 1024px) 26vw, 1px',
  },
  {
    className: 'leaf4',
    src: '/concept/photo-guests.webp',
    sizes: '(min-width: 1024px) 25vw, 1px',
  },
];

export default function ConceptSection() {
  return (
    <section className={styles.concept}>
      <div className={styles.inner}>
        {/* 各リーフ写真の背後に敷く、にじむ背景グロー（デザインの Vector） */}
        {leaves.map((leaf) => (
          <span
            key={`glow-${leaf.className}`}
            className={`${styles.glow} ${styles[`glow${leaf.className.slice(-1)}`]}`}
            aria-hidden
          />
        ))}

        {leaves.slice(0, 2).map((leaf, i) => (
          <ScrollFade
            as="figure"
            key={leaf.className}
            delay={i * 120}
            className={`${styles.leaf} ${styles[leaf.className]}`}
            aria-hidden
          >
            <Image src={leaf.src} alt="" fill sizes={leaf.sizes} className={styles.leafImage} />
          </ScrollFade>
        ))}

        <div className={styles.content}>
          <div className={styles.texts}>
            <h2 className={styles.title}>和み合う、茶舗和合</h2>
            <div className={styles.body}>
            <p className={styles.paragraph}>
              こもださんの農園では、
              <br />
              真菰、米、お茶の栽培を行っています。
              <br />
              知多半島の海風と太陽のめぐみを有効活用し、
              <br />
              人と自然と植物、
              <br className={styles.brSp} />
              すべてが調和するように農業をしています。
              <br />
              そして、仲間たちが惜しみなく
              <br className={styles.brSp} />
              心と手をかけてくれるからこそ、
              <br />
              植物の本来もつ力を信頼し、
              <br className={styles.brSp} />
              それを活かすことができています。
            </p>
            <p className={styles.paragraph}>
              互いに無理しすぎることなく、助け合う心、
              <br className={styles.brSp} />
              分け合う心を大切に、
              <br />
              ちきゅうであそぶように農園をしています。
              <br />
              こうしてうまれた一杯のお茶を、
              <br />
              おもてなしの心とともにお届けしたい。
              <br />
              茶舗 和合は、日常から離れ、ほっとゆっくりひとやすみ。
            </p>
            <p className={styles.paragraph}>
              からだとこころを清め、調える、お茶所です。
              <br />
              あなたの大切な今日という日の、
              <br />
              なごみのひとときと
              <br />
              なりますように。
            </p>
            </div>
          </div>
          <ScrollFade variant="pop" className={styles.illust}>
            <Image
              src="/concept/concept-illust.webp"
              alt=""
              width={190}
              height={142}
              aria-hidden
            />
          </ScrollFade>
        </div>

        {leaves.slice(2, 4).map((leaf, i) => (
          <ScrollFade
            as="figure"
            key={leaf.className}
            delay={i * 120}
            className={`${styles.leaf} ${styles[leaf.className]}`}
            aria-hidden
          >
            <Image src={leaf.src} alt="" fill sizes={leaf.sizes} className={styles.leafImage} />
          </ScrollFade>
        ))}

        <div className={styles.spStage} aria-hidden>
          <span className={`${styles.glow} ${styles.spGlowSign}`} />
          <span className={`${styles.glow} ${styles.spGlowTea}`} />
          <ScrollFade as="figure" className={`${styles.spLeaf} ${styles.spSign}`}>
            <Image
              src="/concept/photo-sign.webp"
              alt=""
              fill
              sizes="(max-width: 1023px) 72vw, 1px"
              className={styles.leafImage}
            />
          </ScrollFade>
          <ScrollFade as="figure" delay={120} className={`${styles.spLeaf} ${styles.spTea}`}>
            <Image
              src="/concept/photo-child.webp"
              alt=""
              fill
              sizes="(max-width: 1023px) 52vw, 1px"
              className={styles.leafImage}
            />
          </ScrollFade>
        </div>
      </div>
    </section>
  );
}
