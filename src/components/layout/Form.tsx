'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Form.module.css';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Submit from '@/components/ui/Submit';

const SSG_FORM_URL = process.env.NEXT_PUBLIC_SSG_FORM;

const seatOptions = ['カウンター席', 'テーブル席', '座敷席', 'おまかせ'];

// メール: something@something.something(@ の前後が空でない・ドメインにドットが必須)
// type="email" だけだと "test@example" を通してしまうため pattern で補強する
const EMAIL_PATTERN = '[^@\\s]+@[^@\\s]+\\.[^@\\s]+';

// 電話: ハイフンなし10〜11桁、またはハイフン区切り(最終ブロックは4桁)
const TEL_PATTERN = '0\\d{9,10}|0\\d{1,4}-\\d{1,4}-\\d{4}';

// ローカルタイムの今日(YYYY-MM-DD)。日付入力の min に使い過去日を選べなくする
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function Form() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = getToday();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!SSG_FORM_URL || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // SSGform は別オリジンのため CORS レスポンスを読めない。
      // no-cors で送信だけ確実に行い、完了ページへ遷移させる。
      await fetch(SSG_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(event.currentTarget),
      });
      router.push('/contact/thanks/');
    } catch {
      setIsSubmitting(false);
      alert('送信に失敗しました。時間をおいて再度お試しください。');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.form__body}>
        <div className={styles.form__field}>
          <Label text="お名前" isRequired={true} id="your-name" />
          <Input
            type="text"
            id="your-name"
            placeholder="山田 太郎"
            name="お名前"
            required
          />
          <p className={styles.form__error}>必須の入力項目です。</p>
        </div>
        <div className={styles.form__field}>
          <Label text="メールアドレス" isRequired={true} id="your-email" />
          {/* メール形式の検証は type="email" の標準バリデーションに任せる
              (HTML の pattern 属性に /.../ のデリミタを書くと一切マッチしなくなるので注意) */}
          <Input
            type="email"
            id="your-email"
            placeholder="example@example.com"
            name="メールアドレス"
            pattern={EMAIL_PATTERN}
            required
          />
          <p className={styles.form__error}>メールアドレスの形式と異なります。</p>
        </div>
        <div className={styles.form__field}>
          <Label text="電話番号" isRequired={true} id="your-tel" />
          <Input
            type="tel"
            id="your-tel"
            placeholder="000-0000-0000"
            name="電話番号"
            pattern={TEL_PATTERN}
            required
          />
          <p className={styles.form__error}>電話番号の形式と異なります。</p>
        </div>
        <div className={styles.form__field}>
          <Label
            text="予約第一希望日"
            isRequired={true}
            id="your-date-first"
            note="例) 2026年10月1日"
          />
          <Input
            type="date"
            id="your-date-first"
            placeholder="年/月/日"
            name="予約第一希望日"
            min={today}
            required
          />
          <p className={styles.form__error}>必須の入力項目です。</p>
        </div>
        <div className={styles.form__field}>
          <Label
            text="予約第二希望日"
            isRequired={false}
            id="your-date-second"
            note="例) 2026年10月1日"
          />
          <Input
            type="date"
            id="your-date-second"
            placeholder="年/月/日"
            name="予約第二希望日"
            min={today}
          />
        </div>
        <div className={styles.form__field}>
          <Label text="お席の希望" isRequired={true} id="your-seat" />
          <div className={styles.form__selectWrap}>
            <select
              className={styles.form__select}
              id="your-seat"
              name="お席の希望"
              defaultValue=""
              required
            >
              <option value="" disabled>
                選択してください
              </option>
              {seatOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <svg
              className={styles.form__selectArrow}
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="6"
              viewBox="0 0 13 6"
              fill="none"
              aria-hidden="true"
            >
              <path d="M1 1L6.5 5L12 1" stroke="var(--main)" strokeWidth="1.5" />
            </svg>
          </div>
          <p className={styles.form__error}>必須の入力項目です。</p>
        </div>
        <div className={styles.form__field}>
          <Label text="備考欄" isRequired={false} id="your-remarks" />
          <Textarea id="your-remarks" name="備考欄" required={false} />
        </div>
      </div>
      <div className={styles.form__footer}>
        <Submit text={isSubmitting ? '送信中…' : '送信する'} disabled={isSubmitting} />
        <p className={styles.form__submitError}>入力内容に誤りがあります。</p>
      </div>
    </form>
  );
}
