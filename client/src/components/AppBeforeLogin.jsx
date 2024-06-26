import './App.css';
import NavBar from './NavBar.jsx';
import { Outlet } from 'react-router-dom';

function AppBeforeLogin() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default AppBeforeLogin;
