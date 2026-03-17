import styles from './TaskCard.module.css';

const base = import.meta.env.BASE_URL || '/';
const CAT_ICONS = {
  edu: `${base}assets/cat/edu.png`,
  health: `${base}assets/cat/health.png`,
  sport: `${base}assets/cat/sport.png`,
  parent: `${base}assets/cat/parent.png`,
};
const COIN_ICON = `${base}assets/coin.png`;
const DIAMOND_ICON = `${base}assets/diamond.png`;

function formatReward(reward) {
  if (!reward || reward === '—') return null;
  return reward.replace(/\s+(монет|рублей|балл[а-я]*)\s*$/i, '').trim();
}

function getRewardIcon(reward) {
  if (!reward) return COIN_ICON;
  return /балл/i.test(reward) ? DIAMOND_ICON : COIN_ICON;
}

export default function TaskCard({ task, executorDisplay }) {
  const isDone = task.status === 'done';
  const isAdultPlanned = task.isAdultTask && task.status === 'planned' && task.executorName === 'Я';
  const iconSrc = task.isAdultTask
    ? CAT_ICONS.parent
    : (task.category && CAT_ICONS[task.category] ? CAT_ICONS[task.category] : CAT_ICONS.edu);
  const rewardText = formatReward(task.reward);

  const isParentHighlight = task.isAdultTask && !isDone;
  return (
    <div className={`${styles.taskCard} ${isDone ? styles.taskCardDone : ''} ${isParentHighlight ? styles.taskCardParent : ''}`}>
      <div className={styles.taskCardLeft}>
        <img src={iconSrc} alt="" className={styles.taskCardIcon} />
        <div className={styles.taskCardContent}>
          <span className={styles.taskCardTitle}>{task.title}</span>
          <div className={styles.taskCardMeta}>
            <span className={styles.taskCardDue}>{executorDisplay ?? task.executorName ?? '—'}</span>
            {!task.isAdultTask && rewardText && (
              <span className={styles.xpTag}>
                <span className={styles.xpTagText}>{rewardText}</span>
                <img src={getRewardIcon(task.reward)} alt="" width={14} height={14} />
              </span>
            )}
          </div>
        </div>
      </div>
      {isDone ? (
        <span className={styles.doneTag}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          Готово
        </span>
      ) : isAdultPlanned ? (
        <button type="button" className={styles.completeBtn}>
          Выполнить
        </button>
      ) : (
        <span className={styles.plannedBadge}>Не готово</span>
      )}
    </div>
  );
}
