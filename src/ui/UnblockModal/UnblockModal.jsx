import { useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import styles from './UnblockModal.module.css';

const MINUTE_HOTKEYS = [10, 20, 30, 40, 60, 90, 180];

export default function UnblockModal({ child, onClose, onConfirm, ctaLabel = 'Разблокировать' }) {
  const [minutes, setMinutes] = useState('');
  const portalTarget = typeof document !== 'undefined' ? document.getElementById('phone-frame') : null;

  const handleConfirm = () => {
    const value = parseInt(minutes, 10);
    if (value > 0) {
      onConfirm(value);
      onClose();
    }
  };

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
        <h3 className={styles.title}>Разблокировать</h3>
        <p className={styles.subtitle}>
          Добавить экранное время для {child?.name}
        </p>
        <input
          type="number"
          className={styles.input}
          placeholder="Количество минут"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value.replace(/\D/g, ''))}
          min={1}
          inputMode="numeric"
        />
        <div className={styles.hotkeys}>
          {MINUTE_HOTKEYS.map((m) => (
            <button
              key={m}
              type="button"
              className={styles.hotkeyBtn}
              onClick={() => setMinutes(String(m))}
            >
              {m} мин
            </button>
          ))}
        </div>
        <Button
          disabled={!minutes.trim()}
          onClick={handleConfirm}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );

  if (portalTarget) {
    return createPortal(modalContent, portalTarget);
  }
  return modalContent;
}
