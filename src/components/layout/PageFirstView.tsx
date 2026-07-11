import styles from './PageFirstView.module.css';
import Heading, { HeadingProps } from '@/components/ui/Heading';

export default function PageFirstView({ mainText }: HeadingProps) {
  return (
    <div className={styles.fv}>
      <Heading mainText={mainText} />
    </div>
  );
}
