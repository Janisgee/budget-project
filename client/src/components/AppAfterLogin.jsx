import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import './App.css';
import NavBarAfterLogin from './NavBarAfterLogin.jsx';
import { Outlet, useLoaderData } from 'react-router-dom';
import Profile from './Profile';

// import { getAllTransactions } from '../js/api-service';
import { OverviewProvider } from '../contexts/overviewContext';
import { TransactionProvider } from '../contexts/transactionContext';
import { ModalProvider } from '../contexts/modalContext';

function AppAfterLogin() {
  const { getLoginUserData } = useAuth();
  const [toggle, setToggle] = useState('Overview');
  const user = useLoaderData();
  console.log(user);

  useEffect(() => {
    getLoginUserData(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OverviewProvider>
      <TransactionProvider>
        <div className="App">
          <div className="walletPage">
            <div className="wallet-child-1">
              <NavBarAfterLogin toggle={toggle} ontoggle={setToggle} />
              <ModalProvider>
                <Outlet />
              </ModalProvider>
            </div>
            <div className="wallet-child-2">
              <Profile toggle={toggle} />
            </div>
          </div>
        </div>
      </TransactionProvider>
    </OverviewProvider>
  );
}

export default AppAfterLogin;
