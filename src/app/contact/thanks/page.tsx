import OneColumn from '@/components/layout/OneColumn';
import styles from './page.module.css';
import Heading from '@/components/ui/Heading';
import Image from 'next/image';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'ご予約フォーム | ご予約完了',
  description: 'ご予約フォームのご予約完了ページです。',
  openGraph: {
    ...defaultOpenGraph,
    title: 'ご予約フォーム | ご予約完了 | ' + siteName,
    description: 'ご予約フォームのご予約完了ページです。',
    url: '/contact/thanks/',
  },
};

export default function Thanks() {
  const breadcrumbItems = [
    { href: '/', text: 'ホーム' },
    { href: '/contact/', text: 'お問い合わせ' },
  ];

  return (
    <>
      <OneColumn>
        <div className={styles.thanks}>
          <Heading mainText="ご予約フォーム" />
          <h3 className={styles.title}>ご予約申請完了いたしました。</h3>
          <p className={styles.text}>
            ご入力いただいたメールアドレスに自動返信にて
            <br />
            お問い合わせ内容をお送りしております。
          </p>
          <p className={styles.text}>
            3日以内にご返信させて頂きますので、
            <br />
            今しばらくお待ちくださいませ。
          </p>
          <Image
            src="/bottom-illust.webp"
            alt="たぬき"
            className={styles.image}
            width={320}
            height={160}
          />
        </div>
      </OneColumn>
    </>
  );
}
