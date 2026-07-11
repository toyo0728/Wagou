'use client';

import { useState } from 'react';
import styles from './MenuList.module.css';
import MenuCard from '@/components/ui/MenuCard';
import MenuModal, { type MenuItem } from '@/components/ui/MenuModal';
import ScrollFade from '@/components/ui/ScrollFade';

type MenuListProps = {
  items: MenuItem[];
};

export default function MenuList({ items }: MenuListProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <ScrollFade key={item.id} delay={(i % 3) * 100}>
            <MenuCard
              src={item.src}
              title={item.title}
              onClick={() => setSelectedItem(item)}
            />
          </ScrollFade>
        ))}
      </div>
      {selectedItem && (
        <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}
