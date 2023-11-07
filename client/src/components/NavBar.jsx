import { useNavigate } from 'react-router-dom';
import './css/btn.css';

export default function NavBar() {
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    //Let the router loader do it
    navigate('/user/overview');
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
