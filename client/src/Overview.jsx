import PieChart from './PieChart';
import './Overview.css';

export default function Overview() {
  return (
    <div className="overview-container">
      <div className="overview-heading">
        <p>Balance on July 2023</p>
        <div id="sort-by-button">
          <select name="sort-by" className="btn" id="sort-by">
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="overview-content">
        <PieChart />

        <ul className="list-items">
          <li className="list">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
