import { useParams, Link } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import { parentTabs } from '../../../data/screenContent';
import styles from './ChildProfileDetail.module.css';

export default function ChildProfileEdit() {
  const { childId } = useParams();

  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={styles.screen}>
        <nav className={styles.navBar}>
          <Link to={`/parent/child-profile/${childId}`} className={styles.backBtn}>
            ← Назад
          </Link>
          <h1 className={styles.navTitle}>Редактировать профиль</h1>
        </nav>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Экран редактирования профиля (заглушка)
        </p>
      </div>
    </PhoneFrame>
  );
}
