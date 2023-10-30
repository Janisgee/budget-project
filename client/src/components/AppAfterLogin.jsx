import { useState } from 'react';
import './App.css';
import NavBarAfterLogin from './NavBarAfterLogin.jsx';
import { Outlet } from 'react-router-dom';
import Profile from './Profile';

// import { getAllTransactions } from '../js/api-service';
import { OverviewProvider } from '../contexts/overviewContext';
import { TransactionProvider } from '../contexts/transactionContext';
import { ModalProvider } from '../contexts/modalContext';

function AppAfterLogin() {
  const [toggle, setToggle] = useState(true);

  return (
    <OverviewProvider>
      <div className="App">
        <div className="walletPage">
          <div className="wallet-child-1">
            <NavBarAfterLogin toggle={toggle} ontoggle={setToggle} />
            <TransactionProvider>
              <ModalProvider>
                <Outlet />
              </ModalProvider>
            </TransactionProvider>
          </div>
          <div className="wallet-child-2">
            <Profile toggle={toggle} />
          </div>
        </div>
      </div>
    </OverviewProvider>
  );
}

export default AppAfterLogin;
