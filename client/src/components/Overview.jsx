import PieChart from './PieChart';
import './Overview.css';

import { useOverview } from '../contexts/overviewContext';

export default function Overview() {
  const {
    transactions,
    transactionStats,
    selectedType,
    selectedMonth,
    monthFiler,
    typeFilter,
  } = useOverview();

  //Get unique month that have transactions
  const uniqueTransactionMonth = [];

  transactions.forEach((el) => {
    if (!uniqueTransactionMonth.includes(formatDate(el.date))) {
      uniqueTransactionMonth.push(formatDate(el.date));
    }
  });

  //handle displaying Income or Expense
  function handleTypeFilter(e) {
    typeFilter(e.target.value);
  }

  //Get unique array of category and value for the month

  function formatDate(date) {
    const option = { month: 'short', year: 'numeric', timezone: 'Perth' };
    const newDate = new Date(date).toLocaleDateString('en-au', option);

    return newDate;
  }

  function handleMonthFilter(e) {
    monthFiler(e.target.value);
  }

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
            <option>All transactions</option>
            {uniqueTransactionMonth.map((month) => (
              <option value={month} key={month}>
                {month}
              </option>
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
        <PieChart
          transactionStats={transactionStats}
          selectedType={selectedType}
        />

        <ul className="list-items">
          {transactionStats.map((trans) => {
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
