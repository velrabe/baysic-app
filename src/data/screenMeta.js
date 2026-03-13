const createScreen = (id, path, title, section, group) => ({ id, path, title, section, group });

const childPermissionSteps = [
  ['accessibility', 'Онбординг ребенка / Accessibility'],
  ['delete-protection', 'Онбординг ребенка / Защита от удаления'],
  ['notifications', 'Онбординг ребенка / Уведомления'],
  ['battery', 'Онбординг ребенка / Оптимизация батареи'],
  ['location', 'Онбординг ребенка / Геолокация'],
  ['activity', 'Онбординг ребенка / Физическая активность'],
  ['pin', 'Онбординг ребенка / Пин-код'],
  ['limits', 'Онбординг ребенка / Временные ограничения'],
];

export const screens = [
  createScreen('onboarding.splash.loading', '/onboarding/splash-loading', 'Загрузка приложения', 'Онбординг', 'Splash'),
  createScreen('onboarding.splash.error', '/onboarding/splash-error', 'Ошибка загрузки', 'Онбординг', 'Splash'),
  createScreen('onboarding.role.default', '/onboarding/role-select', 'Выбор роли', 'Онбординг', 'Role Select'),

  createScreen('auth.parent.register.default', '/auth-parent/register', 'Регистрация взрослого', 'Авторизация родителя', 'Register'),
  createScreen('auth.parent.register.invalid-email', '/auth-parent/register-invalid-email', 'Регистрация / Неверный email', 'Авторизация родителя', 'Register'),
  createScreen('auth.parent.register.weak-password', '/auth-parent/register-weak-password', 'Регистрация / Слабый пароль', 'Авторизация родителя', 'Register'),
  createScreen('auth.parent.register.password-mismatch', '/auth-parent/register-password-mismatch', 'Регистрация / Пароли не совпадают', 'Авторизация родителя', 'Register'),
  createScreen('auth.parent.register.already-exists', '/auth-parent/register-already-exists', 'Регистрация / Аккаунт уже существует', 'Авторизация родителя', 'Register'),
  createScreen('auth.parent.register.loading', '/auth-parent/register-loading', 'Регистрация / Загрузка', 'Авторизация родителя', 'Register'),

  createScreen('auth.parent.confirm.default', '/auth-parent/confirm-code', 'Подтверждение регистрации', 'Авторизация родителя', 'Confirm'),
  createScreen('auth.parent.confirm.wrong', '/auth-parent/confirm-code-wrong', 'Подтверждение / Неверный код', 'Авторизация родителя', 'Confirm'),
  createScreen('auth.parent.confirm.expired', '/auth-parent/confirm-code-expired', 'Подтверждение / Код истек', 'Авторизация родителя', 'Confirm'),
  createScreen('auth.parent.confirm.success', '/auth-parent/confirm-code-success', 'Подтверждение / Успех', 'Авторизация родителя', 'Confirm'),

  createScreen('auth.parent.login.default', '/auth-parent/login', 'Вход взрослого', 'Авторизация родителя', 'Login'),
  createScreen('auth.parent.login.wrong-password', '/auth-parent/login-wrong-password', 'Вход / Неверный пароль', 'Авторизация родителя', 'Login'),
  createScreen('auth.parent.login.user-not-found', '/auth-parent/login-user-not-found', 'Вход / Пользователь не найден', 'Авторизация родителя', 'Login'),
  createScreen('auth.parent.login.success', '/auth-parent/login-success', 'Вход / Успех', 'Авторизация родителя', 'Login'),

  createScreen('auth.parent.restore.default', '/auth-parent/restore-password', 'Восстановление пароля', 'Авторизация родителя', 'Restore'),
  createScreen('auth.parent.restore.not-found', '/auth-parent/restore-password-not-found', 'Восстановление / Email не найден', 'Авторизация родителя', 'Restore'),
  createScreen('auth.parent.restore.sent', '/auth-parent/restore-password-sent', 'Восстановление / Письмо отправлено', 'Авторизация родителя', 'Restore'),

  createScreen('auth.child.code.default', '/auth-child/code', 'Код авторизации ребенка', 'Авторизация ребенка', 'Code'),
  createScreen('auth.child.code.wrong', '/auth-child/code-wrong', 'Код ребенка / Ошибка', 'Авторизация ребенка', 'Code'),
  createScreen('auth.child.code.expired', '/auth-child/code-expired', 'Код ребенка / Истек', 'Авторизация ребенка', 'Code'),
  createScreen('auth.child.code.success', '/auth-child/code-success', 'Код ребенка / Успех', 'Авторизация ребенка', 'Code'),

  ...childPermissionSteps.flatMap(([slug, title]) => [
    createScreen(`child.onboarding.${slug}.pending`, `/child/onboarding/${slug}`, `${title} / До выдачи`, 'Онбординг ребенка', 'Permissions'),
    createScreen(`child.onboarding.${slug}.done`, `/child/onboarding/${slug}-done`, `${title} / Выдано`, 'Онбординг ребенка', 'Permissions'),
  ]),

  createScreen('parent.dashboard.no-child', '/parent/dashboard-no-child', 'Дом / Нет ребенка', 'Родитель', 'Dashboard'),
  createScreen('parent.dashboard.online', '/parent/dashboard-online', 'Дом / Ребенок онлайн', 'Родитель', 'Dashboard'),
  createScreen('parent.dashboard.offline', '/parent/dashboard-offline', 'Дом / Ребенок офлайн', 'Родитель', 'Dashboard'),
  createScreen('parent.dashboard.limit-exceeded', '/parent/dashboard-limit-exceeded', 'Дом / Лимит превышен', 'Родитель', 'Dashboard'),
  createScreen('parent.add-child.intro', '/parent/add-child-intro', 'Добавить ребенка / Старт', 'Родитель', 'Add Child'),
  createScreen('parent.add-child.code-active', '/parent/add-child-code-active', 'Добавить ребенка / Код активен', 'Родитель', 'Add Child'),
  createScreen('parent.add-child.code-expired', '/parent/add-child-code-expired', 'Добавить ребенка / Код истек', 'Родитель', 'Add Child'),
  createScreen('parent.tasks.list', '/parent/tasks', 'Задания / Список', 'Родитель', 'Tasks'),
  createScreen('parent.tasks.create', '/parent/tasks-create', 'Задания / Создание', 'Родитель', 'Tasks'),
  createScreen('parent.tasks.edit', '/parent/tasks-edit', 'Задания / Редактирование', 'Родитель', 'Tasks'),
  createScreen('parent.tasks.delete-confirm', '/parent/tasks-delete-confirm', 'Задания / Удаление', 'Родитель', 'Tasks'),
  createScreen('parent.geo.in-zone', '/parent/geo-in-zone', 'Геолокация / В зоне', 'Родитель', 'Geo'),
  createScreen('parent.geo.out-of-zone', '/parent/geo-out-of-zone', 'Геолокация / Вне зоны', 'Родитель', 'Geo'),
  createScreen('parent.apps.list', '/parent/apps-list', 'Приложения / Список', 'Родитель', 'Apps'),
  createScreen('parent.apps.settings.limited', '/parent/app-settings-limited', 'Приложения / Ограничено', 'Родитель', 'Apps'),
  createScreen('parent.apps.settings.blocked', '/parent/app-settings-blocked', 'Приложения / Заблокировано', 'Родитель', 'Apps'),
  createScreen('parent.content.filter.default', '/parent/content-filter', 'Контент-фильтр', 'Родитель', 'Content'),
  createScreen('parent.profile.default', '/parent/profile', 'Профиль родителя', 'Родитель', 'Profiles'),
  createScreen('parent.child-profile.default', '/parent/child-profile', 'Профиль ребенка', 'Родитель', 'Profiles'),

  createScreen('child.home.default', '/child/home', 'Главный экран ребенка', 'Ребенок', 'Main'),
  createScreen('child.tasks.default', '/child/tasks', 'Задания ребенка', 'Ребенок', 'Main'),
  createScreen('child.rewards.default', '/child/rewards', 'Награды ребенка', 'Ребенок', 'Main'),
  createScreen('child.wishlist.default', '/child/wishlist', 'Wish List ребенка', 'Ребенок', 'Main'),
  createScreen('child.friends.default', '/child/friends', 'Друзья ребенка', 'Ребенок', 'Main'),

  createScreen('system.app-blocked', '/system/app-blocked', 'Системный экран / Приложение заблокировано', 'Система', 'System'),
  createScreen('system.site-blocked', '/system/site-blocked', 'Системный экран / Сайт заблокирован', 'Система', 'System'),
  createScreen('system.purchase-approval-required', '/system/purchase-approval-required', 'Системный экран / Нужен апрув', 'Система', 'System'),
  createScreen(
    'system.stop-child-onboarding',
    '/system/stop-child-onboarding',
    'Системный экран / Прервать онбординг ребенка',
    'Система',
    'System',
  ),
];

export const screenMeta = Object.fromEntries(screens.map((screen) => [screen.id, screen]));
export const screenMetaByPath = Object.fromEntries(screens.map((screen) => [screen.path, screen]));
