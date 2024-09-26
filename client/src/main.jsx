import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './layout/Layout';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { store } from './utils/srore';
import { Provider } from 'react-redux';

const Dashboards = lazy(() => import('./pages/Dashboards/Dashboards'));
const Tables = lazy(() => import('./pages/Tables/Tables'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/dashboards',
        element: <Dashboards />,
      },
      {
        path: '/tables',
        element: <Tables />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
