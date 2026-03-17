import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import styles from './BlockModal.module.css';

export default function BlockModal({ child, onClose, onConfirm }) {
  const portalTarget = typeof document !== 'undefined' ? document.getElementById('phone-frame') : null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
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
        <h3 className={styles.title}>Заблокировать</h3>
        <p className={styles.subtitle}>
          Вы хотите заблокировать экран ребенка?
        </p>
        <p className={styles.note}>
          Экран ребенка будет заблокирован пока вы не отключите блокировку вручную
        </p>
        <Button onClick={handleConfirm}>
          Заблокировать
        </Button>
      </div>
    </div>
  );

  if (portalTarget) {
    return createPortal(modalContent, portalTarget);
  }
  return modalContent;
}
