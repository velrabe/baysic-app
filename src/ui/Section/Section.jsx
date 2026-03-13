import styles from './Section.module.css';

export default function Section({ title, subtitle, action, children }) {
  return (
    <section className={styles.section}>
      {(title || subtitle || action) && (
        <header className={styles.header}>
          <div>
            {title ? <h2 className={styles.title}>{title}</h2> : null}
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
