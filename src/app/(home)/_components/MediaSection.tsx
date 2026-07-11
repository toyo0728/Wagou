import type { CSSProperties } from 'react';
import Image from 'next/image';
import styles from './MediaSection.module.css';
import Heading from '@/components/ui/Heading';
import Button from '@/components/ui/Button';
import MediaList from '../../../components/ui/MediaList';
import ScrollFade from '@/components/ui/ScrollFade';

// イラストは CSS で scaleX(-1) 反転しているため、アニメーションで打ち消さないよう合成する
const flipStyle = { '--sf-extra': 'scaleX(-1)' } as CSSProperties;

const mediaItems = [
  { date: '2024/10/10', title: '雑誌〇〇に掲載されました。' },
  { date: '2024/10/10', title: '雑誌〇〇に掲載されました。' },
  { date: '2024/10/10', title: '雑誌〇〇に掲載されました。' },
  { date: '2024/10/10', title: '雑誌〇〇に掲載されました。' },
  { date: '2024/10/10', title: '雑誌〇〇に掲載されました。' },
];

export default function MediaSection() {
  return (
    <section id="media" className={styles.media}>
      <div className={styles.container}>
        <div className={styles.head}>
          <Heading mainText="メディア情報" />
          <ScrollFade
            variant="pop"
            className={`${styles.illustWrap} ${styles.illustPc}`}
            style={flipStyle}
          >
            <Image
              className={styles.illust}
              src="/media-illust.webp"
              alt=""
              width={226}
              height={170}
              aria-hidden
            />
          </ScrollFade>
        </div>
        <div className={styles.body}>
          <div className={styles.list}>
            {mediaItems.map((item, index) => (
              <MediaList key={index} date={item.date} title={item.title} />
            ))}
          </div>
          <Button href="/media/" text="全てを見る" />
        </div>
      </div>
      <ScrollFade
        variant="pop"
        className={`${styles.illustWrap} ${styles.illustSp}`}
        style={flipStyle}
      >
        <Image
          className={styles.illust}
          src="/media-illust.webp"
          alt=""
          width={174}
          height={131}
          aria-hidden
        />
      </ScrollFade>
    </section>
  );
}
