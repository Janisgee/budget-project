import { createContext, useEffect, useContext, useReducer } from 'react';
import {
  getAllTransactions,
  getTransactionStats,
  getTransactionSummary,
} from '../js/api-service';

const TransactionContext = createContext();

const initalState = {
  transactions: [],
  transactionStats: [],
  transactionSummary: [],
  transactionInSpecificEndDay: [],
  // selectedType: 'Expense',
  selectedMonth: undefined,
  startDate: undefined,
  endDate: undefined,
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loaded/transactions':
      return { ...state, transactions: action.payload };
    case 'loaded/transactionStats':
      return {
        ...state,
        transactionStats: action.payload,
      };
    case 'loaded/transactionSummary':
      return { ...state, transactionSummary: action.payload };
    case 'loaded/transactionInSpecificEndDay':
      return { ...state, transactionInSpecificEndDay: action.payload };
    // case 'filterMonth/setStartDate':
    //   return { ...state, startDate: action.payload };
    // case 'filterMonth/setEndDate':
    //   return { ...state, endDate: action.payload };
    case 'filterMonth/setSelectedMonth':
      return { ...state, selectedMonth: action.payload };
    case 'filterMonth/setStartEnd':
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    // case 'filterType':
    //   return { ...state, selectedType: action.payload };
    case 'rejected':
      return { ...state, error: action.payload };
    default:
      throw new Error('Unknown action type');
  }
}

function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    transactions,
    transactionStats,
    transactionSummary,
    transactionInSpecificEndDay,
    // selectedType,
    selectedMonth,
    startDate,
    endDate,
  } = state;

  const allTransactionBalance = transactions
    .map((el) => (el.type === 'Expense' ? -el.value : el.value))
    .reduce((acc, cur) => acc + cur, 0);

  const allTranBeforeEndDay = transactionInSpecificEndDay
    .map((el) => (el._id.type === 'Expense' ? -el.sumValue : el.sumValue))
    .reduce((acc, cur) => acc + cur, 0);

  const expenseSum = transactionSummary
    .filter((el) => el._id.type === 'Expense')
    .map((el) => el.sumValue)
    .reduce((acc, cur) => acc + cur, 0);

  const incomeSum = transactionSummary
    .filter((el) => el._id.type === 'Income')
    .map((el) => el.sumValue)
    .reduce((acc, cur) => acc + cur, 0);

  //Fetch data (All transactions)
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const allTransactions = await getAllTransactions();
        dispatch({ type: 'loaded/transactions', payload: allTransactions });
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error while loading transactions...',
        });
      }
    }
    fetchTransactions();
  }, []);

  //Fetch data with filter(date period and type)
  // useEffect(() => {
  //   async function fetchTransactionStats() {
  //     const transactionStats = await getTransactionStats(
  //       startDate,
  //       endDate,
  //       selectedType
  //     );
  //     dispatch({ type: 'loaded/transactionStats', payload: transactionStats });
  //   }
  //   fetchTransactionStats();
  // }, [startDate, endDate, selectedType]);

  //Fetch data with filter(date period)
  useEffect(() => {
    async function fetchTransactionSummary() {
      const transactionSum = await getTransactionSummary(startDate, endDate);
      dispatch({
        type: 'loaded/transactionSummary',
        payload: transactionSum,
      });
    }
    fetchTransactionSummary();
  }, [startDate, endDate]);

  // Fetch all data (Transaction Stats without filter)
  // useEffect(() => {
  //   async function fetchAllTransactionStats() {
  //     const allTransactionStats = await getTransactionSummary();
  //     dispatch;
  //   }
  // });

  //Fetch data until specific end date
  useEffect(() => {
    async function fetchTransactionInSpecificEndDay() {
      const transaction = await getTransactionSummary(
        'Fri Jan 01 2021 00:00:00 GMT+0800 (Australian Western Standard Time)',
        endDate === undefined ? new Date() : endDate
      );
      dispatch({
        type: 'loaded/transactionInSpecificEndDay',
        payload: transaction,
      });
    }
    fetchTransactionInSpecificEndDay();
  }, [endDate]);

  //Filter by date period
  function monthFiler(value) {
    dispatch({
      type: 'filterMonth/setSelectedMonth',
      payload: value,
    });

    if (value === 'All Time') {
      dispatch({
        type: 'filterMonth/setStartEnd',
        payload: { startDate: undefined, endDate: undefined },
      });
    } else {
      const start = value;
      const dateStart = new Date(start);
      const dateEnd = new Date(dateStart);
      dateEnd.setMonth(dateStart.getMonth() + 1);
      dispatch({
        type: 'filterMonth/setStartEnd',
        payload: { startDate: dateStart, endDate: dateEnd },
      });
    }
  }

  //Filter by type
  // function typeFilter(type) {
  //   dispatch({
  //     type: 'filterType',
  //     payload: type,
  //   });
  // }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        transactionStats,
        transactionSummary,
        transactionInSpecificEndDay,
        allTranBeforeEndDay,
        // selectedType,
        selectedMonth,
        startDate,
        endDate,
        allTransactionBalance,
        expenseSum,
        incomeSum,
        monthFiler,
        // typeFilter,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

function useTransaction() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      'TransactionContext is used outside the TransactionProvider'
    );
  }
  return context;
}

export { TransactionProvider, useTransaction };
