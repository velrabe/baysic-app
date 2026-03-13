import Card from '../Card/Card';
import Button from '../Button/Button';
import roleParentImage from '../../assets/role-parent.png';
import roleChildImage from '../../assets/role-child.png';
import styles from './RoleCard.module.css';

function DiamondIcon() {
  return (
    <span className={styles.diamond} aria-hidden="true">
      <span className={styles.diamondInner} />
    </span>
  );
}

export default function RoleCard({ title, description, to, image = 'vector', tone = 'parent' }) {
  const photoStyle =
    image === 'photo'
      ? {
          backgroundImage: `url(${tone === 'parent' ? roleParentImage : roleChildImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }
      : undefined;

  return (
    <Card className={`${styles.card} ${styles[tone]}`} muted noPadding>
      <div className={styles.media}>
        {image === 'photo' ? <div className={styles.photo} style={photoStyle} /> : <DiamondIcon />}
      </div>
      <div className={styles.body}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <Button to={to} size="sm">
          Выбрать роль
        </Button>
      </div>
    </Card>
  );
}
