import EachDateTransaction from './EachDateTransaction';
import './Transaction.css';
import './css/form.css';

import { useTransaction } from '../contexts/transactionContext';

export default function Transaction() {
  const { allTransactionBalance, expenseSum, incomeSum } = useTransaction();

  function getToday() {
    const today = new Date().toLocaleString('en-AU', {
      timeZone: 'Asia/Hong_Kong',
    });
    const date = today.split(',')[0];
    return date;
  }
  getToday();

  return (
    <div className="transaction">
      <div className="transaction-container container">
        <div className="transaction-modal">
          <form
            action=""
            method="get"
            className="form-transaction transaction-modal-content"
          >
            <div className="flex-space-between">
              <span>Edit Transaction</span>
              <button className="closeButton">
                <span>&times;</span>
              </button>
            </div>
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
                <option value=""></option>
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
            <div className="flex-space-between">
              <button className="btn">Save Transaction</button>
              <button className="btn ">Delete Transaction</button>
            </div>
          </form>
        </div>
        <div className="transaction-modal  confirm-delete-modal">
          <div className="confirm-delete-content">
            <h2>Are you sure you want to delete this transaction?</h2>
            <span className="">
              <button className="btn btn-red">Delete</button>
              <button className="btn">Cancel</button>
            </span>
          </div>
        </div>
        <span className="transaction-heading">
          <h3>Cameron's Account</h3>
          <select name="transaction-sort-by-month" className="btn" id="sort-by">
            <option value="Jan 2023">Jan 2023</option>
            <option value="Feb 2023">Feb 2023</option>
            <option value="Mar 2023">Mar 2023</option>
            <option value="Apr 2023">Apr 2023</option>
            <option value="May 2023">May 2023</option>
            <option value="Jun 2023">Jun 2023</option>
            <option value="Jul 2023">Jul 2023</option>
            <option value="Aug 2023">Aug 2023</option>
            <option value="Sept 2023">Sept 2023</option>
            <option value="Oct 2023">Oct 2023</option>
          </select>
          <div className="all-balance">
            <div className="bal income">
              <div className="balance-title">Income</div>
              <div>$6,776.53</div>
            </div>
            <div className="bal expense">
              <div className="balance-title">Expense</div>
              <div>${expenseSum}</div>
            </div>
            <div className="bal period-balance">
              <div className="balance-title">Period Balance</div>
              <div>+$4227.34</div>
            </div>
            <div className="bal balance">
              <div className="balance-title">Balance on {getToday()}</div>
              <div>
                {allTransactionBalance > 0
                  ? `+$${allTransactionBalance}`
                  : `-$${allTransactionBalance}`}
              </div>
            </div>
          </div>
        </span>
        <div className="transaction-content flex-space-between">
          <div>
            <span className="transaction-content-heading">Transactions</span>
            <select name="transaction-sort-by" className="btn" id="sort-by">
              <option value="all transactions">All transactions</option>
              <option value="income">Incomes</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>Recent</div>
        </div>
        <hr />
        <div className="eachDateTransaction-group">
          <EachDateTransaction />
          <EachDateTransaction />
          <EachDateTransaction />
          <EachDateTransaction />
        </div>
      </div>
    </div>
  );
}
