import { useState, useRef } from 'react';
import './Profile.css';
import './css/form.css';

import { useAuth } from '../contexts/authContext';
import { useOverview } from '../contexts/overviewContext';
import { useTransaction } from '../contexts/transactionContext';
import { expenseCategory, incomeCategory } from '../js/categories';
import { postNewTransaction } from '../js/api-service';

export default function Profile({ toggle }) {
  const { allTransactionBalance, expenseSum, incomeSum } = useOverview();
  const { user, formatUserName } = useAuth();
  const { createTransaction } = useTransaction();
  const [addNewTransaction, setAddNewTransaction] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState();

  const formRef = useRef();

  async function createNewTransaction(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const data = Object.fromEntries(formData.entries());

    //Add new transaction to server
    await postNewTransaction(data);

    console.log(data);
    //Add new transaction to UI
    createTransaction();

    //Close form
    setAddNewTransaction(false);
  }

  function handleAddNewTransaction() {
    setAddNewTransaction(!addNewTransaction);
  }

  function handleNewTransactionType(e) {
    if (e.target.value === undefined) return;
    setNewTransactionType(e.target.value);
  }
  console.log(user);

  return (
    <div className="profile-container">
      <div className="profile">
        <h3>Welcome back, {formatUserName(user.name)} !</h3>
        <img src={`/img/users/${user.photo}`} alt="Cameron" />
      </div>
      {toggle === 'Overview' && (
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
      )}
      {toggle === 'Transaction' && (
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
      {toggle === 'Setting' && ''}
    </div>
  );
}
