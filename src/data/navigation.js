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
        label: 'Дом-один ребенок',
        items: [
          { id: 'parent.dashboard.single-child.4', title: 'Один ребенок 4 задачи', path: '/parent/dashboard-single-child/0?tasks=4' },
          { id: 'parent.dashboard.single-child.8', title: 'Один ребенок 8 задач', path: '/parent/dashboard-single-child/0?tasks=8' },
        ],
      },
      {
        label: 'Дом-несколько детей',
        items: [
          { id: 'parent.dashboard.online.main', title: 'Дашборд', path: '/parent/dashboard-online' },
          { id: 'parent.dashboard.online.blocked', title: 'Несколько детей / блок', path: '/parent/dashboard-online?blocked=0' },
          { id: 'parent.child-profile.0', title: 'Профиль Миши', path: '/parent/child-profile/0' },
          { id: 'parent.child-profile.1', title: 'Профиль Ани', path: '/parent/child-profile/1' },
          { id: 'parent.child-profile.2', title: 'Профиль Лёвы', path: '/parent/child-profile/2' },
        ],
      },
      {
        label: 'Дом-нет ребенка',
        items: [
          { id: 'parent.dashboard.no-child', title: 'Нет ребенка', path: '/parent/dashboard-no-child' },
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
          { id: 'parent.tasks.no-child', title: 'Нет ребенка', path: '/parent/tasks-no-child' },
          { id: 'parent.tasks.single-child', title: 'Один ребенок', path: '/parent/tasks-single-child' },
          { id: 'parent.tasks.multi', title: 'Несколько детей', path: '/parent/tasks-multi' },
        ],
      },
      {
        label: 'Создание задачи',
        items: [
          { id: 'parent.tasks.create', title: 'Один ребенок', path: '/parent/tasks-create' },
          { id: 'parent.tasks.create-multi', title: 'Несколько детей', path: '/parent/tasks-create-multi' },
        ],
      },
      {
        label: 'Редактирование и расписание',
        items: [
          { id: 'parent.tasks.edit', title: 'Редактирование задачи', path: '/parent/tasks-edit' },
          { id: 'parent.schedule.default', title: 'Расписание', path: '/parent/schedule' },
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
        label: 'Контент',
        items: [
          { id: 'parent.apps.list', title: 'Список приложений', path: '/parent/apps-list' },
          { id: 'parent.apps.list.search', title: 'Список приложений / поиск по названию', path: '/parent/apps-list-search' },
          { id: 'parent.apps.list.status-allowed', title: 'Список приложений / статус: Разрешенные', path: '/parent/apps-list-allowed' },
          { id: 'parent.apps.list.status-limited', title: 'Список приложений / статус: Ограниченные', path: '/parent/apps-list-limited' },
          { id: 'parent.apps.list.status-blocked', title: 'Список приложений / статус: Заблокированные', path: '/parent/apps-list-blocked' },
          { id: 'parent.apps.list.new', title: 'Список приложений / новые приложения', path: '/parent/apps-list-new' },
          { id: 'parent.apps.settings.limited', title: 'Приложение: Ограничено', path: '/parent/app-settings-limited' },
          { id: 'parent.apps.settings.blocked', title: 'Приложение: Заблокировано', path: '/parent/app-settings-blocked' },
          { id: 'parent.apps.settings.general', title: 'Настройка приложений', path: '/parent/apps-settings' },
          { id: 'parent.content.filter.default', title: 'Настройка контента', path: '/parent/content-filter' },
          { id: 'parent.content.sites', title: 'Списки сайтов', path: '/parent/content-sites' },
          { id: 'parent.content.purchases', title: 'Покупки', path: '/parent/content-purchases' },
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
        label: 'Главная',
        items: [{ id: 'child.home.default', title: 'Главный экран', path: '/child/home' }],
      },
      {
        label: 'Задания',
        items: [{ id: 'child.tasks.default', title: 'Задания', path: '/child/tasks' }],
      },
      {
        label: 'Награды',
        items: [
          { id: 'child.rewards.default', title: 'Награды', path: '/child/rewards' },
          { id: 'child.wishlist.default', title: 'Wish List', path: '/child/wishlist' },
        ],
      },
      {
        label: 'Друзья',
        items: [{ id: 'child.friends.default', title: 'Друзья', path: '/child/friends' }],
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
