export type NavItem = {
  label: string;
  href: string;
};

// ヘッダー(FirstView / スライドインメニュー)共通のナビゲーション
export const navItems: NavItem[] = [
  { label: '和合について', href: '/concept' },
  { label: 'おしながき', href: '/#menu' },
  { label: '茶・メディテーション', href: '/#service' },
  { label: '日々のこと', href: '/news/' },
  { label: 'メディア情報', href: '/#media' },
  { label: 'アクセス', href: '/#access' },
];
