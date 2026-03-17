import { Link } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import { parentTabs } from '../../../data/screenContent';
import styles from './Schedule.module.css';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MOCK_SCHEDULE = {
  Пн: ['Сделать уроки', 'Убрать комнату'],
  Вт: ['Сделать уроки', 'Прочитать 10 страниц'],
  Ср: ['Сделать уроки', 'Убрать комнату', 'Помыть посуду'],
  Чт: ['Сделать уроки'],
  Пт: ['Сделать уроки', 'Убрать комнату'],
  Сб: ['Прочитать 10 страниц'],
  Вс: [],
};

export default function Schedule() {
  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={styles.screen}>
        <Link to="/parent/tasks-single-child" className={styles.backLink}>
          ← Назад к заданиям
        </Link>
        <header className={styles.header}>
          <h1 className={styles.title}>Расписание</h1>
          <Link to="/parent/tasks-create" className={styles.addBtn}>
            + Добавить задачу
          </Link>
        </header>
        <div className={styles.dateFilter}>
          <input type="date" className={styles.dateInput} defaultValue="2025-03-13" />
        </div>
        <div className={styles.columns}>
          {DAYS.map((day) => (
            <div key={day} className={styles.column}>
              <div className={styles.dayLabel}>{day}</div>
              <div className={styles.tasksList}>
                {(MOCK_SCHEDULE[day] || []).map((task) => (
                  <div key={task} className={styles.taskCard}>
                    {task}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
