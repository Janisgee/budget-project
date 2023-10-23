import './css/btn.css';

export default function navBar() {
  return (
    <nav className="navbar flex-space-between">
      <div className="logo">💰Money Tracker</div>
      <div className="btn-group">
        <a href="/login">
          <button className="btn btn-login">Login</button>
        </a>
        <a href="/signup">
          <button className="btn btn-signup">Sign Up</button>
        </a>
      </div>
    </nav>
  );
}
