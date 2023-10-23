import './Profile.css';
import './css/form.css';

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
      <form
        action=""
        method="get"
        class="form-transaction form-add-transaction"
      >
        <div>
          <label for="type">Type: </label>
          <select name="type" id="type" required>
            <option value="">--Please choose a type</option>
            <option vallue="income">Income</option>
            <option vallue="expense">Expense</option>
          </select>
        </div>
        <div>
          <label for="value">Value: </label>
          <input type="number" id="value" placeholder="amount" />
        </div>
        <div>
          <label for="category">Category: </label>
          <select name="category" id="category" required>
            <option value="">--Please choose a category</option>
            <option vallue=""></option>
          </select>
        </div>
        <div>
          <label for="date">Date: </label>
          <input type="date" name="date" id="date" required />
        </div>
        <div>
          <label for="tag">Tag: </label>
          <input type="tag" id="tag" placeholder="note" />
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
