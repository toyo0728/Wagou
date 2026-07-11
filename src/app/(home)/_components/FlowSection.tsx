import type { CSSProperties } from 'react';
import Image from 'next/image';
import styles from './FlowSection.module.css';
import Heading from '@/components/ui/Heading';
import FlowSlider, { type FlowItem } from '../../../components/ui/FlowSlider';
import ScrollFade from '@/components/ui/ScrollFade';

// イラストは CSS で scaleX(-1) 反転しているため、アニメーションで打ち消さないよう合成する
const flipStyle = { '--sf-extra': 'scaleX(-1)' } as CSSProperties;

const flowItems: FlowItem[] = [
  {
    number: '01',
    title: 'かぶせ',
    description:
      '八十八夜前後、新芽が芽吹く頃にお茶の木に黒い幕をかけ10日ほど待ちます。一手間をかけて日光を遮ることで、新芽を柔らかく保ち、緑濃く、旨み成分豊富なお茶になります。このような栽培方法を被覆栽培といい、玉露やかぶせ茶など、旨みの強いお茶を作るために用いられます。',
    src: '/flow/flow-01.webp',
    alt: 'かぶせ栽培の様子',
  },
  {
    number: '02',
    title: '刈り取り',
    description:
      '無農薬栽培のため、茶畑の除草作業を行った後、茶葉の刈り取りを行います。新芽が最も柔らかく、栄養をたっぷりと蓄えたタイミングを見極め、一枚一枚の葉の状態を確かめながら丁寧に収穫します。',
    src: '/flow/flow-02.webp',
    alt: '茶葉の刈り取りの様子',
  },
  {
    number: '03',
    title: '茶工場へ',
    description:
      '摘み取った茶葉は、発酵しないよう、すぐに茶工場へ。蒸し→揉み→乾燥とすべての加工工程に目を通し、より良いお茶となるよう調整を行いながらお茶を仕上げていきます。年々の気候変動や茶葉の生育状況に合わせて、加工に工夫を凝らし、茶葉の持つ力を存分に引き出すのが茶師の技術です。',
    src: '/flow/flow-03.webp',
    alt: '茶工場での加工の様子',
  },
  {
    number: '04',
    title: '乾燥',
    description:
      '煎茶の製造において乾燥は、茶葉の品質を安定させ香りを引き出す大切な工程です。揉みながら形を整えた茶葉を温風でゆっくりと乾かし、含まれる水分をおよそ5％ほどまで減らします。乾燥によって保存性が高まり、茶葉特有の爽やかな香りが際立ちます。',
    src: '/flow/flow-04.webp',
    alt: '茶葉の乾燥の様子',
  },
];

export default function FlowSection() {
  return (
    <section className={styles.flow}>
      <div className={styles.head}>
        <Heading mainText="煎茶ができるまで" />
        <p className={styles.lead}>
          農薬不使用有機栽培による、人体にも環境にも優しいお茶づくりをしています。
          <br />
          茶畑を営むことで山の緑や豊かな水源を守ることにも繋がると考えています。
        </p>
      </div>

      <FlowSlider items={flowItems} />

      <ScrollFade variant="pop" className={styles.illustWrap} style={flipStyle} aria-hidden>
        <Image
          className={styles.illust}
          src="/flow/flow-illust.webp"
          alt=""
          width={229}
          height={172}
        />
      </ScrollFade>
    </section>
  );
}
