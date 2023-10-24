import { useState } from 'react';
import './App.css';
import NavBarAfterLogin from './NavBarAfterLogin.jsx';
import { Outlet } from 'react-router-dom';
import Profile from './Profile';

function AppAfterLogin() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <div className="walletPage">
        <div className="wallet-child-1">
          <NavBarAfterLogin toggle={toggle} ontoggle={setToggle} />
          <Outlet />
        </div>
        <div className="wallet-child-2">
          <Profile toggle={toggle} />
        </div>
      </div>
    </div>
  );
}

export default AppAfterLogin;
