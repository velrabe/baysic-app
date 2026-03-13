import styles from './Input.module.css';

export default function Input({
  label,
  placeholder,
  hint,
  tooltip,
  value = '',
  type = 'text',
  status = 'default',
  trailing,
  trailingAlt = '',
  onTrailingClick,
  onChange,
  onFocus,
  readOnly = false,
  maxLength,
  inputMode,
  autoFocus = false,
  align = 'left',
}) {
  return (
    <label className={styles.wrapper}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <span className={styles.fieldWrap}>
        {tooltip ? <span className={styles.tooltip}>{tooltip}</span> : null}
        <span className={`${styles.field} ${styles[status]} ${align === 'center' ? styles.center : ''}`}>
          <input
            className={styles.input}
            value={value}
            placeholder={placeholder}
            type={type}
            readOnly={readOnly}
            maxLength={maxLength}
            inputMode={inputMode}
            autoFocus={autoFocus}
            onChange={onChange}
            onFocus={onFocus}
          />
          {trailing ? (
            <button
              type="button"
              className={styles.trailingButton}
              onClick={onTrailingClick}
              aria-label={trailingAlt}
            >
              {typeof trailing === 'string' ? <span className={styles.trailing}>{trailing}</span> : trailing}
            </button>
          ) : null}
        </span>
      </span>
      {hint ? <span className={`${styles.hint} ${styles[status]}`}>{hint}</span> : null}
    </label>
  );
}
