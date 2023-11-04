import './css/btn.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function NavBarAfterLogin({ toggle, ontoggle }) {
  const handleToggleChange = (e) => {
    if (e.target.textContent === 'Overview') {
      ontoggle('Overview');
    } else if (e.target.textContent === 'Transaction') {
      ontoggle('Transaction');
    } else {
      ontoggle('Setting');
    }
  };
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
        <Link to="/" className="link btn">
          Log&nbsp;Out
        </Link>
      </div>
    </nav>
  );
}
