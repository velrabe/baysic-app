export const navigation = [
  {
    label: 'Онбординг',
    items: [
      {
        label: 'Загрузка',
        items: [
          { id: 'onboarding.splash.loading', title: 'Экран загрузки', path: '/onboarding/splash-loading' },
          { id: 'onboarding.splash.error', title: 'Ошибка сети', path: '/onboarding/splash-error' },
        ],
      },
      {
        label: 'Выбор роли',
        items: [
          { id: 'onboarding.role.default', title: 'Базовый экран', path: '/onboarding/role-select' },
        ],
      },
    ],
  },
  {
    label: 'Авторизация родителя',
    items: [
      {
        label: 'Регистрация',
        items: [
          { id: 'auth.parent.register.default', title: 'Обычная форма', path: '/auth-parent/register' },
          { id: 'auth.parent.register.invalid-email', title: 'Неверный email', path: '/auth-parent/register-invalid-email' },
          { id: 'auth.parent.register.weak-password', title: 'Слабый пароль', path: '/auth-parent/register-weak-password' },
          { id: 'auth.parent.register.password-mismatch', title: 'Пароли не совпадают', path: '/auth-parent/register-password-mismatch' },
          { id: 'auth.parent.register.already-exists', title: 'Аккаунт уже существует', path: '/auth-parent/register-already-exists' },
          { id: 'auth.parent.register.loading', title: 'Состояние загрузки', path: '/auth-parent/register-loading' },
        ],
      },
      {
        label: 'Подтверждение',
        items: [
          { id: 'auth.parent.confirm.default', title: 'Код подтверждения', path: '/auth-parent/confirm-code' },
          { id: 'auth.parent.confirm.wrong', title: 'Неверный код', path: '/auth-parent/confirm-code-wrong' },
          { id: 'auth.parent.confirm.expired', title: 'Код истек', path: '/auth-parent/confirm-code-expired' },
          { id: 'auth.parent.confirm.success', title: 'Успешное подтверждение', path: '/auth-parent/confirm-code-success' },
        ],
      },
      {
        label: 'Вход',
        items: [
          { id: 'auth.parent.login.default', title: 'Обычный вход', path: '/auth-parent/login' },
          { id: 'auth.parent.login.wrong-password', title: 'Неверный пароль', path: '/auth-parent/login-wrong-password' },
          { id: 'auth.parent.login.user-not-found', title: 'Пользователь не найден', path: '/auth-parent/login-user-not-found' },
          { id: 'auth.parent.login.success', title: 'Успешный вход', path: '/auth-parent/login-success' },
        ],
      },
      {
        label: 'Восстановление',
        items: [
          { id: 'auth.parent.restore.default', title: 'Форма восстановления', path: '/auth-parent/restore-password' },
          { id: 'auth.parent.restore.not-found', title: 'Email не найден', path: '/auth-parent/restore-password-not-found' },
          { id: 'auth.parent.restore.sent', title: 'Письмо отправлено', path: '/auth-parent/restore-password-sent' },
        ],
      },
    ],
  },
  {
    label: 'Авторизация ребенка',
    items: [
      {
        label: 'Ввод кода',
        items: [
          { id: 'auth.child.code.default', title: 'Базовый экран', path: '/auth-child/code' },
          { id: 'auth.child.code.wrong', title: 'Неверный код', path: '/auth-child/code-wrong' },
          { id: 'auth.child.code.expired', title: 'Код истек', path: '/auth-child/code-expired' },
          { id: 'auth.child.code.success', title: 'Код принят', path: '/auth-child/code-success' },
        ],
      },
    ],
  },
  {
    label: 'Онбординг разрешений',
    items: [
      {
        label: 'Accessibility',
        items: [
          { id: 'child.onboarding.accessibility.pending', title: 'Accessibility', path: '/child/onboarding/accessibility' },
          { id: 'child.onboarding.accessibility.done', title: 'Accessibility / выдано', path: '/child/onboarding/accessibility-done' },
        ],
      },
      {
        label: 'Защита от удаления',
        items: [
          { id: 'child.onboarding.delete-protection.pending', title: 'Защита от удаления', path: '/child/onboarding/delete-protection' },
          { id: 'child.onboarding.delete-protection.done', title: 'Защита от удаления / выдано', path: '/child/onboarding/delete-protection-done' },
        ],
      },
      {
        label: 'Уведомления',
        items: [
          { id: 'child.onboarding.notifications.pending', title: 'Уведомления', path: '/child/onboarding/notifications' },
          { id: 'child.onboarding.notifications.done', title: 'Уведомления / выдано', path: '/child/onboarding/notifications-done' },
        ],
      },
      {
        label: 'Батарея',
        items: [
          { id: 'child.onboarding.battery.pending', title: 'Батарея', path: '/child/onboarding/battery' },
          { id: 'child.onboarding.battery.done', title: 'Батарея / выдано', path: '/child/onboarding/battery-done' },
        ],
      },
      {
        label: 'Геолокация',
        items: [
          { id: 'child.onboarding.location.pending', title: 'Геолокация', path: '/child/onboarding/location' },
          { id: 'child.onboarding.location.done', title: 'Геолокация / выдано', path: '/child/onboarding/location-done' },
        ],
      },
      {
        label: 'Физическая активность',
        items: [
          { id: 'child.onboarding.activity.pending', title: 'Физическая активность', path: '/child/onboarding/activity' },
          { id: 'child.onboarding.activity.done', title: 'Физическая активность / выдано', path: '/child/onboarding/activity-done' },
        ],
      },
      {
        label: 'Ограничения',
        items: [
          { id: 'child.onboarding.limits.pending', title: 'Ограничения', path: '/child/onboarding/limits' },
          { id: 'child.onboarding.limits.done', title: 'Ограничения / выдано', path: '/child/onboarding/limits-done' },
        ],
      },
      {
        label: 'Пин-код',
        items: [
          { id: 'child.onboarding.pin.pending', title: 'Пин-код', path: '/child/onboarding/pin' },
          { id: 'child.onboarding.pin.done', title: 'Пин-код / выдано', path: '/child/onboarding/pin-done' },
        ],
      },
    ],
  },
  {
    label: 'Родитель',
    items: [
      {
        label: 'Дом',
        items: [
          { id: 'parent.dashboard.no-child', title: 'Нет ребенка', path: '/parent/dashboard-no-child' },
          { id: 'parent.dashboard.online', title: 'Ребенок онлайн', path: '/parent/dashboard-online' },
          { id: 'parent.dashboard.offline', title: 'Ребенок офлайн', path: '/parent/dashboard-offline' },
          { id: 'parent.dashboard.limit-exceeded', title: 'Лимит превышен', path: '/parent/dashboard-limit-exceeded' },
        ],
      },
      {
        label: 'Добавление ребенка',
        items: [
          { id: 'parent.add-child.intro', title: 'Экран добавления', path: '/parent/add-child-intro' },
          { id: 'parent.add-child.code-active', title: 'Код активен', path: '/parent/add-child-code-active' },
          { id: 'parent.add-child.code-expired', title: 'Код истек', path: '/parent/add-child-code-expired' },
        ],
      },
      {
        label: 'Задания',
        items: [
          { id: 'parent.tasks.list', title: 'Список задач', path: '/parent/tasks' },
          { id: 'parent.tasks.create', title: 'Создание задачи', path: '/parent/tasks-create' },
          { id: 'parent.tasks.edit', title: 'Редактирование задачи', path: '/parent/tasks-edit' },
          { id: 'parent.tasks.delete-confirm', title: 'Подтверждение удаления', path: '/parent/tasks-delete-confirm' },
        ],
      },
      {
        label: 'Геолокация',
        items: [
          { id: 'parent.geo.in-zone', title: 'Ребенок в зоне', path: '/parent/geo-in-zone' },
          { id: 'parent.geo.out-of-zone', title: 'Ребенок вне зоны', path: '/parent/geo-out-of-zone' },
        ],
      },
      {
        label: 'Приложения',
        items: [
          { id: 'parent.apps.list', title: 'Список приложений', path: '/parent/apps-list' },
          { id: 'parent.apps.settings.limited', title: 'Ограниченное приложение', path: '/parent/app-settings-limited' },
          { id: 'parent.apps.settings.blocked', title: 'Заблокированное приложение', path: '/parent/app-settings-blocked' },
        ],
      },
      {
        label: 'Контент',
        items: [
          { id: 'parent.content.filter.default', title: 'Контент-фильтр', path: '/parent/content-filter' },
        ],
      },
      {
        label: 'Профили',
        items: [
          { id: 'parent.profile.default', title: 'Профиль родителя', path: '/parent/profile' },
          { id: 'parent.child-profile.default', title: 'Профиль ребенка', path: '/parent/child-profile' },
        ],
      },
    ],
  },
  {
    label: 'Ребенок',
    items: [
      {
        label: 'Приложение ребенка',
        items: [
          { id: 'child.home.default', title: 'Главный экран', path: '/child/home' },
          { id: 'child.tasks.default', title: 'Задания', path: '/child/tasks' },
          { id: 'child.rewards.default', title: 'Награды', path: '/child/rewards' },
          { id: 'child.wishlist.default', title: 'Wish List', path: '/child/wishlist' },
          { id: 'child.friends.default', title: 'Друзья', path: '/child/friends' },
        ],
      },
    ],
  },
  {
    label: 'Система',
    items: [
      {
        label: 'Системные блокировки',
        items: [
          { id: 'system.app-blocked', title: 'Приложение заблокировано', path: '/system/app-blocked' },
          { id: 'system.site-blocked', title: 'Сайт заблокирован', path: '/system/site-blocked' },
          { id: 'system.purchase-approval-required', title: 'Покупка требует разрешения', path: '/system/purchase-approval-required' },
          { id: 'system.stop-child-onboarding', title: 'Прервать онбординг ребенка', path: '/system/stop-child-onboarding' },
        ],
      },
    ],
  },
];
