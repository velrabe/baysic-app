import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams, Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import PhoneFrame from '../../../ui/PhoneFrame/PhoneFrame';
import TaskCard from '../../../ui/TaskCard/TaskCard';
import DashboardHomeHero from '../dashboard/DashboardHomeHero/DashboardHomeHero';
import { parentTabs } from '../../../data/screenContent';
import { getChildById } from '../../../data/mockChildren';
import { mockTasks } from '../../../data/mockTasks';
import UnblockModal from '../../../ui/UnblockModal/UnblockModal';
import BalanceModal from '../../../ui/BalanceModal/BalanceModal';
import diamondIcon from '../../../assets/diamond.png';
import styles from './ChildProfileDetail.module.css';

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

function AnalyticsTopAppsScroll({ children }) {
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
    <div className={styles.analyticsTopAppsScrollWrap}>
      <div
        ref={scrollRef}
        className={styles.analyticsTopAppsList}
        onScroll={updateOverlays}
      >
        {children}
      </div>
      <div className={`${styles.analyticsTopAppsOverlay} ${styles.analyticsTopAppsOverlayLeft} ${showLeft ? styles.analyticsTopAppsOverlayVisible : ''}`} aria-hidden="true" />
      <div className={`${styles.analyticsTopAppsOverlay} ${styles.analyticsTopAppsOverlayRight} ${showRight ? styles.analyticsTopAppsOverlayVisible : ''}`} aria-hidden="true" />
    </div>
  );
}

function getManagementActions(child) {
  const hasTime = (child.screenTimeLeftMinutes ?? 0) > 0;
  if (hasTime) {
    return [
      { label: 'Заблокировать', to: '/parent/dashboard-limit-exceeded' },
      { label: 'Добавить время', action: 'addTime' },
    ];
  }
  return [{ label: 'Разблокировать', action: 'unblock' }];
}

export default function ChildProfileDetail({ standalone = false, tasksLimit: tasksLimitProp }) {
  const { childId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const tasksParam = searchParams.get('tasks');
  const tasksLimit = tasksLimitProp ?? (tasksParam ? parseInt(tasksParam, 10) : undefined);
  const child = getChildById(childId);
  const [timeModal, setTimeModal] = useState(null); // 'unblock' | 'addTime' | null
  const [balanceModal, setBalanceModal] = useState(false);

  const navigate = useNavigate();
  const fromMultiChild = location.state?.from === 'dashboard-online';
  const backTo = fromMultiChild ? '/parent/dashboard-online' : '/parent/dashboard-single-child/0';

  const childTasks = mockTasks.filter((t) => t.assigneeId === childId && !t.dueDate?.includes?.('Вчера'));
  const sortedTasks = [...childTasks]
    .sort((a, b) => {
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
    })
    .slice(0, tasksLimit ?? childTasks.length);
  const displayedTasks = sortedTasks.slice(0, 5);
  const allTasksLink = fromMultiChild ? '/parent/tasks-multi' : '/parent/tasks-single-child';
  const createTaskLink = fromMultiChild ? '/parent/tasks-create-multi' : '/parent/tasks-create';

  const tasksDone = sortedTasks.filter((t) => t.status === 'done').length;

  return (
    <PhoneFrame bottomNav={parentTabs}>
      <div className={`${styles.screen} ${standalone ? styles.screenStandalone : ''}`}>
        {standalone && (
          <DashboardHomeHero
            child={child}
            tasksDone={tasksDone}
            tasksTotal={sortedTasks.length}
            onBlockClick={() => navigate('/parent/dashboard-limit-exceeded')}
            onAddTimeClick={() => setTimeModal('addTime')}
            onUnblockClick={() => setTimeModal('unblock')}
            editProfileTo={`/parent/child-profile/${childId}/edit`}
          />
        )}

        {!standalone ? (
          <>
            <nav className={styles.navBar}>
              <Link to={backTo} className={styles.backBtn}>
                ← Назад
              </Link>
              <h1 className={styles.navTitle}>Профиль ребенка</h1>
              <span className={styles.navSpacer} aria-hidden="true" />
            </nav>

            <header className={styles.header}>
              <div className={styles.avatarLarge}>{child.name[0]}</div>
              <div className={styles.headerInfo}>
                <h2 className={styles.childName}>{child.name}</h2>
                <p className={styles.childMeta}>{child.age} лет, {child.grade}</p>
                <p className={styles.childMood}>{child.mood}</p>
              </div>
              <Link to={`/parent/child-profile/${childId}/edit`} className={styles.editBtn} aria-label="Редактировать профиль">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 512 512" aria-hidden="true">
                  <path fill="currentColor" d="m362.7 19.3l-48.4 48.4l130 130l48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2z"/>
                </svg>
              </Link>
            </header>

            <section className={styles.block}>
              <div className={styles.screenTimeBlock}>
                <div className={styles.statRow}>
                  <span>Экранное время</span>
                  <strong>
                    {child.screenTimeLeftMinutes ?? 85}/{child.screenTimeTotalMinutes || 180} мин
                  </strong>
                </div>
                <div className={styles.progressTrack}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${Math.min(
                        100,
                        ((child.screenTimeTotalMinutes || 180) - (child.screenTimeLeftMinutes ?? 85)) /
                          (child.screenTimeTotalMinutes || 180) * 100
                      )}%`,
                    }}
                  />
                </div>
                <div className={styles.actionsGrid}>
                {getManagementActions(child).map((a) => {
                  const IconBlock = a.label === 'Заблокировать' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={styles.actionBtnIcon}>
                      <path fill="currentColor" d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3V7a5 5 0 0 1 5-5m0 12a2 2 0 0 0-1.995 1.85L10 16a2 2 0 1 0 2-2m0-10a3 3 0 0 0-3 3v3h6V7a3 3 0 0 0-3-3"/>
                    </svg>
                  ) : a.label === 'Добавить время' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={styles.actionBtnIcon}>
                      <path fill="currentColor" d="M10.75 8c-.41 0-.75.34-.75.75v4.69c0 .35.18.67.47.85l3.64 2.24a.713.713 0 1 0 .74-1.22L11.5 13.3V8.75c0-.41-.34-.75-.75-.75"/>
                      <path fill="currentColor" d="M17.92 12A6.957 6.957 0 0 1 11 20c-3.9 0-7-3.1-7-7s3.1-7 7-7c.7 0 1.37.1 2 .29V4.23c-.64-.15-1.31-.23-2-.23c-5 0-9 4-9 9s4 9 9 9a8.963 8.963 0 0 0 8.94-10z"/>
                      <path fill="currentColor" d="M22 5h-2V3c0-.55-.45-1-1-1s-1 .45-1 1v2h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1"/>
                    </svg>
                  ) : null;
                  return a.action === 'unblock' || a.action === 'addTime' ? (
                    <button
                      key={a.label}
                      type="button"
                      className={styles.actionBtn}
                      onClick={() => setTimeModal(a.action)}
                    >
                      {IconBlock}
                      {a.label}
                    </button>
                  ) : (
                    <Link key={a.label} to={a.to} className={styles.actionBtn}>
                      {IconBlock}
                      {a.label}
                    </Link>
                  );
                })}
                </div>
              </div>
            </section>

            <section className={styles.block}>
          <div className={styles.blockHeader}>
            <h3 className={styles.tasksBlockTitle}>
              Задания на{' '}
              <Link to={`${allTasksLink}?openCalendar=1`} className={styles.tasksDateLink}>
                Сегодня
              </Link>
            </h3>
            <Link to={createTaskLink} className={styles.addTaskLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Добавить
            </Link>
          </div>
          <div className={styles.taskCardBlockBody}>
            <div className={`${styles.taskCardListWrap} ${sortedTasks.length > 5 ? styles.taskCardListWrapOverflow : ''}`}>
              <div className={styles.taskCardList}>
                {displayedTasks.map((t) => (
                  <TaskCard
                    key={t.id || t.title}
                    task={t}
                    executorDisplay={!t.isAdultTask ? child.name : undefined}
                    executorAvatar={!t.isAdultTask ? child : undefined}
                  />
                ))}
              </div>
              {sortedTasks.length > 5 && (
                <div className={styles.taskCardListOverlay} aria-hidden="true" />
              )}
            </div>
            <Link to={allTasksLink} className={styles.taskCardAllLink}>
              Все задания ({sortedTasks.length}) →
            </Link>
          </div>
        </section>

        <section className={styles.block}>
            <div className={styles.blockHeader}>
            <h3 className={styles.blockTitle}>Аналитика</h3>
            <Link to={`/parent/analytics/${childId}`} className={styles.moreLink}>
              Подробнее →
            </Link>
          </div>
          <div className={styles.analytics}>
            <div className={styles.analyticsCategoriesCard}>
              <div className={styles.analyticsProgressBar}>
                {ANALYTICS_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={styles.analyticsProgressSegment}
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  />
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
              <AnalyticsTopAppsScroll>
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
            <div className={styles.balanceGrid}>
              <div className={styles.balanceColumn}>
                <span className={styles.balanceLabel}>Монеты</span>
                <div className={styles.balanceValueRow}>
                  <img src={COIN_ICON} alt="" className={styles.balanceIcon} />
                  <span className={styles.balanceValue}>{child.earnedPoints ?? 0}</span>
                </div>
              </div>
              <div className={styles.balanceColumn}>
                <span className={styles.balanceLabel}>Баллы</span>
                <div className={styles.balanceValueRow}>
                  <img src={DIAMOND_ICON} alt="" className={styles.balanceIcon} />
                  <span className={styles.balanceValue}>{child.earnedDiamonds ?? 0}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={styles.balanceManageBtn}
              onClick={() => setBalanceModal(true)}
            >
              Управление балансом →
            </button>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.geoPreview}>
            <div className={styles.geoMapBg} />
            <div className={styles.geoPin}>
              <div className={styles.geoAvatarCenter}>
                {child.avatarUrl ? (
                  <img src={`${import.meta.env.BASE_URL || '/'}${child.avatarUrl}`} alt="" className={styles.geoAvatarImg} />
                ) : (
                  <span className={styles.geoAvatarLetter}>{child.name[0]}</span>
                )}
              </div>
              <div className={styles.geoPinTail} />
            </div>
            <div className={styles.geoLinkOverlay}>
              <Link to="/parent/geo-in-zone" className={styles.geoLink}>
                Открыть карту
              </Link>
            </div>
          </div>
        </section>
          </>
        ) : (
          <div className={styles.screenBody}>
        <section className={styles.block}>
          <div className={styles.blockHeader}>
            <h3 className={styles.tasksBlockTitle}>
              Задания на{' '}
              <Link to={`${allTasksLink}?openCalendar=1`} className={styles.tasksDateLink}>
                Сегодня
              </Link>
            </h3>
            <Link to={createTaskLink} className={styles.addTaskLink}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Добавить
            </Link>
          </div>
          <div className={styles.taskCardBlockBody}>
            <div className={`${styles.taskCardListWrap} ${sortedTasks.length > 5 ? styles.taskCardListWrapOverflow : ''}`}>
              <div className={styles.taskCardList}>
                {displayedTasks.map((t) => (
                  <TaskCard
                    key={t.id || t.title}
                    task={t}
                    executorDisplay={!t.isAdultTask ? child.name : undefined}
                    executorAvatar={!t.isAdultTask ? child : undefined}
                  />
                ))}
              </div>
              {sortedTasks.length > 5 && (
                <div className={styles.taskCardListOverlay} aria-hidden="true" />
              )}
            </div>
            <Link to={allTasksLink} className={styles.taskCardAllLink}>
              Все задания ({sortedTasks.length}) →
            </Link>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.blockHeader}>
            <h3 className={styles.blockTitle}>Аналитика</h3>
            <Link to={`/parent/analytics/${childId}`} className={styles.moreLink}>
              Подробнее →
            </Link>
          </div>
          <div className={styles.analytics}>
            <div className={styles.analyticsCategoriesCard}>
              <div className={styles.analyticsProgressBar}>
                {ANALYTICS_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={styles.analyticsProgressSegment}
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  />
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
              <AnalyticsTopAppsScroll>
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
            <div className={styles.balanceGrid}>
              <div className={styles.balanceColumn}>
                <span className={styles.balanceLabel}>Монеты</span>
                <div className={styles.balanceValueRow}>
                  <img src={COIN_ICON} alt="" className={styles.balanceIcon} />
                  <span className={styles.balanceValue}>{child.earnedPoints ?? 0}</span>
                </div>
              </div>
              <div className={styles.balanceColumn}>
                <span className={styles.balanceLabel}>Баллы</span>
                <div className={styles.balanceValueRow}>
                  <img src={DIAMOND_ICON} alt="" className={styles.balanceIcon} />
                  <span className={styles.balanceValue}>{child.earnedDiamonds ?? 0}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className={styles.balanceManageBtn}
              onClick={() => setBalanceModal(true)}
            >
              Управление балансом →
            </button>
          </div>
        </section>

        <section className={styles.block}>
          <div className={styles.geoPreview}>
            <div className={styles.geoMapBg} />
            <div className={styles.geoPin}>
              <div className={styles.geoAvatarCenter}>
                {child.avatarUrl ? (
                  <img src={`${import.meta.env.BASE_URL || '/'}${child.avatarUrl}`} alt="" className={styles.geoAvatarImg} />
                ) : (
                  <span className={styles.geoAvatarLetter}>{child.name[0]}</span>
                )}
              </div>
              <div className={styles.geoPinTail} />
            </div>
            <div className={styles.geoLinkOverlay}>
              <Link to="/parent/geo-in-zone" className={styles.geoLink}>
                Открыть карту
              </Link>
            </div>
          </div>
        </section>
          </div>
        )}

        {timeModal && (
          <UnblockModal
            child={child}
            ctaLabel={timeModal === 'addTime' ? 'Добавить время' : 'Разблокировать'}
            onClose={() => setTimeModal(null)}
            onConfirm={(mins) => {
              setTimeModal(null);
              /* TODO: apply logic */
            }}
          />
        )}
        {balanceModal && (
          <BalanceModal child={child} onClose={() => setBalanceModal(false)} />
        )}
      </div>
    </PhoneFrame>
  );
}
