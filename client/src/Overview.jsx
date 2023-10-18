import PieChart from './PieChart';
import './Overview.css';

export default function Overview() {
  return (
    <div className="overview-container">
      <div className="container">
        <p>Balance on July 2023</p>
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
    </div>
  );
}
