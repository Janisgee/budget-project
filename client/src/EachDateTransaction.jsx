import './EachDateTransaction.css';

export default function EachDateTransaction() {
  return (
    <div className="each-transactions">
      <div className="flex-space-between ">
        <div className="each-transaction-date">Thursday, 19 October 2023</div>
        <div className="each-transaction-total">+$98</div>
      </div>
      <hr />
      <div className="flex-space-between ">
        <div>
          <span className="each-transaction-title strong-font">
            🍽️ Eating Out
          </span>
          <span>🏷️</span>
          <span>Moe's Tavern</span>
        </div>
        <div>-AUD 35.60</div>
      </div>
      <div className="flex-space-between ">
        <div>
          <span className="each-transaction-title strong-font">
            💖 Healthcare
          </span>
          <span>🏷️</span>
          <span>Dentist</span>
        </div>
        <div>-AUD 350.60</div>
      </div>
    </div>
  );
}
