import { screenMeta } from '../data/screenMeta';
import SplashLoading from '../screens/onboarding/SplashLoading';
import SplashError from '../screens/onboarding/SplashError';
import RoleSelectDefault from '../screens/onboarding/RoleSelectDefault';
import RegisterDefault from '../screens/auth-parent/RegisterDefault';
import RegisterInvalidEmail from '../screens/auth-parent/RegisterInvalidEmail';
import RegisterWeakPassword from '../screens/auth-parent/RegisterWeakPassword';
import RegisterPasswordMismatch from '../screens/auth-parent/RegisterPasswordMismatch';
import RegisterAlreadyExists from '../screens/auth-parent/RegisterAlreadyExists';
import RegisterLoading from '../screens/auth-parent/RegisterLoading';
import ConfirmCodeDefault from '../screens/auth-parent/ConfirmCodeDefault';
import ConfirmCodeWrong from '../screens/auth-parent/ConfirmCodeWrong';
import ConfirmCodeExpired from '../screens/auth-parent/ConfirmCodeExpired';
import ConfirmCodeSuccess from '../screens/auth-parent/ConfirmCodeSuccess';
import LoginDefault from '../screens/auth-parent/LoginDefault';
import LoginWrongPassword from '../screens/auth-parent/LoginWrongPassword';
import LoginUserNotFound from '../screens/auth-parent/LoginUserNotFound';
import LoginSuccess from '../screens/auth-parent/LoginSuccess';
import RestorePasswordDefault from '../screens/auth-parent/RestorePasswordDefault';
import RestorePasswordNotFound from '../screens/auth-parent/RestorePasswordNotFound';
import RestorePasswordSent from '../screens/auth-parent/RestorePasswordSent';
import ChildCodeDefault from '../screens/auth-child/ChildCodeDefault';
import ChildCodeWrong from '../screens/auth-child/ChildCodeWrong';
import ChildCodeExpired from '../screens/auth-child/ChildCodeExpired';
import ChildCodeSuccess from '../screens/auth-child/ChildCodeSuccess';
import AccessibilityPending from '../screens/child/onboarding/AccessibilityPending';
import AccessibilityDone from '../screens/child/onboarding/AccessibilityDone';
import DeleteProtectionPending from '../screens/child/onboarding/DeleteProtectionPending';
import DeleteProtectionDone from '../screens/child/onboarding/DeleteProtectionDone';
import NotificationsPending from '../screens/child/onboarding/NotificationsPending';
import NotificationsDone from '../screens/child/onboarding/NotificationsDone';
import BatteryPending from '../screens/child/onboarding/BatteryPending';
import BatteryDone from '../screens/child/onboarding/BatteryDone';
import LocationPending from '../screens/child/onboarding/LocationPending';
import LocationDone from '../screens/child/onboarding/LocationDone';
import ActivityPending from '../screens/child/onboarding/ActivityPending';
import ActivityDone from '../screens/child/onboarding/ActivityDone';
import PinPending from '../screens/child/onboarding/PinPending';
import PinDone from '../screens/child/onboarding/PinDone';
import LimitsPending from '../screens/child/onboarding/LimitsPending';
import LimitsDone from '../screens/child/onboarding/LimitsDone';
import DashboardNoChild from '../screens/parent/dashboard/DashboardNoChild';
import DashboardOnline from '../screens/parent/dashboard/DashboardOnline';
import DashboardOffline from '../screens/parent/dashboard/DashboardOffline';
import DashboardLimitExceeded from '../screens/parent/dashboard/DashboardLimitExceeded';
import AddChildIntro from '../screens/parent/add-child/AddChildIntro';
import AddChildCodeActive from '../screens/parent/add-child/AddChildCodeActive';
import AddChildCodeExpired from '../screens/parent/add-child/AddChildCodeExpired';
import TaskList from '../screens/parent/tasks/TaskList';
import TaskCreate from '../screens/parent/tasks/TaskCreate';
import TaskEdit from '../screens/parent/tasks/TaskEdit';
import TaskDeleteConfirm from '../screens/parent/tasks/TaskDeleteConfirm';
import GeoInZone from '../screens/parent/geo/GeoInZone';
import GeoOutOfZone from '../screens/parent/geo/GeoOutOfZone';
import AppsList from '../screens/parent/apps/AppsList';
import AppSettingsLimited from '../screens/parent/apps/AppSettingsLimited';
import AppSettingsBlocked from '../screens/parent/apps/AppSettingsBlocked';
import ContentFilterDefault from '../screens/parent/content/ContentFilterDefault';
import ParentProfile from '../screens/parent/parent-profile/ParentProfile';
import ChildProfile from '../screens/parent/child-profile/ChildProfile';
import ChildHome from '../screens/child/ChildHome';
import ChildTasks from '../screens/child/ChildTasks';
import ChildRewards from '../screens/child/ChildRewards';
import ChildWishlist from '../screens/child/ChildWishlist';
import ChildFriends from '../screens/child/ChildFriends';
import AppBlocked from '../screens/system/AppBlocked';
import SiteBlocked from '../screens/system/SiteBlocked';
import PurchaseApprovalRequired from '../screens/system/PurchaseApprovalRequired';
import StopChildOnboarding from '../screens/system/StopChildOnboarding';

export const routesConfig = [
  {
    ...screenMeta['onboarding.splash.loading'],
    component: SplashLoading,
  },
  {
    ...screenMeta['onboarding.splash.error'],
    component: SplashError,
  },
  {
    ...screenMeta['onboarding.role.default'],
    component: RoleSelectDefault,
  },
  {
    ...screenMeta['auth.parent.register.default'],
    component: RegisterDefault,
  },
  {
    ...screenMeta['auth.parent.register.invalid-email'],
    component: RegisterInvalidEmail,
  },
  {
    ...screenMeta['auth.parent.register.weak-password'],
    component: RegisterWeakPassword,
  },
  {
    ...screenMeta['auth.parent.register.password-mismatch'],
    component: RegisterPasswordMismatch,
  },
  {
    ...screenMeta['auth.parent.register.already-exists'],
    component: RegisterAlreadyExists,
  },
  {
    ...screenMeta['auth.parent.register.loading'],
    component: RegisterLoading,
  },
  {
    ...screenMeta['auth.parent.confirm.default'],
    component: ConfirmCodeDefault,
  },
  {
    ...screenMeta['auth.parent.confirm.wrong'],
    component: ConfirmCodeWrong,
  },
  {
    ...screenMeta['auth.parent.confirm.expired'],
    component: ConfirmCodeExpired,
  },
  {
    ...screenMeta['auth.parent.confirm.success'],
    component: ConfirmCodeSuccess,
  },
  {
    ...screenMeta['auth.parent.login.default'],
    component: LoginDefault,
  },
  {
    ...screenMeta['auth.parent.login.wrong-password'],
    component: LoginWrongPassword,
  },
  {
    ...screenMeta['auth.parent.login.user-not-found'],
    component: LoginUserNotFound,
  },
  {
    ...screenMeta['auth.parent.login.success'],
    component: LoginSuccess,
  },
  {
    ...screenMeta['auth.parent.restore.default'],
    component: RestorePasswordDefault,
  },
  {
    ...screenMeta['auth.parent.restore.not-found'],
    component: RestorePasswordNotFound,
  },
  {
    ...screenMeta['auth.parent.restore.sent'],
    component: RestorePasswordSent,
  },
  {
    ...screenMeta['auth.child.code.default'],
    component: ChildCodeDefault,
  },
  {
    ...screenMeta['auth.child.code.wrong'],
    component: ChildCodeWrong,
  },
  {
    ...screenMeta['auth.child.code.expired'],
    component: ChildCodeExpired,
  },
  {
    ...screenMeta['auth.child.code.success'],
    component: ChildCodeSuccess,
  },
  {
    ...screenMeta['child.onboarding.accessibility.pending'],
    component: AccessibilityPending,
  },
  {
    ...screenMeta['child.onboarding.accessibility.done'],
    component: AccessibilityDone,
  },
  {
    ...screenMeta['child.onboarding.delete-protection.pending'],
    component: DeleteProtectionPending,
  },
  {
    ...screenMeta['child.onboarding.delete-protection.done'],
    component: DeleteProtectionDone,
  },
  {
    ...screenMeta['child.onboarding.notifications.pending'],
    component: NotificationsPending,
  },
  {
    ...screenMeta['child.onboarding.notifications.done'],
    component: NotificationsDone,
  },
  {
    ...screenMeta['child.onboarding.battery.pending'],
    component: BatteryPending,
  },
  {
    ...screenMeta['child.onboarding.battery.done'],
    component: BatteryDone,
  },
  {
    ...screenMeta['child.onboarding.location.pending'],
    component: LocationPending,
  },
  {
    ...screenMeta['child.onboarding.location.done'],
    component: LocationDone,
  },
  {
    ...screenMeta['child.onboarding.activity.pending'],
    component: ActivityPending,
  },
  {
    ...screenMeta['child.onboarding.activity.done'],
    component: ActivityDone,
  },
  {
    ...screenMeta['child.onboarding.pin.pending'],
    component: PinPending,
  },
  {
    ...screenMeta['child.onboarding.pin.done'],
    component: PinDone,
  },
  {
    ...screenMeta['child.onboarding.limits.pending'],
    component: LimitsPending,
  },
  {
    ...screenMeta['child.onboarding.limits.done'],
    component: LimitsDone,
  },
  {
    ...screenMeta['parent.dashboard.no-child'],
    component: DashboardNoChild,
  },
  {
    ...screenMeta['parent.dashboard.online'],
    component: DashboardOnline,
  },
  {
    ...screenMeta['parent.dashboard.offline'],
    component: DashboardOffline,
  },
  {
    ...screenMeta['parent.dashboard.limit-exceeded'],
    component: DashboardLimitExceeded,
  },
  {
    ...screenMeta['parent.add-child.intro'],
    component: AddChildIntro,
  },
  {
    ...screenMeta['parent.add-child.code-active'],
    component: AddChildCodeActive,
  },
  {
    ...screenMeta['parent.add-child.code-expired'],
    component: AddChildCodeExpired,
  },
  {
    ...screenMeta['parent.tasks.list'],
    component: TaskList,
  },
  {
    ...screenMeta['parent.tasks.create'],
    component: TaskCreate,
  },
  {
    ...screenMeta['parent.tasks.edit'],
    component: TaskEdit,
  },
  {
    ...screenMeta['parent.tasks.delete-confirm'],
    component: TaskDeleteConfirm,
  },
  {
    ...screenMeta['parent.geo.in-zone'],
    component: GeoInZone,
  },
  {
    ...screenMeta['parent.geo.out-of-zone'],
    component: GeoOutOfZone,
  },
  {
    ...screenMeta['parent.apps.list'],
    component: AppsList,
  },
  {
    ...screenMeta['parent.apps.settings.limited'],
    component: AppSettingsLimited,
  },
  {
    ...screenMeta['parent.apps.settings.blocked'],
    component: AppSettingsBlocked,
  },
  {
    ...screenMeta['parent.content.filter.default'],
    component: ContentFilterDefault,
  },
  {
    ...screenMeta['parent.profile.default'],
    component: ParentProfile,
  },
  {
    ...screenMeta['parent.child-profile.default'],
    component: ChildProfile,
  },
  {
    ...screenMeta['child.home.default'],
    component: ChildHome,
  },
  {
    ...screenMeta['child.tasks.default'],
    component: ChildTasks,
  },
  {
    ...screenMeta['child.rewards.default'],
    component: ChildRewards,
  },
  {
    ...screenMeta['child.wishlist.default'],
    component: ChildWishlist,
  },
  {
    ...screenMeta['child.friends.default'],
    component: ChildFriends,
  },
  {
    ...screenMeta['system.app-blocked'],
    component: AppBlocked,
  },
  {
    ...screenMeta['system.site-blocked'],
    component: SiteBlocked,
  },
  {
    ...screenMeta['system.purchase-approval-required'],
    component: PurchaseApprovalRequired,
  },
  {
    ...screenMeta['system.stop-child-onboarding'],
    component: StopChildOnboarding,
  },
];
