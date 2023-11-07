import './css/btn.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../js/api-service';
import { useAuth } from '../contexts/authContext';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function NavBarAfterLogin({ toggle, ontoggle }) {
  const { logoutUserData } = useAuth();
  const navigate = useNavigate();

  const handleToggleChange = (e) => {
    if (e.target.textContent === 'Overview') {
      ontoggle('Overview');
    } else if (e.target.textContent === 'Transaction') {
      ontoggle('Transaction');
    } else {
      ontoggle('Setting');
    }
  };

  function handleLogout(e) {
    e.preventDefault();
    logout();
    logoutUserData();
    navigate('/');
  }
  return (
    <nav className="navBarAfterLogin">
      <Link to="/user/overview" className="logo navLink link">
        💰Money Tracker
      </Link>
      <div className="btn-group">
        <Link
          to="/user/overview"
          className={
            toggle === 'Overview'
              ? 'link btn-overview active'
              : 'link btn-overview'
          }
          onClick={(e) => handleToggleChange(e)}
        >
          Overview
        </Link>
        <Link
          to="/user/transaction"
          className={
            toggle === 'Transaction'
              ? 'link btn-overview active'
              : 'link btn-overview'
          }
          onClick={(e) => handleToggleChange(e)}
        >
          Transaction
        </Link>
        <Link
          to="/user/setting"
          className="settingButton"
          onClick={(e) => handleToggleChange(e)}
        >
          <FontAwesomeIcon icon={faGear} />
        </Link>
        <button className="link btn" onClick={handleLogout}>
          Log&nbsp;Out
        </button>
      </div>
    </nav>
  );
}
