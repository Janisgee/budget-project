import { createBrowserRouter, redirect, Navigate } from 'react-router-dom';

import AppBeforeLogin from './AppBeforeLogin';
import Login from './Login';
import Main from './Main';
import SignUp from './SignUp';
import ErrorPage from './ErrorPageBeforeLogin';

import AppAfterLogin from './AppAfterLogin';
import Overview from './Overview.jsx';
import Transaction from './Transaction.jsx';
import Setting from './Setting.jsx';
import { checkIsLoggedIn } from '../js/api-service';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppBeforeLogin />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: '',
        element: <Main />,
      },
    ],
  },
  {
    path: '/user',
    element: <AppAfterLogin />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const me = await checkIsLoggedIn();
      if (me) {
        return me.data.user;
      } else {
        return redirect('/login');
      }
    },
    children: [
      { path: 'overview', element: <Overview /> },
      { path: 'transaction', element: <Transaction /> },
      { path: 'setting', element: <Setting /> },
      {
        path: '',
        element: <Navigate to="/user/overview" replace={true} />,
      },
    ],
  },
]);
