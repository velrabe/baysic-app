import styles from './HomeIndicator.module.css';

export default function HomeIndicator() {
  return (
    <footer className={styles.footer}>
      <span className={styles.indicator} aria-hidden="true" />
    </footer>
  );
}
