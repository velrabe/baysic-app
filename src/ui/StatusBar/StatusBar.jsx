import batteryIcon from '../../assets/status/battery.svg';
import signalIcon from '../../assets/status/signal.svg';
import wifiIcon from '../../assets/status/wifi.svg';
import styles from './StatusBar.module.css';

const icons = [
  { key: 'signal', src: signalIcon, alt: 'Сигнал' },
  { key: 'wifi', src: wifiIcon, alt: 'Wi-Fi' },
  { key: 'battery', src: batteryIcon, alt: 'Батарея' },
];

export default function StatusBar() {
  return (
    <header className={styles.bar}>
      <span className={styles.time}>9:41</span>
      <div className={styles.icons}>
        {icons.map((icon) => (
          <img key={icon.key} className={`${styles.icon} ${styles[icon.key]}`} src={icon.src} alt={icon.alt} />
        ))}
      </div>
    </header>
  );
}
