import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import Section from '../../../ui/Section/Section';
import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import { parentTabs } from '../../../data/screenContent';
import styles from './TaskForm.module.css';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function TaskCreate() {
  const [repeat, setRepeat] = useState(false);
  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={styles.screen}>
        <Link to="/parent/tasks-single-child" className={styles.backLink}>
          ← Назад к заданиям
        </Link>
        <Section title="Создание задачи" subtitle="Заполните данные для новой задачи.">
          <div className={styles.formGrid}>
            <Input label="Название" placeholder="Например: Сделать уроки" />
            <Input label="Описание" placeholder="Математика и чтение" />
            <div className={styles.costRow}>
              <Input label="Стоимость" placeholder="120" type="number" inputMode="numeric" />
              <label className={styles.selectLabel}>
                <span className={styles.label}>Валюта</span>
                <select className={styles.select} defaultValue="rubles">
                  <option value="rubles">Рубли</option>
                  <option value="points">Баллы</option>
                </select>
              </label>
            </div>
            <Input label="Дата и время" type="datetime-local" />
            <label className={styles.checkboxRow}>
              <input type="checkbox" checked={repeat} onChange={(e) => setRepeat(e.target.checked)} />
              <span>Повторяемость</span>
            </label>
            {repeat && (
            <div className={styles.repeatPreview}>
              <div className={styles.calendarPreview}>
                {DAYS.map((d) => (
                  <label key={d} className={styles.calendarCheckbox}>
                    <input type="checkbox" />
                    <span>{d}</span>
                  </label>
                ))}
              </div>
            </div>
            )}
            <label className={styles.checkboxRow}>
              <input type="checkbox" defaultChecked={true} />
              <span>Прикрепить результат выполнения задания</span>
            </label>
          </div>
        </Section>
        <Button to="/parent/tasks-single-child">Создать</Button>
      </div>
    </PhoneFrame>
  );
}
