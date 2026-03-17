import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import Section from '../../../ui/Section/Section';
import TaskCard from '../../../ui/TaskCard/TaskCard';
import ChildFilterSwitcher from '../../../ui/ChildFilterSwitcher/ChildFilterSwitcher';
import { parentTabs } from '../../../data/screenContent';
import { mockTasks } from '../../../data/mockTasks';
import { mockChildren } from '../../../data/mockChildren';
import styles from './TasksShared.module.css';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MOCK_SCHEDULE = {
  Пн: 2,
  Вт: 2,
  Ср: 3,
  Чт: 1,
  Пт: 2,
  Сб: 1,
  Вс: 0,
};

const filterItems = mockChildren.map((c) => ({ id: c.id, label: c.name }));

function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const aDone = a.status === 'done';
    const bDone = b.status === 'done';
    if (aDone && !bDone) return 1;
    if (!aDone && bDone) return -1;
    if (aDone && bDone) return 0;
    const aAdult = a.isAdultTask;
    const bAdult = b.isAdultTask;
    if (aAdult && !bAdult) return -1;
    if (!aAdult && bAdult) return 1;
    return 0;
  });
}

const CALENDAR_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function TaskListSingleChild() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedChildId, setSelectedChildId] = useState(mockChildren[0].id);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const child = mockChildren.find((c) => c.id === selectedChildId) ?? mockChildren[0];
  const tasks = sortTasks(mockTasks.filter((t) => t.assigneeId === selectedChildId));

  const calendarWrapRef = useRef(null);

  useEffect(() => {
    if (searchParams.get('openCalendar') === '1') {
      setCalendarOpen(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!calendarOpen) return;
    const handleClickOutside = (e) => {
      if (calendarWrapRef.current && !calendarWrapRef.current.contains(e.target)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [calendarOpen]);

  return (
    <PhoneFrame bottomNav={parentTabs} fab={<Link to="/parent/tasks-create" className={styles.fab} aria-label="Создать задачу">+</Link>}>
      <div className={styles.screen}>
        <Section
          title="Задания"
          action={
            <div ref={calendarWrapRef} className={styles.calendarDropdownWrap}>
              <button
                type="button"
                className={styles.calendarIconBtn}
                onClick={() => setCalendarOpen((v) => !v)}
                aria-label="Календарь"
                aria-expanded={calendarOpen}
              >
                {CALENDAR_ICON}
              </button>
              {calendarOpen && (
                <div className={styles.calendarDropdown}>
                  <input
                    type="date"
                    className={styles.calendarDateInput}
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    autoFocus
                  />
                  <Link to="/parent/schedule" className={styles.calendarDropdownLink} onClick={() => setCalendarOpen(false)}>
                    Открыть полный календарь →
                  </Link>
                </div>
              )}
            </div>
          }
        >
          <div className={styles.taskChipsWrap}>
            <ChildFilterSwitcher items={filterItems} selectedId={selectedChildId} onSelect={setSelectedChildId} />
          </div>
          <div className={styles.taskCardList}>
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <TaskCard
                  key={t.id || t.title}
                  task={t}
                  executorDisplay={!t.isAdultTask ? child.name : undefined}
                />
              ))
            ) : (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>Нет задач на сегодня.</p>
            )}
          </div>
        </Section>
        <Section title="Расписание">
          <div className={styles.calendarPreview}>
            {DAYS.map((d) => (
              <div key={d} className={styles.calendarDay}>
                {d}
              </div>
            ))}
            {DAYS.map((d, i) => (
              <div
                key={`cell-${d}`}
                className={`${styles.calendarCell} ${MOCK_SCHEDULE[d] > 0 ? styles.calendarCellHasTask : ''}`}
              >
                {MOCK_SCHEDULE[d] > 0 ? MOCK_SCHEDULE[d] : ''}
              </div>
            ))}
          </div>
          <Link to="/parent/schedule" className={styles.calendarLink}>
            Открыть календарь задач →
          </Link>
        </Section>
      </div>
    </PhoneFrame>
  );
}
