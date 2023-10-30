import { useTransaction } from '../contexts/transactionContext';
import { useModal } from '../contexts/modalContext';
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

  const { showModal } = useModal();
  // const [showModal, setShowModal] = useState(false);
  // const [closeModel, setCloseModal] = useState(false);
  // const [editTrans, setEditTrans] = useState({});
  // console.log(showModal, editTrans);

  const periodBalance = incomeSum - expenseSum;

  // function handleCloseModel(e) {
  //   e.preventDefault();
  //   setCloseModal(true);
  //   const modalElement = document.getElementById('transaction-modal');
  //   modalElement.classList.add('displayNone');
  // }

  function formatDate(date) {
    const option = { month: 'short', year: 'numeric', timezone: 'Perth' };
    const newDate = new Date(date).toLocaleDateString('en-au', option);
    return newDate;
  }

  function getPreviousMonthSelection() {
    const passMonthList = [];
    const currentDate = new Date();
    for (let i = 0; i < 18; i++) {
      // Create a new Date object for the previous month
      const previousMonth = new Date(currentDate);
      previousMonth.setMonth(currentDate.getMonth() - i);
      passMonthList.push(formatDate(previousMonth));
    }
    return passMonthList;
  }
  getPreviousMonthSelection();

  function getDay(date) {
    const today = new Date(date).toLocaleString('en-AU', {
      timeZone: 'Asia/Hong_Kong',
    });
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
          <h3>Cameron's Account</h3>
          <select
            name="transaction-sort-by-month"
            className="btn"
            value={selectedMonth}
            onChange={handleMonthFilter}
          >
            <option value="All Time">All Time</option>
            {getPreviousMonthSelection().map((month, i) => (
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
