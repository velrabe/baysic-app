import styles from './Card.module.css';

export default function Card({
  children,
  muted = false,
  accent = false,
  noPadding = false,
  className = '',
}) {
  const classes = [
    styles.card,
    muted ? styles.muted : '',
    accent ? styles.accent : '',
    noPadding ? styles.noPadding : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <section className={classes}>{children}</section>;
}
