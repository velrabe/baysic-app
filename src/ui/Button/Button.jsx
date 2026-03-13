import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  disabled = false,
  shimmer = false,
  type = 'button',
}) {
  const className = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    shimmer ? styles.shimmer : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (to && !disabled) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
