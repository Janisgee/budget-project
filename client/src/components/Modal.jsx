import { useModal } from '../contexts/modalContext';

export default function Modal() {
  const { handleCloseModal, editTrans } = useModal();
  console.log(editTrans);
  return (
    <>
      <div className="transaction-modal displayNone" id="transaction-modal">
        <form
          action=""
          method="get"
          className="form-transaction transaction-modal-content"
        >
          <div className="flex-space-between">
            <span>Edit Transaction</span>
            <button
              className="closeButton"
              onClick={(e) => handleCloseModal(e, 'transaction-modal')}
            >
              <span>&times;</span>
            </button>
          </div>
          <div>
            <label htmlFor="type">Type: </label>
            <select name="type" id="type" required>
              <option value="">--Please choose a type</option>
              <option value="Income" selected={editTrans.type === 'Income'}>
                Income
              </option>
              <option value="Expense" selected={editTrans.type === 'Expense'}>
                Expense
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="value">Value: </label>
            <input type="number" id="value" placeholder="amount" />
          </div>
          <div>
            <label htmlFor="category">Category: </label>
            <select name="category" id="category" required>
              <option value="">--Please choose a category</option>
              <option value=""></option>
            </select>
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input type="date" name="date" id="date" required />
          </div>
          <div>
            <label htmlFor="tag">Tag: </label>
            <input type="text" placeholder="note" id="tag" />
          </div>
          <div className="flex-space-between">
            <button className="btn">Save Transaction</button>
            <button className="btn ">Delete Transaction</button>
          </div>
        </form>
      </div>
      <div className="transaction-modal  confirm-delete-modal">
        <div className="confirm-delete-content">
          <h2>Are you sure you want to delete this transaction?</h2>
          <span className="">
            <button className="btn btn-red">Delete</button>
            <button className="btn">Cancel</button>
          </span>
        </div>
      </div>
    </>
  );
}
