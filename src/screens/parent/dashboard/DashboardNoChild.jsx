import { Link } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import { parentTabs } from '../../../data/screenContent';
import Button from '../../../ui/Button/Button';
import styles from './DashboardNoChild.module.css';

export default function DashboardNoChild() {
  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={styles.screen}>
        <div className={styles.emptyState}>
          <h1 className={styles.pageTitle}>Экранное время</h1>
          <p className={styles.hint}>
            Создайте профиль ребенка, чтобы начать пользоваться приложением
          </p>
          <Button to="/parent/add-child-intro">
            Добавить ребенка
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
