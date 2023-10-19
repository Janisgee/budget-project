import './Profile.css';

export default function Profile() {
  return (
    <div className="profile-container">
      <div className="profile">
        <h3>Welcome back, Cameron !</h3>
        <img src="https://i.pravatar.cc/50" alt="Cameron" />
      </div>
      {/* <ul className="total">
        <li className="list flex-space-between">
          <h3>🐖 Wallet</h3>
          <p>+$13,265.21</p>
        </li>
        <li className="list flex-space-between">
          <h3>💸 All Expense</h3>
          <p>-$8,326.21</p>
        </li>
        <li className="list flex-space-between">
          <h3>💵 All Income</h3>
          <p>+$13,26.21</p>
        </li>
      </ul> */}
      <button className="btn">Add Transaction</button>
      <form action="" method="get" class="form-newTransaction">
        <div class="newTransaction-name">
          <label for="name">Enter your name: </label>
          <input type="text" name="name" id="name" required />
        </div>
        <div class="form-example">
          <label for="email">Enter your email: </label>
          <input type="email" name="email" id="email" required />
        </div>
        <div class="form-example">
          <input type="submit" value="Subscribe!" />
        </div>
      </form>
    </div>
  );
}
