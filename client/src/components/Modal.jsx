import { useState, useEffect, useRef } from 'react';
import { useTransaction } from '../contexts/transactionContext';
import { useModal } from '../contexts/modalContext';
import {
  patchUpdateTransaction,
  deleteServerTransaction,
} from '../js/api-service';

import { expenseCategory, incomeCategory } from '../js/categories';

export default function Modal() {
  const { closeModal, editTrans, showModal } = useModal();
  const { updateTransaction, deleteTransaction } = useTransaction();
  const [editType, setEditType] = useState(editTrans ? editTrans.type : '');
  const [editCategory, setEditCategory] = useState(
    editTrans ? editTrans.category : ''
  );

  useEffect(() => {
    if (editTrans) {
      setEditType(editTrans.type);
      setEditCategory(editTrans.category);
    }
  }, [editTrans]);

  const editFormRef = useRef();

  function mergeUpdatedTransAndOldTrans(newTrans) {
    for (const property in newTrans) {
      if (newTrans.hasOwnProperty(property)) {
        editTrans[property] = newTrans[property];
      }
    }
    return editTrans;
  }

  async function editCurrentTransaction(event) {
    event.preventDefault();
    const formData = new FormData(editFormRef.current);

    const data = Object.fromEntries(formData.entries());

    const updatedData = mergeUpdatedTransAndOldTrans(data);
    updatedData.date = new Date(updatedData.date).toISOString();
    console.log(updatedData);
    //Update Trans in server (Need to make sure server load first)
    await patchUpdateTransaction(updatedData, editTrans._id);

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

  function handleDeleteTransaction(e) {
    e.preventDefault();

    showModal('confirm-delete-modal');
  }

  function handleConfirmDeleteButton(e) {
    e.preventDefault();
    //Delete transaction from server
    deleteServerTransaction(editTrans._id);

    //Delete transaction from UI
    deleteTransaction(editTrans._id);

    //Close 2 Modal
    closeModal('confirm-delete-modal');
    closeModal('transaction-modal');
  }

  function handleCancelDeleteButton(e) {
    e.preventDefault();
    //Close Modal (Confirm Delete Modal)
    closeModal('confirm-delete-modal');
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
                <button className="btn " onClick={handleDeleteTransaction}>
                  Delete Transaction
                </button>
              </div>
            </form>
          </div>
          <div
            className="transaction-modal  confirm-delete-modal displayNone"
            id="confirm-delete-modal"
          >
            <div className="confirm-delete-content">
              <h2>Are you sure you want to delete this transaction?</h2>
              <span>
                <button
                  className="btn btn-red"
                  onClick={handleConfirmDeleteButton}
                >
                  Delete
                </button>
                <button className="btn" onClick={handleCancelDeleteButton}>
                  Cancel
                </button>
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
