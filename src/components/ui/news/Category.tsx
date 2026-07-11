import styles from './Category.module.css';

type CategoryProps = {
  name: string;
};

export default function Category({ name }: CategoryProps) {
  return <span className={styles.category}>{name}</span>;
}
