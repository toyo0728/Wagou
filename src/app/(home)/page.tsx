import styles from './page.module.css';
import FirstView from './_components/FirstView';
import FixedHeader from '@/components/layout/FixedHeader';
import ConceptSection from './_components/ConceptSection';
import ServiceSection from './_components/ServiceSection';
import FlowSection from './_components/FlowSection';
import MenuSection from './_components/MenuSection';
import NewsSection from './_components/NewsSection';
import MediaSection from './_components/MediaSection';
import AccessSection from './_components/AccessSection';

// ホーム固有のセクションは (home)/_components/ に置く
// 例) _components/FirstView.tsx, _components/NewsSection.tsx

export default function Home() {
  return (
    <>
      <FirstView />
      <FixedHeader />
      <ConceptSection />
      <ServiceSection />
      <MenuSection />
      <FlowSection />
      <div className={styles.watermarkGroup}>
        <NewsSection />
        <MediaSection />
      </div>
      <AccessSection />
    </>
  );
}
