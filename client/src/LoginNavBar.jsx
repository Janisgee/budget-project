import './css/btn.css';

export default function LoginNavBar() {
  return (
    <nav className="loginNavbar">
      <div className="logo">💰Money Tracker</div>
      <div className="btn-group">
        <button className="btn-overview active">Overview</button>
        <button className="btn-overview">Transaction</button>
        <button className="btn">Log&nbsp;Out</button>
      </div>
    </nav>
  );
}
