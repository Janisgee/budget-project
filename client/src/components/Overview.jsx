import PieChart from './PieChart';
import './Overview.css';

export default function Overview() {
  return (
    <div className="overview-container ">
      <div className="overview-heading flex-space-between">
        <div id="sort-by-button">
          <p>Balance on</p>
          <select name="overview-sort-by-month" className="btn" id="sort-by">
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
        </div>
        <div id="sort-by-button">
          <select name="overview-sort-by-type" className="btn" id="sort-by">
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="overview-content">
        <PieChart />

        <ul className="list-items">
          <li className="list flex-space-between">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list flex-space-between">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list flex-space-between">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list flex-space-between">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list flex-space-between">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list flex-space-between">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
          <li className="list flex-space-between">
            <h4>🍽️ Eating Out</h4>
            <p>-$20.00</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
