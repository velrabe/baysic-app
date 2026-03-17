import styles from './ChildFilterSwitcher.module.css';

export default function ChildFilterSwitcher({ items = [], selectedId, onSelect }) {
  return (
    <div className={styles.switcher}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.item} ${selectedId === item.id ? styles.active : ''}`}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
