import './App.css';
// import Main from './Main';
// import Login from './Login';
// import SignUp from './SignUp';
// import NavBar from './NavBar.js';

import Overview from './Overview.jsx';
import LoginNavBar from './LoginNavBar';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      {/* <Main /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}

      <div className="walletPage">
        <div className="wallet-child-1">
          <LoginNavBar />
          <Overview />
        </div>
        <div className="wallet-child-2">
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default App;
