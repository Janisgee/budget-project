import './css/btn.css';
import { Link } from 'react-router-dom';

export default function NavBarAfterLogin() {
  return (
    <nav className="navBarAfterLogin">
      <Link to="/user/overview" className="logo navLink link">
        💰Money Tracker
      </Link>
      <div className="btn-group">
        <Link to="/user/overview" className="link btn-overview active">
          Overview
        </Link>
        <Link to="/user/transaction" className="link btn-overview">
          Transaction
        </Link>
        <Link to="/" className="link btn">
          Log&nbsp;Out
        </Link>
      </div>
    </nav>
  );
}
