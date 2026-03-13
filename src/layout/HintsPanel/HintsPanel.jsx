import styles from './HintsPanel.module.css';

export default function HintsPanel({ title, screenTitle, sectionTitle, items = [] }) {
  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.kicker}>{sectionTitle}</span>
        <h2 className={styles.title}>{screenTitle}</h2>
      </div>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
