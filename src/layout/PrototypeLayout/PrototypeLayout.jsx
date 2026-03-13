import { useLocation } from 'react-router-dom';
import { screenMetaByPath } from '../../data/screenMeta';
import { getHintsByScreen } from '../../utils/getHintsByScreen';
import HintsPanel from '../HintsPanel/HintsPanel';
import Sidebar from '../Sidebar/Sidebar';
import styles from './PrototypeLayout.module.css';

export default function PrototypeLayout({ children }) {
  const location = useLocation();
  const currentScreen = screenMetaByPath[location.pathname] ?? null;
  const hints = getHintsByScreen(currentScreen?.id);

  return (
    <div className={styles.page}>
      <Sidebar />
      <main className={styles.stage}>
        <div className={styles.phoneWrap}>{children}</div>
      </main>
      <HintsPanel
        title={hints.title}
        screenTitle={currentScreen?.title ?? 'Неизвестный экран'}
        sectionTitle={currentScreen?.section ?? 'Прототип'}
        items={hints.items}
      />
    </div>
  );
}
