import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import { routesConfig } from './routesConfig';

const router = createBrowserRouter([
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
]);

export default router;
