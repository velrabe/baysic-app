import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockChildren, getChildById } from '../../../data/mockChildren';
import { mockTasks } from '../../../data/mockTasks';
import TaskCard from '../../../ui/TaskCard/TaskCard';
import UnblockModal from '../../../ui/UnblockModal/UnblockModal';
import BlockModal from '../../../ui/BlockModal/BlockModal';
import styles from './DashboardHome.module.css';

function getChildActions(child, blockedChildIds) {
  const isBlocked = blockedChildIds.has(child.id);
  const hasTime = (child.screenTimeLeftMinutes ?? 0) > 0;
  const base = [{ label: 'Аналитика', to: `/parent/analytics/${child.id}` }];
  if (isBlocked) {
    return [{ label: 'Разблокировать', action: 'unblock' }, ...base];
  }
  if (hasTime) {
    return [
      { label: 'Заблокировать', action: 'block' },
      { label: 'Добавить время', action: 'addTime' },
      ...base,
    ];
  }
  return [{ label: 'Разблокировать', action: 'unblock' }, ...base];
}

export default function DashboardHome() {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [mapFullscreen, setMapFullscreen] = useState(false);
  const [timeModal, setTimeModal] = useState(null); // { child, mode: 'unblock' | 'addTime' }
  const [blockModal, setBlockModal] = useState(null); // child
  const [blockedChildIds, setBlockedChildIds] = useState(new Set()); // Set of child ids
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const blocked = searchParams.get('blocked');
    if (blocked) {
      const ids = blocked.split(',').filter(Boolean);
      setBlockedChildIds(new Set(ids));
    }
  }, [searchParams]);

  const todayTasks = mockTasks.filter((t) => !t.dueDate?.includes?.('Вчера'));
  const sortedTasks = [...todayTasks].sort((a, b) => {
    const aDone = a.status === 'done';
    const bDone = b.status === 'done';
    if (aDone && !bDone) return 1;
    if (!aDone && bDone) return -1;
    if (aDone && bDone) return 0;
    const aAdult = a.isAdultTask;
    const bAdult = b.isAdultTask;
    if (aAdult && !bAdult) return -1;
    if (!aAdult && bAdult) return 1;
    if (aAdult && bAdult) {
      const aMe = a.executorName === 'Я' ? 1 : 0;
      const bMe = b.executorName === 'Я' ? 1 : 0;
      return bMe - aMe;
    }
    return 0;
  });
  const displayedTasks = sortedTasks.slice(0, 5);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>Экранное время</h1>
      </header>

      <section className={styles.block}>
        <div className={styles.screenTimeList}>
          {mockChildren.map((child, i) => {
            const used = (child.screenTimeTotalMinutes || 180) - (child.screenTimeLeftMinutes ?? 85);
            const total = child.screenTimeTotalMinutes || 180;
            const pct = total > 0 ? Math.round((used / total) * 100) : 0;
            return (
              <div key={child.id} className={`${styles.screenTimeRow} ${blockedChildIds.has(child.id) ? styles.screenTimeRowBlocked : ''}`}>
                <Link to={`/parent/child-profile/${child.id}`} state={{ from: 'dashboard-online' }} className={styles.screenTimeLink}>
                  <div className={styles.avatarWrap}>
                    <div className={styles.avatar}>{child.name[0]}</div>
                    {blockedChildIds.has(child.id) && (
                      <span className={styles.avatarLock} aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className={styles.screenTimeContent}>
                    <div className={styles.screenTimeMeta}>
                      <span className={styles.childName}>{child.name}</span>
                      <span className={styles.screenTimeValue}>
                        {child.screenTimeLeftMinutes ?? 85}/{total} мин
                      </span>
                    </div>
                    <div className={`${styles.progressTrack} ${blockedChildIds.has(child.id) ? styles.progressTrackBlocked : ''}`}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                </Link>
                <div className={styles.menuWrap}>
                  <button
                    type="button"
                    className={styles.menuBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenMenuIndex(openMenuIndex === i ? null : i);
                    }}
                    aria-label="Действия"
                  >
                    ⋮
                  </button>
                  {openMenuIndex === i && (
                    <div className={styles.dropdown}>
                      {getChildActions(child, blockedChildIds).map((a) =>
                        a.action === 'unblock' || a.action === 'addTime' ? (
                          <button
                            key={a.label}
                            type="button"
                            className={styles.dropdownItem}
                            onClick={() => {
                              setOpenMenuIndex(null);
                              setTimeModal({ child, mode: a.action });
                            }}
                          >
                            {a.label}
                          </button>
                        ) : a.action === 'block' ? (
                          <button
                            key={a.label}
                            type="button"
                            className={styles.dropdownItem}
                            onClick={() => {
                              setOpenMenuIndex(null);
                              setBlockModal(child);
                            }}
                          >
                            {a.label}
                          </button>
                        ) : (
                          <Link
                            key={a.label}
                            to={a.to}
                            className={styles.dropdownItem}
                            onClick={() => setOpenMenuIndex(null)}
                          >
                            {a.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.tasksHeader}>
          <h2 className={styles.tasksBlockTitle}>
            Задания на{' '}
            <Link to="/parent/tasks-multi?openCalendar=1" className={styles.tasksDateLink}>
              Сегодня
            </Link>
          </h2>
          <Link to="/parent/tasks-create-multi" className={styles.addTaskLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Добавить
          </Link>
        </div>
        <div className={styles.tasksFeedBody}>
          <div className={`${styles.tasksFeedWrap} ${sortedTasks.length > 5 ? styles.tasksFeedWrapOverflow : ''}`}>
            <div className={styles.tasksFeed}>
              {displayedTasks.map((t) => (
                <TaskCard
                  key={t.id || t.title}
                  task={t}
                  executorDisplay={!t.isAdultTask ? getChildById(t.assigneeId).name : undefined}
                />
              ))}
            </div>
            {sortedTasks.length > 5 && (
              <div className={styles.tasksFeedOverlay} aria-hidden="true" />
            )}
          </div>
          <Link to="/parent/tasks-multi" className={styles.tasksFeedAllLink}>
            Все задания ({sortedTasks.length})
          </Link>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Баланс</h2>
        <div className={styles.balanceList}>
          {mockChildren.map((child) => (
            <Link
              key={child.id}
              to={`/parent/child-profile/${child.id}`}
              state={{ from: 'dashboard-online' }}
              className={styles.balanceRow}
            >
              <div className={styles.avatar}>{child.name[0]}</div>
              <div className={styles.balanceContent}>
                <span className={styles.childName}>{child.name}</span>
                <span className={styles.balanceValue}>
                  {child.earnedRubles} ₽
                </span>
              </div>
              <span className={styles.spendBtn}>Списать</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.blockTitle}>Геолокация</h2>
        <div className={styles.geoWrap}>
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder} />
            <div className={styles.mapAvatarOverlay}>
              {mockChildren.map((c) => (
                <div
                  key={c.id}
                  className={styles.mapAvatar}
                  style={{
                    left: c.geoPos?.left ?? '30%',
                    top: c.geoPos?.top ?? '40%',
                  }}
                  title={c.name}
                >
                  {c.name[0]}
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.fullscreenBtn}
              onClick={() => setMapFullscreen(true)}
              aria-label="Развернуть карту"
            >
              ⛶
            </button>
          </div>
        </div>
      </section>

      {timeModal && (
        <UnblockModal
          child={timeModal.child}
          ctaLabel={timeModal.mode === 'addTime' ? 'Добавить время' : 'Разблокировать'}
          onClose={() => setTimeModal(null)}
          onConfirm={(mins) => {
            if (timeModal.mode === 'unblock') {
              setBlockedChildIds((prev) => {
                const next = new Set(prev);
                next.delete(timeModal.child.id);
                return next;
              });
            }
            setTimeModal(null);
            /* TODO: apply logic */
          }}
        />
      )}

      {blockModal && (
        <BlockModal
          child={blockModal}
          onClose={() => setBlockModal(null)}
          onConfirm={() => {
            setBlockedChildIds((prev) => new Set(prev).add(blockModal.id));
            setBlockModal(null);
          }}
        />
      )}

      {mapFullscreen && (
        <div className={styles.fullscreenOverlay} onClick={() => setMapFullscreen(false)}>
          <div className={styles.fullscreenMap} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mapPlaceholderFull} />
            <div className={styles.mapAvatarOverlayFull}>
              {mockChildren.map((c) => (
                <div
                  key={c.id}
                  className={styles.mapAvatar}
                  style={{
                    left: c.geoPos?.left ?? '30%',
                    top: c.geoPos?.top ?? '40%',
                  }}
                  title={c.name}
                >
                  {c.name[0]}
                </div>
              ))}
            </div>
            <button
              type="button"
              className={styles.closeFullscreen}
              onClick={() => setMapFullscreen(false)}
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
