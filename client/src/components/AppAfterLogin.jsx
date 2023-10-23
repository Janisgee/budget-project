import './App.css';
import NavBarAfterLogin from './NavBarAfterLogin.jsx';
import { Outlet } from 'react-router-dom';
import Profile from './Profile';

function AppAfterLogin() {
  return (
    <div className="App">
      <div className="walletPage">
        <div className="wallet-child-1">
          <NavBarAfterLogin />
          <Outlet />
        </div>
        <div className="wallet-child-2">
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default AppAfterLogin;
