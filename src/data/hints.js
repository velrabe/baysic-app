const makeHint = (title, items) => ({ title, items });

const permissionHints = {
  title: 'Что делать на этом шаге',
  items: [
    'Сначала смотрите pending-состояние.',
    'После нажатия основной кнопки открывается экран "разрешение выдано".',
    'Следующий шаг становится доступен по основной кнопке success-состояния.',
  ],
};

export const hints = {
  'onboarding.splash.loading': makeHint('Поведение экрана', [
    'Экран загрузки; при отсутствии интернета появляется ошибка сети (и кнопка должна быть интерактивной с переходом на соответствующий экран ошибки).',
  ]),
  'onboarding.splash.error': makeHint('Поведение экрана', [
    'Кнопка "Повторить" возвращает в загрузку.',
    'Основной CTA прижат к нижней части экрана.',
  ]),
  'onboarding.role.default': makeHint('Куда ведут кнопки', [
    'Нажмите "Выбрать роль" у взрослого, чтобы открыть регистрацию родителя.',
    'Нажмите "Выбрать роль" у ребенка, чтобы открыть авторизацию по коду.',
    'Подзаголовок сценария вынесен в UX hints и не показывается в самом экране.',
  ]),

  'auth.parent.register.default': makeHint('Тестовые данные', [
    'Имя: Иван',
    'Email: ivan123@gmail.com',
    'Пароль: 12345678',
    'Нажмите "Создать аккаунт".',
  ]),
  'auth.parent.register.invalid-email': makeHint('Как попасть в это состояние', [
    'Введите email: anna@',
    'Остальные поля оставьте валидными.',
    'Нажмите "Создать аккаунт".',
  ]),
  'auth.parent.register.weak-password': makeHint('Как попасть в это состояние', [
    'Введите пароль: 1234',
    'Нажмите "Создать аккаунт".',
  ]),
  'auth.parent.register.password-mismatch': makeHint('Как попасть в это состояние', [
    'Введите повтор пароля: 87654321',
    'Нажмите "Создать аккаунт".',
  ]),
  'auth.parent.register.already-exists': makeHint('Как попасть в это состояние', [
    'Введите email: anna@baysic.ru',
    'Нажмите "Создать аккаунт".',
  ]),
  'auth.parent.register.loading': makeHint('Что здесь происходит', [
    'Это loading-состояние после валидной формы.',
    'Основная кнопка disabled и показывает shimmer.',
    'Дальше сценарий ведет к подтверждению кода.',
  ]),

  'auth.parent.confirm.default': makeHint('Тестовый код', [
    'Корректный код: 246810',
    'Кнопка "Подтвердить" ведет на success.',
    'Снизу есть ссылка "Войдите" для уже зарегистрированных.',
  ]),
  'auth.parent.confirm.wrong': makeHint('Как триггернуть', [
    'Введите код: 1111',
    'Нажмите "Подтвердить".',
  ]),
  'auth.parent.confirm.expired': makeHint('Как триггернуть', [
    'Введите код: 000000',
    'Или откройте этот экран через sidebar.',
  ]),
  'auth.parent.confirm.success': makeHint('Следующий переход', [
    'Экран показывает короткое success/loading-состояние.',
    'Через 1-2 секунды сценарий автоматически уводит в следующий экран.',
  ]),

  'auth.parent.login.default': makeHint('Тестовый вход', [
    'Email: ivan123@gmail.com',
    'Пароль: 12345678',
    'Кнопка ведет на success.',
  ]),
  'auth.parent.login.wrong-password': makeHint('Как триггернуть', [
    'Пароль: 1234',
    'Нажмите "Войти".',
  ]),
  'auth.parent.login.user-not-found': makeHint('Как триггернуть', [
    'Email: ghost@baysic.ru',
    'Нажмите "Войти".',
  ]),
  'auth.parent.login.success': makeHint('Что дальше', [
    'После успешного входа открывайте dashboard или профиль.',
  ]),

  'auth.parent.restore.default': makeHint('Тестовый сценарий', [
    'Введите валидный email и нажмите "Восстановить".',
  ]),
  'auth.parent.restore.not-found': makeHint('Как триггернуть', [
    'Введите email: none@baysic.ru',
    'Нажмите "Восстановить".',
  ]),
  'auth.parent.restore.sent': makeHint('Что дальше', [
    'Письмо отправлено.',
    'Можно вернуться ко входу.',
  ]),

  'auth.child.code.default': makeHint('Тестовый код ребенка', [
    'Корректный код: 123456',
    'После success открывается child-onboarding разрешений.',
  ]),
  'auth.child.code.wrong': makeHint('Как триггернуть', [
    'Введите любой неверный код из 6 цифр.',
    'Нажмите "Войти".',
  ]),
  'auth.child.code.expired': makeHint('Как триггернуть', [
    'Введите код: 111111.',
    'Тап по любому полю сбрасывает экран обратно в базовый ввод.',
  ]),
  'auth.child.code.success': makeHint('Что будет дальше', [
    'Это промежуточный success-экран, когда код введен корректно.',
    'Кнопка "Войти" disabled и показывает shimmer как состояние загрузки.',
    'После проверки кода сценарий ведет либо на первый шаг онбординга ребенка (разрешения), либо сразу на главный экран ребенка, если онбординг уже был пройден.',
    'Для навигации в прототипе используйте экраны "Онбординг ребенка / Accessibility / До выдачи" и "Главный экран ребенка" в левом сайдбаре.',
  ]),

  'child.onboarding.accessibility.pending': permissionHints,
  'child.onboarding.accessibility.done': permissionHints,
  'child.onboarding.delete-protection.pending': permissionHints,
  'child.onboarding.delete-protection.done': permissionHints,
  'child.onboarding.notifications.pending': permissionHints,
  'child.onboarding.notifications.done': permissionHints,
  'child.onboarding.battery.pending': permissionHints,
  'child.onboarding.battery.done': permissionHints,
  'child.onboarding.location.pending': permissionHints,
  'child.onboarding.location.done': permissionHints,
  'child.onboarding.activity.pending': permissionHints,
  'child.onboarding.activity.done': permissionHints,
  'child.onboarding.pin.pending': permissionHints,
  'child.onboarding.pin.done': permissionHints,
  'child.onboarding.limits.pending': permissionHints,
  'child.onboarding.limits.done': permissionHints,

  'parent.dashboard.no-child': makeHint('Поведение', [
    'Этот экран показывается до привязки ребенка.',
    'Кнопка ведет в сценарий добавления ребенка.',
  ]),
  'parent.dashboard.online': makeHint('Поведение', [
    'Верхний child-switcher переключает сценарии между детьми.',
    'Нижняя навигация синхронизирована с разделами родителя.',
  ]),
  'parent.dashboard.offline': makeHint('Поведение', [
    'Статичное состояние, когда устройство ребенка офлайн.',
  ]),
  'parent.dashboard.limit-exceeded': makeHint('Поведение', [
    'Статичное состояние, когда дневной лимит экранного времени исчерпан.',
  ]),
  'parent.add-child.intro': makeHint('Поведение', [
    'Нажмите "Получить код", чтобы открыть активный код.',
  ]),
  'parent.add-child.code-active': makeHint('Тестовый код', [
    'Передайте ребенку код: 123-456.',
    'Следующий сценарий у ребенка: авторизация по коду.',
  ]),
  'parent.add-child.code-expired': makeHint('Поведение', [
    'Код истек, нужен повторный выпуск.',
  ]),
  'parent.tasks.list': makeHint('Поведение', [
    'Список задач показывает существующие сценарии.',
    'Кнопка ведет к созданию новой задачи.',
  ]),
  'parent.tasks.create': makeHint('Поля прототипа', [
    'Название, описание, стоимость, валюта, дата, повторение.',
    'Это статичный экран без сохранения.',
  ]),
  'parent.tasks.edit': makeHint('Поведение', [
    'Экран показывает редактирование существующей задачи.',
  ]),
  'parent.tasks.delete-confirm': makeHint('Поведение', [
    'Это состояние подтверждения удаления задачи.',
  ]),
  'parent.geo.in-zone': makeHint('Поведение', [
    'Ребенок находится внутри доверенной зоны.',
  ]),
  'parent.geo.out-of-zone': makeHint('Поведение', [
    'Ребенок покинул доверенную зону.',
  ]),
  'parent.apps.list': makeHint('Поведение', [
    'Откройте YouTube, чтобы увидеть ограниченный сценарий.',
    'Через sidebar можно перейти к blocked-состоянию.',
  ]),
  'parent.apps.settings.limited': makeHint('Поведение', [
    'Лимит и расписание заданы статично.',
  ]),
  'parent.apps.settings.blocked': makeHint('Поведение', [
    'Приложение полностью заблокировано.',
  ]),
  'parent.content.filter.default': makeHint('Поведение', [
    'Экран показывает фильтры категорий контента и уровень защиты.',
  ]),
  'parent.profile.default': makeHint('Поведение', [
    'Профиль родителя содержит подписку, уведомления и семейные связи.',
  ]),
  'parent.child-profile.default': makeHint('Поведение', [
    'Профиль ребенка показывает привычки, класс и цель.',
  ]),

  'child.home.default': makeHint('Поведение', [
    'Главный экран ребенка открывается только после child-onboarding.',
  ]),
  'child.tasks.default': makeHint('Поведение', [
    'Список заданий ребенка статичный.',
  ]),
  'child.rewards.default': makeHint('Поведение', [
    'Экран наград ведет дальше в Wish List.',
  ]),
  'child.wishlist.default': makeHint('Поведение', [
    'Здесь отображаются желания ребенка и прогресс накопления.',
  ]),
  'child.friends.default': makeHint('Поведение', [
    'Экран демонстрирует друзей, чат и сравнение баллов.',
  ]),

  'system.app-blocked': makeHint('Поведение', [
    'Ребенок видит этот экран при блокировке приложения.',
  ]),
  'system.site-blocked': makeHint('Поведение', [
    'Ребенок может отправить запрос доступа к сайту.',
  ]),
  'system.purchase-approval-required': makeHint('Поведение', [
    'Покупка требует подтверждения родителя.',
  ]),
  'system.stop-child-onboarding': makeHint('Поведение', [
    'Служебная модалка, которая открывается из первого шага онбординга разрешений.',
    'Кнопка "Да, войти как родитель" переводит в сценарий авторизации родителя.',
    'Кнопка "Нет, продолжить онбординг" и крестик закрытия возвращают на шаг Accessibility.',
  ]),
};
