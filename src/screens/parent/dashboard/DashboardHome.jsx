import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom';
import { mockChildren, getChildById } from '../../../data/mockChildren';
import { mockTasks } from '../../../data/mockTasks';
import TaskCard from '../../../ui/TaskCard/TaskCard';
import ChildFilterSwitcher from '../../../ui/ChildFilterSwitcher/ChildFilterSwitcher';
import UnblockModal from '../../../ui/UnblockModal/UnblockModal';
import BlockModal from '../../../ui/BlockModal/BlockModal';
import diamondIcon from '../../../assets/diamond.png';
import styles from './DashboardHome.module.css';

const base = import.meta.env.BASE_URL || '/';
const COIN_ICON = `${base}assets/coin.png`;
const DIAMOND_ICON = diamondIcon;

const ANALYTICS_CATEGORIES = [
  { id: 'games', name: 'Игры', color: '#F76965', percent: 45 },
  { id: 'edu', name: 'Обучение', color: '#69C46D', percent: 25 },
  { id: 'video', name: 'Видео', color: '#3F98E7', percent: 20 },
  { id: 'browser', name: 'Браузер', color: '#ED75E5', percent: 10 },
];

const APP_ICONS = {
  YouTube: 'YT.png',
  Duolingo: 'duo.png',
  Safari: 'safari.png',
  Telegram: 'tg.png',
  Instagram: 'ig.png',
  TikTok: 'tt.png',
  VK: 'vk.png',
  Spotify: 'spotify.png',
};

const TOP_APPS = [
  { name: 'YouTube', time: '1 ч 35 мин', categoryId: 'video' },
  { name: 'Duolingo', time: '28 мин', categoryId: 'edu' },
  { name: 'Safari', time: '18 мин', categoryId: 'browser' },
  { name: 'Telegram', time: '52 мин', categoryId: 'games' },
  { name: 'Instagram', time: '45 мин', categoryId: 'video' },
  { name: 'TikTok', time: '1 ч 12 мин', categoryId: 'video' },
  { name: 'VK', time: '38 мин', categoryId: 'games' },
  { name: 'Spotify', time: '25 мин', categoryId: 'games' },
];

const ELLIPSIS_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="6" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="18" r="1.5" />
  </svg>
);

function getChildActions(child, blockedChildIds) {
  const isBlocked = blockedChildIds.has(child.id);
  const hasTime = (child.screenTimeLeftMinutes ?? 0) > 0;
  const base = [{ label: 'Редактировать профиль', to: `/parent/child-profile/${child.id}/edit` }];
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

function AnalyticsTopAppsScroll({ children, styles: s }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const updateOverlays = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateOverlays();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateOverlays);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateOverlays]);

  return (
    <div className={s.analyticsTopAppsScrollWrap}>
      <div ref={scrollRef} className={s.analyticsTopAppsList} onScroll={updateOverlays}>
        {children}
      </div>
      <div className={`${s.analyticsTopAppsOverlay} ${s.analyticsTopAppsOverlayLeft} ${showLeft ? s.analyticsTopAppsOverlayVisible : ''}`} aria-hidden="true" />
      <div className={`${s.analyticsTopAppsOverlay} ${s.analyticsTopAppsOverlayRight} ${showRight ? s.analyticsTopAppsOverlayVisible : ''}`} aria-hidden="true" />
    </div>
  );
}

export default function DashboardHome() {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const menuBtnRefs = useRef({});
  const menuRef = useRef(null);
  const [timeModal, setTimeModal] = useState(null);
  const [blockModal, setBlockModal] = useState(null);
  const [blockedChildIds, setBlockedChildIds] = useState(new Set());
  const [searchParams] = useSearchParams();
  const [analyticsChildId, setAnalyticsChildId] = useState(mockChildren[0]?.id);

  useEffect(() => {
    const blocked = searchParams.get('blocked');
    if (blocked) {
      setBlockedChildIds(new Set(blocked.split(',').filter(Boolean)));
    }
  }, [searchParams]);

  useEffect(() => {
    if (openMenuIndex === null) return;
    const handleClickOutside = (e) => {
      const inDropdown = menuRef.current?.contains(e.target);
      const inBtn = Object.values(menuBtnRefs.current).some((el) => el?.contains(e.target));
      if (!inDropdown && !inBtn) setOpenMenuIndex(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [openMenuIndex]);

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
  const filterItems = mockChildren.map((c) => ({ id: c.id, label: c.name }));

  return (
    <div className={styles.screen}>
      <div className={styles.heroSection}>
        <div className={styles.heroMulti}>
          {mockChildren.map((child, i) => {
            const used = (child.screenTimeTotalMinutes || 180) - (child.screenTimeLeftMinutes ?? 85);
            const total = child.screenTimeTotalMinutes || 180;
            const pct = total > 0 ? Math.round((used / total) * 100) : 0;
            return (
              <div key={child.id} className={`${styles.heroMultiCard} ${blockedChildIds.has(child.id) ? styles.heroMultiCardBlocked : ''}`}>
                <div className={styles.heroMultiCardRow}>
                  <Link to={`/parent/child-profile/${child.id}`} state={{ from: 'dashboard-online' }} className={styles.heroMultiCardLink}>
                    <div className={styles.heroMultiAvatar}>
                      {child.avatarUrl ? (
                        <img src={`${base}${child.avatarUrl}`} alt="" />
                      ) : (
                        child.name[0]
                      )}
                      {blockedChildIds.has(child.id) && (
                        <span className={styles.heroMultiAvatarLock} aria-hidden="true">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <div className={styles.heroMultiCardInfo}>
                      <div className={styles.heroMultiCardMeta}>
                        <span className={styles.heroMultiChildName}>{child.name}</span>
                        <span className={styles.heroMultiScreenTime}>{used} / {total} мин</span>
                      </div>
                      <div className={`${styles.heroMultiProgressBar} ${blockedChildIds.has(child.id) ? styles.heroMultiProgressBlocked : ''}`}>
                        <div className={styles.heroMultiProgressFill} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </div>
                  </Link>
                  <div className={styles.heroMultiMenuWrap}>
                    <button
                      ref={(el) => { menuBtnRefs.current[i] = el; }}
                      type="button"
                      className={styles.heroMultiEllipsisBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        const btn = menuBtnRefs.current[i];
                        if (openMenuIndex !== i && btn) {
                          const rect = btn.getBoundingClientRect();
                          setMenuPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right });
                        }
                        setOpenMenuIndex(openMenuIndex === i ? null : i);
                      }}
                      aria-label="Действия"
                      aria-expanded={openMenuIndex === i}
                    >
                      {ELLIPSIS_ICON}
                    </button>
                    {openMenuIndex === i && createPortal(
                    <div
                      className={styles.heroMultiDropdown}
                      ref={menuRef}
                      style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, left: 'auto' }}
                    >
                      {getChildActions(child, blockedChildIds).map((a) =>
                        a.action === 'unblock' || a.action === 'addTime' ? (
                          <button
                            key={a.label}
                            type="button"
                            className={styles.heroMultiDropdownItem}
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
                            className={styles.heroMultiDropdownItem}
                            onClick={() => {
                              setOpenMenuIndex(null);
                              setBlockModal(child);
                            }}
                          >
                            {a.label}
                          </button>
                        ) : (
                          <Link key={a.label} to={a.to} className={styles.heroMultiDropdownItem} onClick={() => setOpenMenuIndex(null)}>
                            {a.label}
                          </Link>
                        )
                      )}
                    </div>,
                    document.body
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.screenContent}>
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
                  executorAvatar={!t.isAdultTask ? getChildById(t.assigneeId) : undefined}
                />
              ))}
            </div>
            {sortedTasks.length > 5 && <div className={styles.tasksFeedOverlay} aria-hidden="true" />}
          </div>
          <Link to="/parent/tasks-multi" className={styles.tasksFeedAllLink}>
            Все задания ({sortedTasks.length}) →
          </Link>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.analyticsHeader}>
          <h3 className={styles.blockTitle}>Аналитика</h3>
          <Link to={`/parent/analytics/${analyticsChildId}`} className={styles.moreLink}>
            Подробнее →
          </Link>
        </div>
        {mockChildren.length > 1 && (
          <div className={styles.analyticsSwitcher}>
            <ChildFilterSwitcher items={filterItems} selectedId={analyticsChildId} onSelect={setAnalyticsChildId} />
          </div>
        )}
        <div className={styles.analytics}>
          <div className={styles.analyticsCategoriesCard}>
            <div className={styles.analyticsProgressBar}>
              {ANALYTICS_CATEGORIES.map((cat) => (
                <div key={cat.id} className={styles.analyticsProgressSegment} style={{ width: `${cat.percent}%`, backgroundColor: cat.color }} />
              ))}
            </div>
            <div className={styles.analyticsLegend}>
              {ANALYTICS_CATEGORIES.map((cat) => (
                <span key={cat.id} className={styles.analyticsLegendItem}>
                  <span className={styles.analyticsLegendSquare} style={{ backgroundColor: cat.color }} />
                  {cat.name} · {cat.percent}%
                </span>
              ))}
            </div>
          </div>
          <div className={styles.analyticsTopAppsCard}>
            <h4 className={styles.analyticsSectionTitle}>Топ приложений</h4>
            <AnalyticsTopAppsScroll styles={styles}>
              {TOP_APPS.map((app) => {
                const cat = ANALYTICS_CATEGORIES.find((c) => c.id === app.categoryId);
                const iconFile = APP_ICONS[app.name];
                return (
                  <div key={app.name} className={styles.analyticsTopAppItem}>
                    <div className={styles.analyticsTopAppPill}>
                      {iconFile ? (
                        <img src={`${base}assets/apps/${iconFile}`} alt="" className={styles.analyticsTopAppIcon} />
                      ) : (
                        <span className={styles.analyticsTopAppIcon} style={{ backgroundColor: cat?.color ?? '#999' }} />
                      )}
                      <div className={styles.analyticsTopAppContent}>
                        <span className={styles.analyticsTopAppName}>{app.name}</span>
                        <span className={styles.analyticsTopAppMeta}>{cat?.name} · {app.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </AnalyticsTopAppsScroll>
          </div>
          <Link to="/parent/content-filter" className={styles.contentConfigBtn}>
            Настроить контент →
          </Link>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.balanceWrap}>
        <div className={styles.balanceCompact}>
          {mockChildren.map((child) => (
            <div key={child.id} className={styles.balanceCompactRow}>
              <Link to={`/parent/child-profile/${child.id}`} state={{ from: 'dashboard-online' }} className={styles.balanceCompactLink}>
                <div className={styles.balanceCompactAvatar}>
                  {child.avatarUrl ? (
                    <img src={`${base}${child.avatarUrl}`} alt="" />
                  ) : (
                    child.name[0]
                  )}
                </div>
                <div className={styles.balanceCompactContent}>
                  <span className={styles.balanceCompactName}>{child.name}</span>
                  <div className={styles.balanceCompactValues}>
                    <span className={styles.balanceCompactItem}>
                      <img src={COIN_ICON} alt="" className={styles.balanceCompactIcon} />
                      {child.earnedPoints ?? 0}
                    </span>
                    <span className={styles.balanceCompactItem}>
                      <img src={DIAMOND_ICON} alt="" className={styles.balanceCompactIcon} />
                      {child.earnedDiamonds ?? 0}
                    </span>
                  </div>
                </div>
              </Link>
              <Link to={`/parent/child-profile/${child.id}`} className={styles.balanceRowManageBtn}>
                Управление →
              </Link>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.geoPreview}>
          <div className={styles.geoMapBg} />
          <div className={styles.geoPinsOverlay}>
            {mockChildren.map((c) => (
              <div
                key={c.id}
                className={styles.geoPin}
                style={{ left: c.geoPos?.left ?? '30%', top: c.geoPos?.top ?? '40%' }}
              >
                <div className={styles.geoAvatarCenter}>
                  {c.avatarUrl ? (
                    <img src={`${base}${c.avatarUrl}`} alt="" className={styles.geoAvatarImg} />
                  ) : (
                    <span className={styles.geoAvatarLetter}>{c.name[0]}</span>
                  )}
                </div>
                <div className={styles.geoPinTail} />
              </div>
            ))}
          </div>
          <div className={styles.geoLinkOverlay}>
            <Link to="/parent/geo-in-zone" className={styles.geoLink}>
              Открыть карту
            </Link>
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

      </div>
    </div>
  );
}
