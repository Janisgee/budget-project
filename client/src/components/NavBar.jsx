import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

import './css/btn.css';
import { checkIsLoggedIn } from '../js/api-service';

export default function NavBar() {
  const { getLoginUserData } = useAuth();
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await checkIsLoggedIn();
      console.log(response.status);
      if (response.status === 'success') {
        const userData = response.data.user;
        console.log(userData);
        getLoginUserData(userData);
        navigate('/user/overview');
      }
    } catch (err) {
      navigate('/login');
    }
  }

  function handleSignup(e) {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <nav className="navbar flex-space-between">
      <a href="/" className="link">
        <div className="logo">💰Money Tracker</div>
      </a>
      <div className="btn-group">
        <button className="btn btn-login" onClick={handleLogin}>
          Login
        </button>

        <button className="btn btn-signup" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </nav>
  );
}
