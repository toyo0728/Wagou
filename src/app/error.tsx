'use client';

// error.tsx は Client Component 必須のため metadata は export できない
import PageFirstView from '@/components/layout/PageFirstView';
import OneColumn from '@/components/layout/OneColumn';
import ButtonOutline from '@/components/ui/ButtonOutline';
import styles from './error.module.css';

export default function Error() {
  return (
    <>
      <PageFirstView mainText="システムエラー" />
      <OneColumn>
        <div className={styles.error}>
          <p className={styles.lead}>Error</p>
          <p className={styles.text}>
            申し訳ございませんが、システムエラーが発生しました。
            <br />
            しばらく時間をおいてから再度お試しください。
          </p>
          <div className={styles.button}>
            <ButtonOutline href="/" text="ホームへ戻る" />
          </div>
        </div>
      </OneColumn>
    </>
  );
}
