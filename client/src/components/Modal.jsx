import { useState, useEffect } from 'react';
import { useModal } from '../contexts/modalContext';

import { expenseCategory, incomeCategory } from '../js/categories';

export default function Modal() {
  const { handleCloseModal, editTrans } = useModal();
  const [editType, setEditType] = useState('');
  const [editCategory, setEditCategory] = useState('');
  console.log(editTrans);

  useEffect(() => {
    if (editTrans) {
      setEditType(editTrans.type);
      setEditCategory(editTrans.category);
    }
  }, [editTrans]);
  console.log(editType);

  function handleEditTypeChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    setEditType(e.target.value);
  }

  function handleEditCategory(e) {
    e.preventDefault();
    setEditCategory(e.target.value);
  }

  return (
    <div id="transaction-modal" className="displayNone">
      {editTrans !== undefined ? (
        <>
          <div className="transaction-modal">
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
                <select
                  name="type"
                  id="editType"
                  required
                  defaultValue={editTrans.type}
                  onChange={handleEditTypeChange}
                >
                  <option value="" disabled>
                    --Please choose a type
                  </option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
              <div>
                <label htmlFor="value">Value: </label>
                <input
                  type="number"
                  id="value"
                  placeholder="amount"
                  defaultValue={editTrans.value}
                />
              </div>
              <div>
                <label htmlFor="category">Category: </label>
                <select
                  name="category"
                  id="category"
                  required
                  defaultValue={editTrans.category}
                  onChange={handleEditCategory}
                >
                  <option value="" disabled>
                    --Please choose a category
                  </option>
                  {(editTrans.type === 'Expense'
                    ? expenseCategory
                    : incomeCategory
                  ).map((el) => (
                    <option key={el} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  required
                  defaultValue={editTrans.date.split('T')[0]}
                />
              </div>
              <div>
                <label htmlFor="tag">Tag: </label>
                <input
                  type="text"
                  placeholder="note"
                  id="tag"
                  defaultValue={editTrans.tag}
                />
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
      ) : (
        ''
      )}
    </div>
  );
}
