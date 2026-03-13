import { NavLink } from 'react-router-dom';
import styles from './ChildSwitcher.module.css';

export default function ChildSwitcher({ items = [] }) {
  return (
    <div className={styles.switcher}>
      {items.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
