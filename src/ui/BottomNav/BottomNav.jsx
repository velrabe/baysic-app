import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

export default function BottomNav({ items = [] }) {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className={`${styles.item} ${
            (item.activePaths || [item.to]).includes(location.pathname) ? styles.active : ''
          }`}
        >
          <span className={styles.icon} aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
