import './App.css';
import NavBar from './NavBar.jsx';
import { Outlet } from 'react-router-dom';

// import Transaction from './Transaction.jsx';
// // import Overview from './Overview.jsx';
// import LoginNavBar from './LoginNavBar';
// import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />

      {/* <div className="walletPage">
        <div className="wallet-child-1">
          <LoginNavBar />
          <Overview />
          <Transaction />
        </div>
        <div className="wallet-child-2">
          <Profile />
        </div>
      </div> */}
    </div>
  );
}

export default App;
