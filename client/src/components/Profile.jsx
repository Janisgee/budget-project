import { useState, useRef } from 'react';
import './Profile.css';
import './css/form.css';

import { useTransaction } from '../contexts/transactionContext';
import { expenseCategory, incomeCategory } from '../js/categories';
import { postNewTransaction } from '../js/api-service';

export default function Profile({ toggle }) {
  const { allTransactionBalance, expenseSum, incomeSum } = useTransaction();
  const [addNewTransaction, setAddNewTransaction] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState();

  const formRef = useRef();

  async function createNewTransaction(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    const data = Object.fromEntries(formData.entries());

    postNewTransaction(data);

    try {
    } catch (err) {}
  }

  function handleAddNewTransaction() {
    setAddNewTransaction(!addNewTransaction);
  }

  function handleNewTransactionType(e) {
    if (e.target.value === undefined) return;
    setNewTransactionType(e.target.value);
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
            <h3>🐖 Wallet Balance</h3>
            <p>
              {allTransactionBalance > 0
                ? `+$${allTransactionBalance}`
                : `-$${allTransactionBalance}`}
            </p>
          </li>
          <li className="list flex-space-between">
            <h3>💸 All Expense</h3>
            <p>-${expenseSum}</p>
          </li>
          <li className="list flex-space-between">
            <h3>💵 All Income</h3>
            <p>+${incomeSum}</p>
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
              ref={formRef}
              onSubmit={createNewTransaction}
            >
              <div>
                <label htmlFor="type">Type: </label>
                <select
                  name="type"
                  id="newTransaction-type"
                  required
                  onChange={handleNewTransactionType}
                >
                  <option value="">--Please choose a type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div>
                <label htmlFor="value">Value: </label>

                <input
                  type="number"
                  name="value"
                  // onChange={setTwoNumberDecimal}
                  min="0"
                  pattern="/^[0-9]+(\.[0-9]{1,2})?$/"
                  step="0.01"
                  id="newTransaction-value"
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Category: </label>
                <select name="category" id="newTransaction-category" required>
                  <option>--Please choose a category</option>
                  {(newTransactionType === 'Expense'
                    ? expenseCategory
                    : incomeCategory
                  ).map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  name="date"
                  id="newTransaction-date"
                  required
                />
              </div>
              <div>
                <label htmlFor="tag">Tag: </label>
                <input
                  type="tag"
                  id="newTransaction-tag"
                  placeholder="note"
                  name="tag"
                />
              </div>
              <span className="flex-space-between">
                <button className="btn" type="submit">
                  Submit
                </button>
                <button
                  className="btn"
                  type="button"
                  onClick={(e) => handleAddNewTransaction(e)}
                >
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
