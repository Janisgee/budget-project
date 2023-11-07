import { createBrowserRouter } from 'react-router-dom';

import AppBeforeLogin from './AppBeforeLogin';
import Login from './Login';
import Main from './Main';
import SignUp from './SignUp';
import ErrorPage from './ErrorPageBeforeLogin';

import AppAfterLogin from './AppAfterLogin';
import Overview from './Overview.jsx';
import Transaction from './Transaction.jsx';
import Setting from './Setting.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppBeforeLogin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/',
        element: <Main />,
      },
    ],
  },
  {
    path: '/user',
    element: <AppAfterLogin />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/user/overview', element: <Overview /> },
      { path: '/user/transaction', element: <Transaction /> },
      { path: '/user/setting', element: <Setting /> },
    ],
  },
]);
