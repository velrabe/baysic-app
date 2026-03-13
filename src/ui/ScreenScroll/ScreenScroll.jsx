import styles from './ScreenScroll.module.css';

export default function ScreenScroll({ children, className = '' }) {
  const classes = className ? `${styles.scroll} ${className}` : styles.scroll;

  return <div className={classes}>{children}</div>;
}
