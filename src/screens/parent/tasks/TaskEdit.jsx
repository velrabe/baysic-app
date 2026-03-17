import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import Section from '../../../ui/Section/Section';
import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import { parentTabs } from '../../../data/screenContent';
import styles from './TaskForm.module.css';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function TaskEdit() {
  const [form, setForm] = useState({
    name: 'Сделать уроки',
    description: 'Математика и чтение',
    cost: '120',
    currency: 'points',
  });
  const [repeat, setRepeat] = useState(true);

  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={styles.screen}>
        <Link to="/parent/tasks-single-child" className={styles.backLink}>
          ← Назад к заданиям
        </Link>
        <Section title="Редактирование задачи" subtitle="Измените данные задачи.">
          <div className={styles.formGrid}>
            <Input
              label="Название"
              placeholder="Сделать уроки"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            />
            <Input
              label="Описание"
              placeholder="Описание"
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            />
            <div className={styles.costRow}>
              <Input
                label="Стоимость"
                placeholder="120"
                type="number"
                value={form.cost}
                onChange={(e) => setForm((s) => ({ ...s, cost: e.target.value }))}
              />
              <label className={styles.selectLabel}>
                <span className={styles.label}>Валюта</span>
                <select
                  className={styles.select}
                  value={form.currency}
                  onChange={(e) => setForm((s) => ({ ...s, currency: e.target.value }))}
                >
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
                    <input type="checkbox" defaultChecked={['Пн', 'Вт', 'Ср', 'Чт', 'Пт'].includes(d)} />
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
        <Button to="/parent/tasks-single-child">Сохранить изменения</Button>
      </div>
    </PhoneFrame>
  );
}
