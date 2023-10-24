import { useState } from 'react';
import './Profile.css';
import './css/form.css';

export default function Profile({ toggle }) {
  const [addNewTransaction, setAddNewTransaction] = useState(false);

  function handleAddNewTransaction() {
    setAddNewTransaction(!addNewTransaction);
  }

  return (
    <div className="profile-container">
      <div className="profile">
        <h3>Welcome back, Cameron !</h3>
        <img src="https://i.pravatar.cc/50" alt="Cameron" />
      </div>
      {toggle ? (
        <ul className="total">
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
        </ul>
      ) : (
        <div>
          {addNewTransaction ? (
            ''
          ) : (
            <button className="btn" onClick={handleAddNewTransaction}>
              Add New Transaction
            </button>
          )}
          {addNewTransaction ? (
            <form
              action=""
              method="get"
              className="form-transaction form-add-transaction"
            >
              <div>
                <label htmlFor="type">Type: </label>
                <select name="type" id="type" required>
                  <option value="">--Please choose a type</option>
                  <option vallue="income">Income</option>
                  <option vallue="expense">Expense</option>
                </select>
              </div>
              <div>
                <label htmlFor="value">Value: </label>
                <input type="number" id="value" placeholder="amount" />
              </div>
              <div>
                <label htmlFor="category">Category: </label>
                <select name="category" id="category" required>
                  <option value="">--Please choose a category</option>
                  <option vallue=""></option>
                </select>
              </div>
              <div>
                <label htmlFor="date">Date: </label>
                <input type="date" name="date" id="date" required />
              </div>
              <div>
                <label htmlFor="tag">Tag: </label>
                <input type="tag" id="tag" placeholder="note" />
              </div>
              <span className="flex-space-between">
                <button className="btn">Submit</button>
                <button className="btn" onClick={handleAddNewTransaction}>
                  Cancel
                </button>
              </span>
            </form>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}
