import type { Metadata } from 'next';
import Image from 'next/image';
import Heading from '@/components/ui/Heading';
import Heading2 from '@/components/ui/page/Heading2';
import Heading3 from '@/components/ui/page/Heading3';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { defaultOpenGraph, siteName } from '@/lib/metadata';
import styles from './page.module.css';
import OneColumn from '@/components/layout/OneColumn';

export const metadata: Metadata = {
  title: '和合について',
  description: '茶舗和合の想いや取り組みについてご紹介します。',
  openGraph: {
    ...defaultOpenGraph,
    title: `和合について | ${siteName}`,
    url: '/concept/',
  },
};

const dummyText =
  'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ';

export default function ConceptPage() {
  return (
    <>
      <OneColumn>
        <div className={styles.container}>
          <Heading mainText="和合について" />
          <div className={styles.contents}>
            <p className={styles.text}>{dummyText}</p>
            <Heading2 text="見出し2" />
            <p className={styles.text}>{dummyText}</p>
            <div className={styles.figure}>
              <Image
                src="/concept/concept-main.webp"
                alt="お茶を淹れる様子"
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
            <Heading3 text="見出し3" />
            <p className={styles.text}>{dummyText}</p>
          </div>
        </div>
      </OneColumn>
      <div className={styles.breadcrumb}>
        <Breadcrumb
          items={[
            { href: '/', text: 'トップページ' },
            { href: '/concept/', text: '和合について' },
          ]}
        />
      </div>
    </>
  );
}
