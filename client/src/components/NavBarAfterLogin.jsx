import { useState } from 'react';
import './css/btn.css';
import { Link } from 'react-router-dom';

export default function NavBarAfterLogin() {
  const [toggle, setToggle] = useState(false);

  const handleToggleChange = () => {
    setToggle(!toggle);
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
          onClick={handleToggleChange}
        >
          Overview
        </Link>
        <Link
          to="/user/transaction"
          className={toggle ? 'link btn-overview ' : 'link btn-overview active'}
          onClick={handleToggleChange}
        >
          Transaction
        </Link>
        <Link to="/" className="link btn">
          Log&nbsp;Out
        </Link>
      </div>
    </nav>
  );
}
