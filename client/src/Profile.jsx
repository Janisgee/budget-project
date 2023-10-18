import './Profile.css';

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile">
        <h3>Welcome back, Cameron !</h3>
        <img src="https://i.pravatar.cc/50" alt="Cameron" />
      </div>
      <ul className="total">
        <li className="list">
          <h3>🐖 Wallet</h3>
          <p>+$13,265.21</p>
        </li>
        <li className="list">
          <h3>💸 All Expense</h3>
          <p>-$8,326.21</p>
        </li>
        <li className="list">
          <h3>💵 All Income</h3>
          <p>+$13,26.21</p>
        </li>
      </ul>

      <h3> </h3>
      <h3> </h3>
    </div>
  );
}
