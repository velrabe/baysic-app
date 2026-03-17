import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { routesConfig } from './routesConfig';
import ChildProfileDetail from '../screens/parent/child-profile/ChildProfileDetail';
import ChildProfileEdit from '../screens/parent/child-profile/ChildProfileEdit';
import ChildAnalytics from '../screens/parent/analytics/ChildAnalytics';
import DashboardSingleChild from '../screens/parent/dashboard/DashboardSingleChild';

const base = import.meta.env.BASE_URL;
const basename = base === '/' || base === '' ? undefined : base.replace(/\/$/, '');

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Navigate to="/onboarding/splash-loading" replace />,
        },
        {
          path: '/parent/child-profile/:childId',
          element: <ChildProfileDetail />,
        },
        {
          path: '/parent/child-profile/:childId/edit',
          element: <ChildProfileEdit />,
        },
        {
          path: '/parent/analytics/:childId',
          element: <ChildAnalytics />,
        },
        {
          path: '/parent/dashboard-single-child/:childId',
          element: <DashboardSingleChild />,
        },
        ...routesConfig.map(({ path, component: Component }) => ({
          path,
          element: <Component />,
        })),
      ],
    },
  ],
  basename !== undefined ? { basename } : {},
);

export default router;
