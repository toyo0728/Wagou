import Image from 'next/image';
import styles from './MenuSection.module.css';
import Heading from '@/components/ui/Heading';
import MenuList from '@/components/ui/MenuList';
import ScrollFade from '@/components/ui/ScrollFade';
import { type MenuItem } from '@/components/ui/MenuModal';

const dummyDescription =
  '香り高く、まろやかな味わいが特徴のお茶です。\n急須でゆっくりと淹れることで、\n茶葉本来の旨みと余韻をお楽しみいただけます。';

const menuItems: MenuItem[] = [
  {
    id: '1',
    src: '/menu/saemidori.webp',
    title: 'さえみどり',
    description:
      '天然玉露ともいわれるほど、旨みのある煎茶です。\n一煎一煎と淹れるびに、鮮やかになっていき、\nお茶の色味とともに味わい深くなっていきます。',
  },
  {
    id: '2',
    src: '/menu/ooiwase.webp',
    title: 'おおいわせ',
    description: dummyDescription,
  },
  {
    id: '3',
    src: '/menu/syunmei.webp',
    title: 'しゅんめい',
    description: dummyDescription,
  },
  {
    id: '4',
    src: '/menu/yabukita.webp',
    title: '玉露やぶきた',
    description: dummyDescription,
  },
  {
    id: '5',
    src: '/menu/makomo.webp',
    title: 'まこも茶',
    description: dummyDescription,
  },
  {
    id: '6',
    src: '/menu/wakocha.webp',
    title: '和紅茶',
    description: dummyDescription,
  },
  {
    id: '7',
    src: '/menu/dorayaki.webp',
    title: '米粉のどら焼き',
    description: dummyDescription,
  },
  {
    id: '8',
    src: '/menu/aburimochi.webp',
    title: '和合のあぶり餅',
    description: dummyDescription,
  },
  {
    id: '9',
    src: '/menu/isobe.webp',
    title: '磯部餅',
    description: dummyDescription,
  },
];

export default function MenuSection() {
  return (
    <section id="menu" className={styles.menu}>
      <div className={styles.head}>
        <Heading mainText="おしながき" />
        <p className={styles.lead}>急須で三煎目までお楽しみいただけます。</p>
      </div>
      <MenuList items={menuItems} />
      <ScrollFade variant="pop" className={styles.illustWrap}>
        <Image
          className={styles.illust}
          src="/menu-illust.webp"
          alt=""
          width={90}
          height={108}
          aria-hidden
        />
      </ScrollFade>
    </section>
  );
}
