import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import { parentTabs } from '../../../data/screenContent';
import { getChildById } from '../../../data/mockChildren';
import styles from './ChildAnalytics.module.css';

const PERIODS = [
  { id: 'today', label: 'Сегодня' },
  { id: 'week', label: 'Неделя' },
  { id: 'month', label: 'Месяц' },
];

const MOCK_DATA = {
  today: {
    total: '2 ч 10 мин',
    apps: [
      { name: 'YouTube', time: '1 ч 35 мин', minutes: 95, color: '#e53935' },
      { name: 'Duolingo', time: '28 мин', minutes: 28, color: '#43a047' },
      { name: 'Safari', time: '18 мин', minutes: 18, color: '#1e88e5' },
    ],
  },
  week: {
    total: '12 ч 45 мин',
    apps: [
      { name: 'YouTube', time: '5 ч 20 мин', minutes: 320, color: '#e53935' },
      { name: 'TikTok', time: '2 ч', minutes: 120, color: '#ff0050' },
      { name: 'Duolingo', time: '1 ч 45 мин', minutes: 105, color: '#43a047' },
      { name: 'Safari', time: '1 ч 10 мин', minutes: 70, color: '#1e88e5' },
    ],
  },
  month: {
    total: '48 ч 30 мин',
    apps: [
      { name: 'YouTube', time: '18 ч', minutes: 1080, color: '#e53935' },
      { name: 'TikTok', time: '12 ч', minutes: 720, color: '#ff0050' },
      { name: 'Duolingo', time: '8 ч', minutes: 480, color: '#43a047' },
      { name: 'Safari', time: '5 ч 30 мин', minutes: 330, color: '#1e88e5' },
    ],
  },
};

export default function ChildAnalytics() {
  const { childId } = useParams();
  const child = getChildById(childId);
  const [period, setPeriod] = useState('today');

  const data = MOCK_DATA[period];

  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={styles.screen}>
        <nav className={styles.navBar}>
          <Link to={`/parent/child-profile/${childId}`} className={styles.backBtn}>
            ← Назад
          </Link>
          <h1 className={styles.navTitle}>Аналитика</h1>
          <span className={styles.navSpacer} aria-hidden="true" />
        </nav>

        <header className={styles.header}>
          <div className={styles.avatar}>{child.name[0]}</div>
          <h2 className={styles.childName}>{child.name}</h2>
        </header>

        <section className={styles.block}>
          <h3 className={styles.blockTitle}>Экранное время</h3>
          <div className={styles.periodTabs}>
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`${styles.periodTab} ${period === p.id ? styles.periodTabActive : ''}`}
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className={styles.totalBlock}>
            <span className={styles.totalLabel}>Всего</span>
            <span className={styles.totalValue}>{data.total}</span>
          </div>
          <div className={styles.timelineBar}>
            {data.apps.map((app) => {
              const totalMins = data.apps.reduce((s, a) => s + a.minutes, 0);
              const pct = totalMins > 0 ? (app.minutes / totalMins) * 100 : 0;
              return (
                <div
                  key={app.name}
                  className={styles.timelineSegment}
                  style={{ width: `${pct}%`, backgroundColor: app.color }}
                />
              );
            })}
          </div>
          <div className={styles.appsList}>
            <h4 className={styles.appsLabel}>По приложениям</h4>
            <div className={styles.appsTable}>
              {data.apps.map((app, i) => (
                <div
                  key={app.name}
                  className={`${styles.appRow} ${i < data.apps.length - 1 ? styles.appRowBordered : ''}`}
                >
                  <div className={styles.appIcon} />
                  <span className={styles.appName}>{app.name}</span>
                  <span className={styles.appTimeWrap}>
                    <span className={styles.appTime}>{app.time}</span>
                    <span className={styles.appDot} style={{ backgroundColor: app.color }} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PhoneFrame>
  );
}
