import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { routesConfig } from './routesConfig';

const basename = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL.slice(0, -1)
  : import.meta.env.BASE_URL;

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
        ...routesConfig.map(({ path, component: Component }) => ({
          path,
          element: <Component />,
        })),
      ],
    },
  ],
  {
    basename,
  },
);

export default router;
