import styles from './OneColumn.module.css';

export default function OneColumn({ children }) {
  return (
    <div className={styles.oneColumn}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}
