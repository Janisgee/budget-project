import { createContext, useContext, useReducer } from 'react';

const ModalContext = createContext();
const initalState = { editTrans: {} };

function reducer(state, action) {
  switch (action.type) {
    case 'editData':
      return { ...state, editTrans: action.payload };
    default:
      throw new Error('Unknow action type');
  }
}

function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  const { showModal, editTrans } = state;

  function handleShowModal(e, modalId, data) {
    e.preventDefault();

    if (data) {
      dispatch({ type: 'editData', payload: data });
    }

    const modalElement = document.getElementById(modalId);
    modalElement.classList.remove('displayNone');
  }

  function handleCloseModal(e, modalId) {
    e.preventDefault();
    const modalElement = document.getElementById(modalId);
    modalElement.classList.add('displayNone');
  }

  return (
    <ModalContext.Provider
      value={{ showModal, handleShowModal, editTrans, handleCloseModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('ModalContext is used outside the ModalProvider');
  }
  return context;
}

export { ModalProvider, useModal };
