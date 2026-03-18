import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import diamondIcon from '../../assets/diamond.png';
import styles from './BalanceModal.module.css';

const base = import.meta.env.BASE_URL || '/';
const COIN_ICON = `${base}assets/coin.png`;
const DIAMOND_ICON = diamondIcon;

export default function BalanceModal({ child, onClose }) {
  const portalTarget = typeof document !== 'undefined' ? document.getElementById('phone-frame') : null;

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h3 className={styles.title}>Управление балансом</h3>
        <p className={styles.subtitle}>
          Баланс {child?.name}
        </p>
        <div className={styles.balances}>
          <div className={styles.balanceRow}>
            <img src={COIN_ICON} alt="" width={24} height={24} />
            <span>Монеты: {child?.earnedPoints ?? 0}</span>
          </div>
          <div className={styles.balanceRow}>
            <img src={DIAMOND_ICON} alt="" width={24} height={24} />
            <span>Баллы: {child?.earnedDiamonds ?? 0}</span>
          </div>
        </div>
        <div className={styles.actions}>
          <Button fullWidth={false}>Списать</Button>
          <Button variant="secondary" fullWidth={false}>Добавить</Button>
        </div>
      </div>
    </div>
  );

  if (portalTarget) {
    return createPortal(modalContent, portalTarget);
  }
  return modalContent;
}
