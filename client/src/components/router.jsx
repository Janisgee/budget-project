import { createBrowserRouter } from 'react-router-dom';
import Login from './Login';
import App from './App';
import Main from './Main';
import SignUp from './SignUp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
      {},
    ],
  },
]);
