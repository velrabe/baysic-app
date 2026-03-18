import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardHomeHero.module.css';

const base = import.meta.env.BASE_URL || '/';

const SCROLL_THRESHOLD = 4;
const COLLAPSED_HEIGHT = 72;

const PEN_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
    <path fill="currentColor" d="m362.7 19.3l-48.4 48.4l130 130l48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2z"/>
  </svg>
);

const LOCK_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3"/>
  </svg>
);

const ADD_TIME_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="currentColor" d="M10.75 8c-.41 0-.75.34-.75.75v4.69c0 .35.18.67.47.85l3.64 2.24a.713.713 0 1 0 .74-1.22L11.5 13.3V8.75c0-.41-.34-.75-.75-.75"/>
    <path fill="currentColor" d="M17.92 12A6.957 6.957 0 0 1 11 20c-3.9 0-7-3.1-7-7s3.1-7 7-7c.7 0 1.37.1 2 .29V4.23c-.64-.15-1.31-.23-2-.23c-5 0-9 4-9 9s4 9 9 9a8.963 8.963 0 0 0 8.94-10z"/>
    <path fill="currentColor" d="M22 5h-2V3c0-.55-.45-1-1-1s-1 .45-1 1v2h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1"/>
  </svg>
);

export default function DashboardHomeHero({ child, tasksDone, tasksTotal, onBlockClick, onAddTimeClick, onUnblockClick, editProfileTo }) {
  const [collapsed, setCollapsed] = useState(false);
  const heroRef = useRef(null);
  const progressSectionRef = useRef(null);
  const hasTime = (child.screenTimeLeftMinutes ?? 0) > 0;

  useEffect(() => {
    const scrollEl = heroRef.current?.parentElement?.parentElement;
    if (!scrollEl) return;

    const handleScroll = () => {
      setCollapsed(scrollEl.scrollTop >= SCROLL_THRESHOLD);
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  const total = child.screenTimeTotalMinutes || 180;
  const left = child.screenTimeLeftMinutes ?? 85;
  const used = total - left;
  const usedPct = total > 0 ? Math.round((used / total) * 100) : 0;

  return (
    <>
    <div
      ref={heroRef}
      className={`${styles.hero} ${collapsed ? styles.heroCollapsed : ''}`}
      style={collapsed ? { height: COLLAPSED_HEIGHT } : undefined}
    >
      <div className={styles.heroInner} style={{ gap: 8 }}>
        <div ref={progressSectionRef} className={styles.childCard}>
          <div className={styles.childCardRow}>
            <div className={styles.avatar}>
              {child.avatarUrl ? (
                <img src={`${base}${child.avatarUrl}`} alt="" className={styles.avatarImg} />
              ) : (
                child.name[0]
              )}
            </div>
            <div className={styles.childCardInfo}>
              <div className={styles.childCardMeta}>
                <span className={styles.childName}>{child.name}</span>
                <span className={styles.screenTimeValue}>{used} / {total} мин</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${Math.min(usedPct, 100)}%` }}
                />
              </div>
            </div>
            <div className={styles.heroMenuWrap}>
              {editProfileTo && (
                <Link to={editProfileTo} className={styles.heroEditBtn} aria-label="Редактировать">
                  {PEN_ICON}
                </Link>
              )}
            </div>
          </div>
        </div>

        {!collapsed && (
          <div className={styles.actionButtons}>
            {hasTime ? (
              <>
                <button type="button" className={styles.actionBtn} onClick={onBlockClick} aria-label="Заблокировать">
                  {LOCK_ICON}
                  Заблокировать
                </button>
                <button type="button" className={styles.actionBtn} onClick={onAddTimeClick} aria-label="Добавить время">
                  {ADD_TIME_ICON}
                  Добавить время
                </button>
              </>
            ) : (
              <button type="button" className={styles.actionBtn} onClick={onUnblockClick} aria-label="Разблокировать">
                {ADD_TIME_ICON}
                Разблокировать
              </button>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
