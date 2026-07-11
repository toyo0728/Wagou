import OneColumn from '@/components/layout/OneColumn';
import Form from '@/components/layout/Form';
import styles from './page.module.css';
import Breadcrumb from '@/components/layout/Breadcrumb';
import type { Metadata } from 'next';
import { defaultOpenGraph, siteName } from '@/lib/metadata';
import Heading from '@/components/ui/Heading';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'ご予約フォーム',
  description: 'ご予約フォームのページです。',
  openGraph: {
    ...defaultOpenGraph,
    title: 'ご予約フォーム | ' + siteName,
    description: 'ご予約フォームのページです。',
    url: '/contact/',
  },
};

export default function Contact() {
  const breadcrumbItems = [
    { href: '/', text: 'トップページ' },
    { href: '/contact/', text: 'ご予約フォーム' },
  ];

  return (
    <>
      <OneColumn>
        <div className={styles.content}>
          <Image
            className={styles.watermark}
            src="/logo-green.svg"
            alt=""
            width={614}
            height={614}
            aria-hidden="true"
          />
          <Heading mainText="ご予約フォーム" />
          <Form />
        </div>
      </OneColumn>
      <Breadcrumb items={breadcrumbItems} />
    </>
  );
}
