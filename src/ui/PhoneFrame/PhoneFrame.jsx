import HomeIndicator from '../HomeIndicator/HomeIndicator';
import ScreenScroll from '../ScreenScroll/ScreenScroll';
import StatusBar from '../StatusBar/StatusBar';
import styles from './PhoneFrame.module.css';

export default function PhoneFrame({ children }) {
  return (
    <article className={styles.frame}>
      <StatusBar />
      <div className={styles.content}>
        <ScreenScroll>{children}</ScreenScroll>
      </div>
      <HomeIndicator />
    </article>
  );
}
