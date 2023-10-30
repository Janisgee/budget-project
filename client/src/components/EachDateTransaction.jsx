import './EachDateTransaction.css';
import { useTransaction } from '../contexts/transactionContext';
import { useModal } from '../contexts/modalContext';

const dayFormatOption = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

function groupTransactionsByDate(transactions) {
  const groupedData = {};
  for (const obj of transactions) {
    const date = obj.date;
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(obj);
  }
  const groupedDataArray = Object.keys(groupedData).map((key) => {
    const dayTransactions = groupedData[key];
    return {
      day: new Date(key).toLocaleDateString(undefined, dayFormatOption),
      transactions: dayTransactions,
      dayTotal: dayTransactions.reduce(
        (acc, cur) => acc + cur.value * (cur.type === 'Income' ? 1 : -1),
        0
      ),
    };
  });
  return groupedDataArray;
}

export default function EachDateTransaction({}) {
  const { transactions } = useTransaction();
  const datedTransactions = groupTransactionsByDate(transactions);

  return (
    <div className="each-transactions">
      {datedTransactions.map(({ day, transactions, dayTotal }) => {
        return (
          <div key={day}>
            <div className="flex-space-between ">
              <div className="each-transaction-date">{day}</div>
              <div className="each-transaction-total">
                {dayTotal > 0 ? `+$${dayTotal}` : `-$${-dayTotal}`}
              </div>
            </div>
            <hr />
            {transactions.map((t) => (
              <TransactionRow key={t._id} transaction={t} />
            ))}
            <br />
          </div>
        );
      })}
    </div>
  );
}

const TransactionRow = ({ transaction }) => {
  const { handleShowModal } = useModal();

  return (
    <button
      className="each-transaction-select"
      onClick={(e) => {
        handleShowModal(e, 'transaction-modal', transaction);
      }}
    >
      <div className="flex-space-between">
        <div>
          <span className="each-transaction-title strong-font">
            {transaction.category}
          </span>
          <span>🏷️</span>
          <span>{transaction.tag}</span>
        </div>
        <div>
          {transaction.category === 'Income'
            ? `+$${transaction.value}`
            : `-$${transaction.value}`}
        </div>
      </div>
    </button>
  );
};
