import { Link, useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

export default function BottomNav({ items = [] }) {
  const location = useLocation();
  const hasCenter = items.some((i) => i.variant === 'center');

  return (
    <nav
      className={`${styles.nav} ${hasCenter ? styles.navWithCenter : ''}`}
      style={hasCenter ? undefined : { '--tab-count': items.length }}
    >
      {items.map((item, index) => {
        const isActive =
          (item.activePaths || [item.to]).includes(location.pathname) ||
          (item.activePaths || []).some((p) => p.endsWith('*') && location.pathname.startsWith(p.slice(0, -1)));
        const isCenter = item.variant === 'center';

        if (isCenter) {
          return (
            <div key={item.label} className={`${styles.item} ${styles.centerItem}`}>
              <Link to={item.to} className={styles.centerButton} aria-label={item.label}>
                {item.icon}
              </Link>
            </div>
          );
        }

        return (
          <Link
            key={item.label}
            to={item.to}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon} aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
