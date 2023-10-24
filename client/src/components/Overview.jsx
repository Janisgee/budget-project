import { useState, useEffect } from 'react';
import PieChart from './PieChart';
import './Overview.css';
import { getAllTransactions, getTransactionStats } from '../js/api-service';

export default function Overview() {
  const [transactions, setTransactions] = useState([]);
  const [transactionStats, setTransactionStats] = useState([]);
  const [selectedType, setSelectedType] = useState('Expense');
  const [selectedMonth, setSelectedMonth] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  //Get unique month that have transactions
  const uniqueTransactionMonth = [];

  transactions.forEach((el) => {
    if (!uniqueTransactionMonth.includes(formatDate(el.date))) {
      uniqueTransactionMonth.push(formatDate(el.date));
    }
  });

  //handle displaying Income or Expense
  function handleTypeFilter(e) {
    setSelectedType(e.target.value);
  }

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

      const startDate = new Date(start);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
      setStartDate(startDate);
      setEndDate(endDate);
    }
  }

  useEffect(() => {
    async function fetchTransactions() {
      const allTransactions = await getAllTransactions();
      setTransactions(allTransactions);
    }
    fetchTransactions();
  }, []);

  useEffect(() => {
    async function fetchTransactionStats() {
      const transactionStats = await getTransactionStats(
        startDate,
        endDate,
        selectedType
      );
      setTransactionStats(transactionStats);
    }
    fetchTransactionStats();
  }, [startDate, endDate, selectedType]);

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
          <select
            value={selectedType}
            name="overview-sort-by-type"
            className="btn"
            onChange={handleTypeFilter}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="overview-content">
        <PieChart />

        <ul className="list-items">
          {transactionStats.map((trans) => {
            console.log(trans._id.category);
            return (
              <li className="list flex-space-between" key={trans._id.category}>
                <h4>{trans._id.category}</h4>
                <p>
                  {selectedType === 'Income' ? '$' : '-$'}
                  {trans.sumValue}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
