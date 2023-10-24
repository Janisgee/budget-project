import { useState, useEffect } from 'react';
import PieChart from './PieChart';
import './Overview.css';
import { getAllTransactions } from '../js/api-service';

export default function Overview() {
  const [transactions, setTransactions] = useState([]);
  const [categoryTrans, setCategoryTrans] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  console.log(startDate);
  console.log(endDate);
  console.log(transactions);

  //Get unique month that have transactions
  const uniqueTransactionMonth = [];

  transactions.forEach((el) => {
    if (!uniqueTransactionMonth.includes(formatDate(el.date))) {
      uniqueTransactionMonth.push(formatDate(el.date));
    }
  });

  //handle displaying Income or Expense
  function handleDisplayType() {}

  //Get unique array of category and value for the month

  function formatDate(date) {
    // console.log(date);
    const option = { month: 'short', year: 'numeric', timezone: 'Perth' };
    const newDate = new Date(date).toLocaleDateString('en-au', option);
    // console.log(newDate);
    return newDate;
  }

  function handleMonthFilter(e) {
    if (e.target.value === 'All transactions') {
      setStartDate(undefined);
      setEndDate(undefined);
    } else {
      const start = e.target.value;
      setSelectedMonth(start);
      console.log(start);
      const startDate = new Date(start);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
      setStartDate(startDate);
      setEndDate(endDate);
      console.log(startDate);
      console.log(endDate);
    }
  }

  useEffect(() => {
    async function fetchTransactions() {
      const allTransactions = await getAllTransactions(startDate, endDate);
      if (startDate === undefined && endDate === undefined) {
        setCategoryTrans([]);
        setTransactions(allTransactions);
      } else {
        setCategoryTrans(allTransactions);
      }
    }
    fetchTransactions();
  }, [startDate, endDate]);

  return (
    <div className="overview-container ">
      <div className="overview-heading flex-space-between">
        <div>
          <p>Balance on</p>
          <select
            value={selectedMonth}
            name="overview-sort-by-month"
            className="btn"
            onChange={handleMonthFilter}
          >
            <option value="All transactions">All transactions</option>
            {uniqueTransactionMonth.map((month) => (
              <option value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="sort-by-button">
          <select name="overview-sort-by-type" className="btn">
            <option value="Income" onClick={handleDisplayType}>
              Income
            </option>
            <option value="Expense" onClick={handleDisplayType}>
              Expense
            </option>
          </select>
        </div>
      </div>
      <div className="overview-content">
        <PieChart />

        <ul className="list-items">
          {(categoryTrans.length > 0 ? categoryTrans : transactions).map(
            (trans) => {
              return (
                <li className="list flex-space-between" key={trans._id}>
                  <h4>{trans.category}</h4>
                  <p>
                    {trans.type === 'Income' ? '$' : '-$'}
                    {trans.value}
                  </p>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
}
