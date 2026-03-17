import { useEffect, useRef, useState } from 'react';
import HomeIndicator from '../HomeIndicator/HomeIndicator';
import BottomNav from '../BottomNav/BottomNav';
import ScreenScroll from '../ScreenScroll/ScreenScroll';
import StatusBar from '../StatusBar/StatusBar';
import styles from './PhoneFrame.module.css';

function FrameContent({ children, scrollable }) {
  return (
    <div className={scrollable ? styles.content : styles.contentNoScroll}>
      {scrollable ? (
        <ScreenScroll>{children}</ScreenScroll>
      ) : (
        children
      )}
    </div>
  );
}

export default function PhoneFrame({ children, bottomNav, fab, showFullPreview = true }) {
  const previewRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!showFullPreview || !previewRef.current) return;
    const el = previewRef.current;
    const updateScale = () => {
      const h = el.scrollHeight;
      const maxH = window.innerHeight - 96;
      if (h > 0 && maxH > 0) {
        setScale(Math.min(1, maxH / h));
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    window.addEventListener('resize', updateScale);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [showFullPreview]);

  const mainFrame = (
    <article id="phone-frame" className={styles.frame}>
      <StatusBar />
      <FrameContent scrollable>{children}</FrameContent>
      {fab ? <div className={styles.fabSlot}>{fab}</div> : null}
      <div className={styles.bottomBar}>
        {bottomNav?.length ? (
          <div className={styles.bottomNavSlot}>
            <BottomNav items={bottomNav} />
          </div>
        ) : null}
        <HomeIndicator />
      </div>
    </article>
  );

  if (!showFullPreview) return mainFrame;

  return (
    <div className={styles.dualFrame}>
      {mainFrame}
      <div className={styles.previewWrap}>
        <article
          ref={previewRef}
          className={styles.framePreview}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
        >
          <StatusBar />
          <FrameContent scrollable={false}>{children}</FrameContent>
          {fab ? <div className={styles.fabSlot}>{fab}</div> : null}
          <div className={styles.bottomBar}>
            {bottomNav?.length ? (
              <div className={styles.bottomNavSlot}>
                <BottomNav items={bottomNav} />
              </div>
            ) : null}
            <HomeIndicator />
          </div>
        </article>
      </div>
    </div>
  );
}
