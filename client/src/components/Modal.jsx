import { useState, useEffect, useRef } from 'react';
import { useTransaction } from '../contexts/transactionContext';
import { useModal } from '../contexts/modalContext';
import { patchUpdateTransaction } from '../js/api-service';

import { expenseCategory, incomeCategory } from '../js/categories';

export default function Modal() {
  const { closeModal, editTrans } = useModal();
  const { updateTransaction } = useTransaction();
  const [editType, setEditType] = useState(editTrans ? editTrans.type : '');
  const [editCategory, setEditCategory] = useState(
    editTrans ? editTrans.category : ''
  );
  console.log(editTrans);

  useEffect(() => {
    if (editTrans) {
      setEditType(editTrans.type);
      setEditCategory(editTrans.category);
    }
  }, [editTrans]);
  console.log(editType);

  const editFormRef = useRef();

  function mergeUpdatedTransAndOldTrans(newTrans) {
    for (const property in newTrans) {
      if (newTrans.hasOwnProperty(property)) {
        editTrans[property] = newTrans[property];
      }
    }
    return editTrans;
  }

  function editCurrentTransaction(event) {
    event.preventDefault();
    const formData = new FormData(editFormRef.current);

    const data = Object.fromEntries(formData.entries());

    const updatedData = mergeUpdatedTransAndOldTrans(data);
    console.log(updatedData);
    //Update Trans in server
    patchUpdateTransaction(updatedData, editTrans._id);

    //Update Trans in UI
    updateTransaction(updatedData);

    //Close Modal
    closeModal('transaction-modal');
    try {
    } catch (err) {}
  }

  function handleEditTypeChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    setEditType(e.target.value);
  }

  function handleEditCategory(e) {
    e.preventDefault();
    setEditCategory(e.target.value);
  }

  function handleCloseModal(e) {
    e.preventDefault();
    closeModal('transaction-modal');
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
              ref={editFormRef}
              onSubmit={editCurrentTransaction}
            >
              <div className="flex-space-between">
                <span>Edit Transaction</span>
                <button
                  className="closeButton"
                  onClick={(e) => handleCloseModal(e)}
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
                  value={editType}
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
                  name="value"
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
                  value={editCategory}
                  onChange={handleEditCategory}
                >
                  <option value="" disabled>
                    --Please choose a category
                  </option>
                  {(editType === 'Expense'
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
                  name="tag"
                  type="text"
                  placeholder="note"
                  id="tag"
                  defaultValue={editTrans.tag}
                />
              </div>
              <div className="flex-space-between">
                <button className="btn" type="submit">
                  Save Transaction
                </button>
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