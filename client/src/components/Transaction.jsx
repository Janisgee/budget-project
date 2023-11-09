import { useState, useEffect } from 'react';
import { useTransaction } from '../contexts/transactionContext';
import { useAuth } from '../contexts/authContext';

import EachDateTransaction from './EachDateTransaction';
import Modal from './Modal';
import './Transaction.css';
import './css/form.css';

export default function Transaction() {
  const {
    allTranBeforeEndDay,
    expenseSum,
    incomeSum,
    endDate,
    selectedMonth,
    monthFiler,
  } = useTransaction();
  const { user, userName } = useAuth();

  const [monthList, setMonthList] = useState([]);

  // const { showModal } = useModal();

  const periodBalance = incomeSum - expenseSum;

  useEffect(() => {
    function getPreviousMonthSelection() {
      const passMonthList = [];
      const currentDate = new Date();
      for (let i = 0; i < 18; i++) {
        // Push the formatted date to the array
        const previousMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i,
          1
        );
        passMonthList.push(formatDate(previousMonth));
      }
      setMonthList(passMonthList);
    }
    getPreviousMonthSelection();
  }, []);

  function formatDate(date) {
    const option = { month: 'short', year: 'numeric', timezone: 'Perth' };
    const newDate = new Date(date).toLocaleDateString(undefined, option);
    return newDate;
  }

  function getDay(date) {
    const today = new Date(date).toLocaleString();
    const newDate = today.split(',')[0];
    return newDate;
  }

  function handleMonthFilter(e) {
    monthFiler(e.target.value);
  }

  return (
    <div className="transaction">
      <div className="transaction-container container">
        {/* {showModal ? <Modal /> : ''} */}
        <Modal />
        <span className="transaction-heading">
          <h3>{userName}'s Account</h3>
          <select
            name="transaction-sort-by-month"
            className="btn"
            value={selectedMonth}
            onChange={handleMonthFilter}
          >
            <option value="All Time">All Time</option>
            {monthList.map((month, i) => (
              <option value={month} key={i}>
                {month}
              </option>
            ))}
          </select>
          <div className="all-balance">
            <div className="bal income">
              <div className="balance-title">Income</div>
              <div>${incomeSum}</div>
            </div>
            <div className="bal expense">
              <div className="balance-title">Expense</div>
              <div>${expenseSum}</div>
            </div>
            <div className="bal period-balance">
              <div className="balance-title">Period Balance</div>
              <div>
                {periodBalance > 0
                  ? `+$${periodBalance}`
                  : `-$${-periodBalance}`}
              </div>
            </div>
            <div className="bal balance">
              <div className="balance-title">
                Balance on{' '}
                {endDate === undefined
                  ? getDay(new Date())
                  : getDay(new Date(endDate - 1))}
              </div>
              <div>
                {allTranBeforeEndDay > 0
                  ? `+$${allTranBeforeEndDay}`
                  : `-$${-allTranBeforeEndDay}`}
              </div>
            </div>
          </div>
        </span>
        <div className="transaction-content flex-space-between">
          <div>
            <span className="transaction-content-heading">Transactions</span>
          </div>
          <div>Recent</div>
        </div>
        <hr />
        <div className="eachDateTransaction-group">
          <EachDateTransaction />
        </div>
      </div>
    </div>
  );
}
