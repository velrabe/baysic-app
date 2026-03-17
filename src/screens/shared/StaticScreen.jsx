import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chevronLeftIcon from '../../assets/ui/chevron-left.svg';
import eyeClosedIcon from '../../assets/ui/eye-closed.svg';
import eyeIcon from '../../assets/ui/eye.svg';
import { screenContent } from '../../data/screenContent';
import logoSign from '../../assets/logo-sign.png';
import roleChildImage from '../../assets/role-child.png';
import Button from '../../ui/Button/Button';
import Card from '../../ui/Card/Card';
import ChildSwitcher from '../../ui/ChildSwitcher/ChildSwitcher';
import Input from '../../ui/Input/Input';
import PhoneFrame from '../../ui/PhoneFrame/PhoneFrame';
import RoleCard from '../../ui/RoleCard/RoleCard';
import Section from '../../ui/Section/Section';
import styles from './StaticScreen.module.css';

const REGISTER_SUCCESS_EMAIL = 'ivan123@gmail.com';
const REGISTER_SUCCESS_PASSWORD = '12345678';
const REGISTER_ALREADY_EXISTS_EMAIL = 'anna@baysic.ru';
const REGISTER_CONFIRM_CODE = '246810';
const CHILD_SUCCESS_CODE = '123456';
const CHILD_EXPIRED_CODE = '111111';

function BackLink({ to = '/', label = 'Изменить роль' }) {
  return (
    <Link to={to} className={styles.backLink}>
      <img src={chevronLeftIcon} alt="" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

function Hero({ type = 'vector', compact = false, large = false, shimmer = false }) {
  if (type === 'logo') {
    return (
      <div
        className={[
          styles.heroImage,
          compact ? styles.heroImageCompact : '',
          large ? styles.heroImageLarge : '',
          shimmer ? styles.heroShimmer : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <img src={logoSign} alt="Baysic" className={styles.heroLogo} />
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div
        className={[
          styles.heroImage,
          compact ? styles.heroImageCompact : '',
          large ? styles.heroImageLarge : '',
          shimmer ? styles.heroShimmer : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );
  }

  return (
    <div className={`${styles.heroVector} ${compact ? styles.heroVectorCompact : ''}`}>
      <span className={styles.heroDiamond} />
    </div>
  );
}

function StatusNote({ note }) {
  if (!note) {
    return null;
  }

  return <div className={`${styles.statusNote} ${styles[note.tone || 'info']}`}>{note.text}</div>;
}

function AppMark() {
  return (
    <div className={styles.appMark}>
      <Hero type="logo" compact />
      <span className={styles.appMarkTitle}>Baysic</span>
    </div>
  );
}

function FooterLinkBlock({ prefix, linkLabel, to, suffix }) {
  return (
    <p className={styles.footerText}>
      <span>
        {prefix}
        {linkLabel ? (
          <Link to={to} className={styles.footerLink}>
            {linkLabel}
          </Link>
        ) : null}
      </span>
      {suffix ? <span className={styles.footerSubtext}>{suffix}</span> : null}
    </p>
  );
}

function renderSplash(content) {
  return (
    <div className={`${styles.screen} ${styles.splashScreen}`}>
      <div className={styles.splashCenter}>
        <Hero type={content.logoType} large shimmer={content.imageShimmer} />
        <div className={styles.logoText}>
          <h1 className={styles.logoTitle}>{content.title}</h1>
          <p className={styles.logoSubtitle}>{content.subtitle}</p>
        </div>
        {content.badge ? <StatusNote note={{ tone: content.tone || 'info', text: content.badge }} /> : null}
      </div>
      {content.primaryAction ? (
        <div className={styles.bottomAction}>
          <Button to={content.primaryAction?.to} disabled={content.primaryDisabled} shimmer={content.primaryShimmer}>
            {content.primaryAction.label}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function renderRoleSelect(content) {
  return (
    <div className={styles.screen}>
      <div className={styles.roleHeader}>
        <h1 className={styles.title}>{content.title}</h1>
        {content.subtitle ? <p className={styles.subtitle}>{content.subtitle}</p> : null}
      </div>
      <section className={styles.roleSection}>
        <div className={styles.roleStack}>
          {content.roles.map((role) => (
            <RoleCard key={role.title} {...role} />
          ))}
        </div>
      </section>
      {content.footerLink ? (
        <FooterLinkBlock
          prefix={content.footerText}
          linkLabel={content.footerLink.label}
          to={content.footerLink.to}
          suffix={content.footerSubtext}
        />
      ) : null}
    </div>
  );
}

function getRegisterError(form) {
  const normalizedContact = form.contact.trim().toLowerCase();

  if (!/\S+@\S+\.\S+/.test(normalizedContact)) {
    return 'invalid-email';
  }
  if (form.password.length < 8) {
    return 'weak-password';
  }
  if (form.password !== form.confirm) {
    return 'password-mismatch';
  }
  if (normalizedContact === REGISTER_ALREADY_EXISTS_EMAIL) {
    return 'already-exists';
  }

  return null;
}

function getRegisterInitialState(screenId, fields) {
  if (screenId === 'auth.parent.register.invalid-email') {
    return { name: 'Анна', contact: 'anna@', password: '12345678', confirm: '12345678' };
  }
  if (screenId === 'auth.parent.register.weak-password') {
    return { name: 'Иван', contact: REGISTER_SUCCESS_EMAIL, password: '1234', confirm: '1234' };
  }
  if (screenId === 'auth.parent.register.password-mismatch') {
    return { name: 'Иван', contact: REGISTER_SUCCESS_EMAIL, password: '12345678', confirm: '87654321' };
  }
  if (screenId === 'auth.parent.register.already-exists') {
    return { name: 'Анна', contact: REGISTER_ALREADY_EXISTS_EMAIL, password: '12345678', confirm: '12345678' };
  }
  if (screenId === 'auth.parent.register.loading') {
    return { name: 'Иван', contact: REGISTER_SUCCESS_EMAIL, password: REGISTER_SUCCESS_PASSWORD, confirm: REGISTER_SUCCESS_PASSWORD };
  }

  return {
    name: fields[0]?.value ?? '',
    contact: fields[1]?.value ?? '',
    password: fields[2]?.value ?? '',
    confirm: fields[3]?.value ?? '',
  };
}

function resolveRegisterRoute(form) {
  const error = getRegisterError(form);

  if (error === 'invalid-email') return '/auth-parent/register-invalid-email';
  if (error === 'weak-password') return '/auth-parent/register-weak-password';
  if (error === 'password-mismatch') return '/auth-parent/register-password-mismatch';
  if (error === 'already-exists') return '/auth-parent/register-already-exists';

  return '/auth-parent/register-loading';
}

function resolveLoginRoute(form) {
  const normalizedContact = form.contact.trim().toLowerCase();

  if (normalizedContact === 'ghost@baysic.ru') {
    return '/auth-parent/login-user-not-found';
  }
  if (normalizedContact !== REGISTER_SUCCESS_EMAIL || form.password !== REGISTER_SUCCESS_PASSWORD) {
    return '/auth-parent/login-wrong-password';
  }

  return '/auth-parent/login-success';
}

function resolveRestoreRoute(form) {
  if (form.contact.trim().toLowerCase() === 'none@baysic.ru') {
    return '/auth-parent/restore-password-not-found';
  }

  return '/auth-parent/restore-password-sent';
}

function AuthFormScreen({ content, screenId, navigate }) {
  const isRegister = screenId.startsWith('auth.parent.register');
  const isLogin = screenId.startsWith('auth.parent.login');
  const isRestore = screenId.startsWith('auth.parent.restore');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formState, setFormState] = useState(() =>
    isRegister
      ? getRegisterInitialState(screenId, content.fields)
      : isLogin
        ? { contact: content.fields[0]?.value ?? '', password: content.fields[1]?.value ?? '' }
        : { contact: content.fields[0]?.value ?? '' },
  );

  useEffect(() => {
    if (isRegister) {
      setFormState(getRegisterInitialState(screenId, content.fields));
    } else if (isLogin) {
      setFormState({ contact: content.fields[0]?.value ?? '', password: content.fields[1]?.value ?? '' });
    } else if (isRestore) {
      setFormState({ contact: content.fields[0]?.value ?? '' });
    }
  }, [content.fields, isLogin, isRegister, isRestore, screenId]);

  const registerError = isRegister ? getRegisterError(formState) : null;

  const handleSubmit = () => {
    if (isRegister) {
      navigate(resolveRegisterRoute(formState));
      return;
    }
    if (isLogin) {
      navigate(resolveLoginRoute(formState));
      return;
    }
    if (isRestore) {
      navigate(resolveRestoreRoute(formState));
    }
  };

  const isDisabled = isRegister
    ? !formState.name || !formState.contact || !formState.password || !formState.confirm || !!registerError
    : isLogin
      ? !formState.contact || !formState.password
      : !formState.contact;

  return (
    <div className={styles.screen}>
      <BackLink to={content.backTo} />
      <div className={styles.authBody}>
        <div className={styles.authTop}>
          {isRegister ? <AppMark /> : null}
          <div className={styles.authHeading}>
            <h1 className={styles.title}>{content.title}</h1>
            {content.description ? <p className={styles.subtitle}>{content.description}</p> : null}
          </div>
          <div className={styles.formGrid}>
            {isRegister ? (
              <>
                <Input
                  placeholder={content.fields[0].placeholder}
                  value={formState.name}
                  onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))}
                />
                <Input
                  placeholder={content.fields[1].placeholder}
                  value={formState.contact}
                  status={
                    screenId === 'auth.parent.register.invalid-email' || screenId === 'auth.parent.register.already-exists'
                      ? 'error'
                      : 'default'
                  }
                  tooltip={
                    screenId === 'auth.parent.register.invalid-email'
                      ? 'Введите корректный email'
                      : screenId === 'auth.parent.register.already-exists'
                        ? 'Пользователь уже зарегистрирован'
                        : undefined
                  }
                  onChange={(event) => setFormState((state) => ({ ...state, contact: event.target.value }))}
                />
                <Input
                  placeholder={content.fields[2].placeholder}
                  value={formState.password}
                  type={showPassword ? 'text' : 'password'}
                  status={screenId === 'auth.parent.register.weak-password' ? 'error' : 'default'}
                  tooltip={screenId === 'auth.parent.register.weak-password' ? 'Слишком короткий пароль' : undefined}
                  trailing={<img src={showPassword ? eyeIcon : eyeClosedIcon} alt="" aria-hidden="true" />}
                  trailingAlt="Показать или скрыть пароль"
                  onTrailingClick={() => setShowPassword((value) => !value)}
                  onChange={(event) => setFormState((state) => ({ ...state, password: event.target.value }))}
                />
                <Input
                  placeholder={content.fields[3].placeholder}
                  value={formState.confirm}
                  type={showConfirm ? 'text' : 'password'}
                  status={screenId === 'auth.parent.register.password-mismatch' ? 'error' : 'default'}
                  tooltip={screenId === 'auth.parent.register.password-mismatch' ? 'Пароли не совпадают' : undefined}
                  trailing={<img src={showConfirm ? eyeIcon : eyeClosedIcon} alt="" aria-hidden="true" />}
                  trailingAlt="Показать или скрыть повтор пароля"
                  onTrailingClick={() => setShowConfirm((value) => !value)}
                  onChange={(event) => setFormState((state) => ({ ...state, confirm: event.target.value }))}
                />
              </>
            ) : isLogin ? (
              <>
                <Input
                  placeholder={content.fields[0].placeholder}
                  value={formState.contact}
                  status={screenId === 'auth.parent.login.user-not-found' ? 'error' : 'default'}
                  tooltip={screenId === 'auth.parent.login.user-not-found' ? 'Пользователь не найден' : undefined}
                  onChange={(event) => setFormState((state) => ({ ...state, contact: event.target.value }))}
                />
                <Input
                  placeholder={content.fields[1].placeholder}
                  value={formState.password}
                  type={showPassword ? 'text' : 'password'}
                  status={screenId === 'auth.parent.login.wrong-password' ? 'error' : 'default'}
                  tooltip={screenId === 'auth.parent.login.wrong-password' ? 'Неверный пароль' : undefined}
                  trailing={<img src={showPassword ? eyeIcon : eyeClosedIcon} alt="" aria-hidden="true" />}
                  trailingAlt="Показать или скрыть пароль"
                  onTrailingClick={() => setShowPassword((value) => !value)}
                  onChange={(event) => setFormState((state) => ({ ...state, password: event.target.value }))}
                />
              </>
            ) : (
              <Input
                placeholder={content.fields[0].placeholder}
                value={formState.contact}
                status={screenId === 'auth.parent.restore.not-found' ? 'error' : 'default'}
                tooltip={screenId === 'auth.parent.restore.not-found' ? 'Email не найден' : undefined}
                onChange={(event) => setFormState({ contact: event.target.value })}
              />
            )}
          </div>
          {content.auxiliaryLink ? (
            <Link className={styles.inlineLink} to={content.auxiliaryLink.to}>
              {content.auxiliaryLink.label}
            </Link>
          ) : null}
          <StatusNote note={content.statusNote} />
          <div className={styles.actionBlock}>
            {content.primaryAction ? (
              <Button
                onClick={handleSubmit}
                disabled={content.primaryDisabled || isDisabled}
                shimmer={content.primaryShimmer}
              >
                {content.primaryAction.label}
              </Button>
            ) : null}
            {content.helperText ? <p className={styles.helperText}>{content.helperText}</p> : null}
          </div>
        </div>
        {content.footerLink ? (
          <FooterLinkBlock
            prefix={content.footerText}
            linkLabel={content.footerLink.label}
            to={content.footerLink.to}
            suffix={content.footerSubtext}
          />
        ) : null}
      </div>
    </div>
  );
}

function buildCodeArray(code) {
  return code.replace(/\s/g, '').split('').filter((symbol) => symbol !== '-');
}

function resolveConfirmRoute(codeValue) {
  if (codeValue === REGISTER_CONFIRM_CODE) {
    return '/auth-parent/confirm-code-success';
  }
  if (codeValue === '000000') {
    return '/auth-parent/confirm-code-expired';
  }
  return '/auth-parent/confirm-code-wrong';
}

function resolveChildCodeRoute(codeValue) {
  if (codeValue === CHILD_SUCCESS_CODE) {
    return '/auth-child/code-success';
  }
  if (codeValue === CHILD_EXPIRED_CODE) {
    return '/auth-child/code-expired';
  }
  return '/auth-child/code-wrong';
}

function CodeScreen({ content, screenId, navigate }) {
  const isParentConfirm = screenId.startsWith('auth.parent.confirm');
  const isChildCode = screenId.startsWith('auth.child.code');
  const initialCode = useMemo(() => buildCodeArray(content.code), [content.code]);
  const [code, setCode] = useState(initialCode);
  const inputRefs = useRef([]);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    if (screenId === 'auth.parent.confirm.success' || screenId === 'auth.child.code.success') {
      const target =
        screenId === 'auth.parent.confirm.success' ? '/parent/dashboard-single-child/0' : '/child/onboarding/accessibility';
      const timer = window.setTimeout(() => navigate(target), 1500);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [navigate, screenId]);

  const updateCode = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1);
    const nextCode = [...code];
    nextCode[index] = nextValue;
    setCode(nextCode);

    if (nextValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = () => {
    if (screenId === 'auth.child.code.wrong' || screenId === 'auth.child.code.expired') {
      navigate('/auth-child/code');
    }
  };

  const handleSubmit = () => {
    const codeValue = code.join('');
    navigate(isParentConfirm ? resolveConfirmRoute(codeValue) : resolveChildCodeRoute(codeValue));
  };

  const isDisabled = content.primaryDisabled || code.some((symbol) => !symbol);

  return (
    <div className={styles.screen}>
      <BackLink to={content.backTo} />
      <div className={styles.authBody}>
        <div className={`${styles.authTop} ${isChildCode ? styles.authTopAlignStart : ''}`}>
          {isParentConfirm ? <AppMark /> : null}
          <div className={styles.authHeading}>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.subtitle}>{content.description}</p>
          </div>
          {content.bannerImage ? (
            <div
              className={styles.bannerImage}
              style={
                isChildCode
                  ? { backgroundImage: `url(${roleChildImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : undefined
              }
            />
          ) : null}
          <div className={styles.codeRow}>
            {code.map((symbol, index) => (
              <input
                key={`${screenId}-${index}`}
                ref={(node) => {
                  inputRefs.current[index] = node;
                }}
                className={`${styles.codeInput} ${content.tone ? styles[content.tone] : ''}`}
                value={symbol}
                placeholder="0"
                inputMode="numeric"
                maxLength={1}
                onFocus={handleFocus}
                onChange={(event) => updateCode(index, event.target.value)}
              />
            ))}
          </div>
          {content.resendLink ? (
            <Link to={content.resendLink.to} className={styles.textLink}>
              {content.resendLink.label}
            </Link>
          ) : null}
          <StatusNote note={content.statusNote} />
          <div className={styles.actionBlock}>
            <Button onClick={handleSubmit} disabled={isDisabled} shimmer={content.primaryShimmer}>
              {content.primaryAction.label}
            </Button>
          </div>
        </div>
        {content.footerLink ? (
          <FooterLinkBlock
            prefix={content.footerText}
            linkLabel={content.footerLink.label}
            to={content.footerLink.to}
            suffix={content.footerSubtext}
          />
        ) : null}
      </div>
    </div>
  );
}

function SummaryCards({ cards = [] }) {
  return (
    <div className={styles.cardGrid}>
      {cards.map((card) => (
        <Card key={`${card.title}-${card.value}`} accent={card.title.includes('Экранного')}>
          <div className={styles.stackSm}>
            <span className={styles.cardLabel}>{card.title}</span>
            <strong className={styles.cardValue}>{card.value}</strong>
            <span className={styles.cardDescription}>{card.description}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TaskList({ items = [] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <Card key={item.title || item} muted className={styles.listCard}>
          {typeof item === 'string' ? (
            <span className={styles.listText}>{item}</span>
          ) : (
            <div className={styles.listRow}>
              <div className={styles.stackXs}>
                <strong>{item.title}</strong>
                <span className={styles.cardDescription}>{item.reward}</span>
              </div>
              <span className={`${styles.badge} ${item.status === 'done' ? styles.successBadge : styles.mutedBadge}`}>
                {item.status === 'done' ? 'Выполнено' : 'В планах'}
              </span>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function renderDashboard(content) {
  return (
    <div className={styles.screen}>
      <Section title={content.title} subtitle={content.subtitle}>
        <ChildSwitcher items={content.childSwitcher} />
      </Section>
      <Button to={content.primaryAction.to} variant="secondary">
        {content.primaryAction.label}
      </Button>
      <SummaryCards cards={content.cards} />
      {content.taskList ? (
        <Section title="Задания на сегодня" subtitle="Статичный список сценария.">
          <TaskList items={content.taskList} />
        </Section>
      ) : null}
    </div>
  );
}

function AddChildFormScreen({ content, navigate }) {
  const [formState, setFormState] = useState({
    name: '',
    age: '',
    gender: '',
    class: '',
  });

  const handleSubmit = () => {
    navigate('/parent/add-child-code-active');
  };

  const isDisabled = !formState.name.trim();

  return (
    <div className={styles.screen}>
      <Section title={content.title} subtitle={content.subtitle}>
        <div className={styles.formGrid}>
          <Input
            label="Имя"
            placeholder="Введите имя ребенка"
            value={formState.name}
            onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
          />
          <Input
            label="Возраст"
            placeholder="Лет"
            value={formState.age}
            type="number"
            inputMode="numeric"
            onChange={(e) => setFormState((s) => ({ ...s, age: e.target.value }))}
          />
          <label className={styles.selectLabel}>
            <span className={styles.label}>Пол</span>
            <select
              className={styles.select}
              value={formState.gender}
              onChange={(e) => setFormState((s) => ({ ...s, gender: e.target.value }))}
            >
              <option value="">Не указан</option>
              <option value="male">Мальчик</option>
              <option value="female">Девочка</option>
            </select>
          </label>
          <label className={styles.selectLabel}>
            <span className={styles.label}>Класс</span>
            <select
              className={styles.select}
              value={formState.class}
              onChange={(e) => setFormState((s) => ({ ...s, class: e.target.value }))}
            >
              <option value="">Не школьник</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => (
                <option key={n} value={String(n)}>
                  {n} класс
                </option>
              ))}
            </select>
          </label>
        </div>
      </Section>
      <Button onClick={handleSubmit} disabled={isDisabled}>
        Добавить ребенка
      </Button>
    </div>
  );
}

function renderAddChild(content) {
  return (
    <div className={styles.screen}>
      <Section title={content.title} subtitle={content.subtitle}>
        <Card muted className={styles.centerCard}>
          <Hero type="image" compact />
          {content.code ? <div className={styles.bigCode}>{content.code}</div> : null}
          <p className={styles.cardDescription}>
            {content.code
              ? 'Код можно показать ребенку для авторизации в отдельном сценарии.'
              : 'Покажите код ребенку. Он действует ограниченное время.'}
          </p>
        </Card>
      </Section>
      <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
      {content.secondaryAction ? (
        <Button to={content.secondaryAction.to} variant="secondary">
          {content.secondaryAction.label}
        </Button>
      ) : null}
    </div>
  );
}

function Breadcrumb({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav className={styles.breadcrumb} aria-label="Навигация">
      {items.map((item, i) => (
        <span key={item.label}>
          {i > 0 && <span className={styles.breadcrumbSep}> › </span>}
          {item.path ? (
            <Link to={item.path} className={styles.breadcrumbLink}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.breadcrumbCurrent}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function renderApps(content) {
  return (
    <div className={styles.screen}>
      {content.backTo ? <BackLink to={content.backTo} label={content.backLabel || 'Назад'} /> : null}
      {content.breadcrumb?.length ? <Breadcrumb items={content.breadcrumb} /> : null}
      <Section title={content.title} subtitle={content.subtitle}>
        {content.childSwitcher ? (
          <div className={styles.childContext}>
            <span className={styles.childContextLabel}>{content.childContextLabel || 'Ребенок:'}</span>
            <ChildSwitcher items={content.childSwitcher} />
          </div>
        ) : null}
      </Section>
      {content.apps ? (
        <div className={styles.list}>
          {content.apps.map((app) => (
            <Card key={app.name} muted>
              <div className={styles.listRow}>
                <div className={styles.listApp}>
                  <Hero compact />
                  <div className={styles.stackXs}>
                    <strong>{app.name}</strong>
                    <span className={styles.cardDescription}>{app.time}</span>
                  </div>
                </div>
                <span className={`${styles.badge} ${styles[`${app.statusTone}Badge`]}`}>{app.status}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card muted>
          <div className={styles.stackSm}>
            <strong>{content.appDetails.name}</strong>
            <span className={styles.cardDescription}>Статус: {content.appDetails.status}</span>
            <span className={styles.cardDescription}>Лимит: {content.appDetails.limit}</span>
            <span className={styles.cardDescription}>Расписание: {content.appDetails.schedule}</span>
          </div>
        </Card>
      )}
      <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
      {content.secondaryAction ? (
        <Button to={content.secondaryAction.to} variant="secondary">
          {content.secondaryAction.label}
        </Button>
      ) : null}
    </div>
  );
}

function renderProfile(content) {
  return (
    <div className={styles.screen}>
      <Section title={content.title} subtitle={content.subtitle}>
        {content.childSwitcher ? <ChildSwitcher items={content.childSwitcher} /> : null}
      </Section>
      <div className={styles.list}>
        {content.sections.map((section) => (
          <Section key={section.title} title={section.title}>
            <TaskList items={section.items} />
          </Section>
        ))}
      </div>
      <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
    </div>
  );
}

function renderChildHome(content) {
  return (
    <div className={styles.screen}>
      {content.backTo ? <BackLink to={content.backTo} label={content.backLabel || 'Назад'} /> : null}
      <Section title={content.title} subtitle={content.subtitle} />
      <SummaryCards cards={content.cards} />
      <Section title="Сегодняшние задания">
        <TaskList items={content.taskList} />
      </Section>
      <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
    </div>
  );
}

function renderChildList(content) {
  return (
    <div className={styles.screen}>
      {content.backTo ? <BackLink to={content.backTo} label={content.backLabel || 'Назад'} /> : null}
      <Section title={content.title} subtitle={content.subtitle} />
      <TaskList items={content.items} />
      <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
    </div>
  );
}

function renderCollection(content) {
  return (
    <div className={styles.screen}>
      {content.backTo ? <BackLink to={content.backTo} label={content.backLabel || 'Назад'} /> : null}
      {content.breadcrumb?.length ? <Breadcrumb items={content.breadcrumb} /> : null}
      <Section title={content.title} subtitle={content.subtitle}>
        {content.childSwitcher ? (
          <div className={styles.childContext}>
            <span className={styles.childContextLabel}>{content.childContextLabel || 'Ребенок:'}</span>
            <ChildSwitcher items={content.childSwitcher} />
          </div>
        ) : null}
      </Section>
      {content.leadCard ? (
        <Card muted={content.leadCard.muted !== false} accent={content.leadCard.accent}>
          <div className={styles.stackSm}>
            <strong>{content.leadCard.title}</strong>
            {content.leadCard.value ? <span className={styles.cardValue}>{content.leadCard.value}</span> : null}
            {content.leadCard.description ? <span className={styles.cardDescription}>{content.leadCard.description}</span> : null}
          </div>
        </Card>
      ) : null}
      <div className={styles.list}>
        {(content.sections || []).map((section) => (
          <Section key={section.title} title={section.title} subtitle={section.subtitle}>
            <TaskList items={section.items} />
          </Section>
        ))}
      </div>
      {content.primaryAction ? <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button> : null}
      {content.secondaryAction ? (
        <Button to={content.secondaryAction.to} variant="secondary">
          {content.secondaryAction.label}
        </Button>
      ) : null}
    </div>
  );
}

function renderChildOnboarding(content) {
  return (
    <div className={styles.screen}>
      <div className={styles.stepperHeader}>
        <div className={styles.stepperMeta}>
          <span className={styles.stepCounter}>
            Шаг {content.step} из {content.totalSteps}
          </span>
          <div className={styles.stepperTrack} style={{ '--step-count': content.totalSteps }} aria-hidden="true">
            {Array.from({ length: content.totalSteps }).map((_, index) => (
              <span
                key={`${content.title}-${index}`}
                className={`${styles.stepperDot} ${index < content.step ? styles.stepperDotActive : ''}`}
              />
            ))}
          </div>
        </div>
        <div className={styles.authHeading}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.description}</p>
        </div>
      </div>
      <Card muted className={styles.centerCard}>
        <Hero type="image" />
        <div className={styles.stackSm}>
          <strong>{content.cardTitle}</strong>
          <span className={styles.cardDescription}>{content.cardText}</span>
        </div>
      </Card>
      {content.bullets?.length ? (
        <div className={styles.list}>
          {content.bullets.map((item) => (
            <Card key={item} muted className={styles.listCard}>
              <span className={styles.listText}>{item}</span>
            </Card>
          ))}
        </div>
      ) : null}
      <div className={styles.childOnboardingActions}>
        <StatusNote note={content.statusNote} />
        <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
        {content.secondaryAction ? (
          content.secondaryAction.variant === 'text' ? (
            <Link to={content.secondaryAction.to} className={styles.parentTextLink}>
              <span className={styles.parentTextLinkPrimary}>Войти</span>
              <span className={styles.parentTextLinkSecondary}>как родитель</span>
            </Link>
          ) : (
            <Button to={content.secondaryAction.to} variant="secondary">
              {content.secondaryAction.label}
            </Button>
          )
        ) : null}
      </div>
    </div>
  );
}

function renderSystem(content) {
  if (content.isModal) {
    return (
      <div className={styles.screen}>
        <div className={styles.modalOverlay}>
          <div className={styles.modalBackdrop} />
          <div className={styles.modalCard}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => window.location.assign(content.closeTo || '/child/onboarding/accessibility')}
              aria-label="Закрыть"
            >
              ×
            </button>
            <div className={styles.stack}>
              <h1 className={styles.title}>{content.title}</h1>
              <p className={styles.subtitle}>{content.subtitle}</p>
            </div>
            <div className={styles.modalActions}>
              <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
              <Button to={content.secondaryAction.to} variant="secondary">
                {content.secondaryAction.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.screen} ${styles.centeredScreen}`}>
      <Hero type="image" />
      <div className={styles.stack}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </div>
      <div className={styles.stack}>
        <Button to={content.primaryAction.to}>{content.primaryAction.label}</Button>
        <Button to={content.secondaryAction.to} variant="secondary">
          {content.secondaryAction.label}
        </Button>
      </div>
    </div>
  );
}

export default function StaticScreen({ screenId }) {
  const content = screenContent[screenId];
  const navigate = useNavigate();

  return (
    <PhoneFrame bottomNav={content.bottomNav}>
      {content.variant === 'splash' && renderSplash(content)}
      {content.variant === 'role-select' && renderRoleSelect(content)}
      {content.variant === 'auth-form' && <AuthFormScreen content={content} screenId={screenId} navigate={navigate} />}
      {content.variant === 'code' && <CodeScreen content={content} screenId={screenId} navigate={navigate} />}
      {content.variant === 'dashboard' && renderDashboard(content)}
      {content.variant === 'add-child' && screenId === 'parent.add-child.intro' && (
        <AddChildFormScreen content={content} navigate={navigate} />
      )}
      {content.variant === 'add-child' && screenId !== 'parent.add-child.intro' && renderAddChild(content)}
      {content.variant === 'apps' && renderApps(content)}
      {content.variant === 'profile' && renderProfile(content)}
      {content.variant === 'child-home' && renderChildHome(content)}
      {content.variant === 'child-list' && renderChildList(content)}
      {content.variant === 'collection' && renderCollection(content)}
      {content.variant === 'child-onboarding' && renderChildOnboarding(content)}
      {content.variant === 'system' && renderSystem(content)}
    </PhoneFrame>
  );
}

export function createStaticScreen(screenId) {
  function ScreenComponent() {
    return <StaticScreen screenId={screenId} />;
  }

  ScreenComponent.displayName = screenId;

  return ScreenComponent;
}
