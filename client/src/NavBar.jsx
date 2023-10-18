import './css/btn.css';

export default function navBar() {
  return (
    <nav className="navbar">
      <div className="logo">💰Money Tracker</div>
      <div className="btn-group">
        <button className="btn btn-login">Login</button>
        <button className="btn btn-signup">Sign Up</button>
      </div>
    </nav>
  );
}
