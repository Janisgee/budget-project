import PieChart from './PieChart';
import './Overview.css';

export default function Overview() {
  return (
    <div className="overview-container">
      <div className="container">
        <p>Balance on July 2023</p>
        <div>
          <PieChart />
        </div>
      </div>
    </div>
  );
}
