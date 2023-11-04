import './css/btn.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

export default function NavBarAfterLogin({ toggle, ontoggle }) {
  const handleToggleChange = (e) => {
    if (e.target.textContent === 'Overview') {
      ontoggle(true);
    } else {
      ontoggle(false);
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
          className={toggle ? 'link btn-overview active' : 'link btn-overview'}
          onClick={(e) => handleToggleChange(e)}
        >
          Overview
        </Link>
        <Link
          to="/user/transaction"
          className={toggle ? 'link btn-overview ' : 'link btn-overview active'}
          onClick={(e) => handleToggleChange(e)}
        >
          Transaction
        </Link>
        <Link to="/user/setting" className="settingButton">
          <FontAwesomeIcon icon={faGear} />
        </Link>
        <Link to="/" className="link btn">
          Log&nbsp;Out
        </Link>
      </div>
    </nav>
  );
}
