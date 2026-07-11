import OneColumn from '@/components/layout/OneColumn';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';
import styles from './not-found.module.css';
import ButtonLink from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ページが見つかりませんでした',
  description: 'ページが見つかりませんでした。',
  openGraph: {
    ...defaultOpenGraph,
    title: 'ページが見つかりませんでした | ' + siteName,
    description: 'ページが見つかりませんでした。',
    url: '/404/',
  },
};

export default function NotFound() {
  return (
    <>
      <OneColumn>
        <div className={styles.notFound}>
          <Heading mainText="404" />
          <h3 className={styles.title}>ページが見つかりませんでした</h3>
          <p className={styles.text}>
            お探しのページは移動もしくは
            <br />
            削除された可能性があります。
          </p>
          <p className={styles.text}>トップページから再度お探しください。</p>
          <div className={styles.button}>
            <ButtonLink href="/" text="トップページへ" />
          </div>
        <Image src="/bottom-illust.webp" alt="たぬき" className={styles.image} width={320} height={160} />
        </div>
      </OneColumn>
    </>
  );
}
