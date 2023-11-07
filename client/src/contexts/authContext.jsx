import { createContext, useContext, useReducer } from 'react';

function formatUserName(name) {
  const newName = name.toLowerCase();
  const firstLetter = newName.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = newName.slice(1);
  const capitalizedName = firstLetterCap + remainingLetters;

  return capitalizedName;
}

const AuthContext = createContext();
const initalState = {
  user: {},
  userName: '',
  loading: false,
  isLoggedIn: false,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'loaded':
      return { ...state, loading: false };
    case 'getUserName':
      return { ...state, userName: action.payload };
    case 'loginIsTrue':
      return {
        ...state,
        isLoggedIn: true,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'loginIsFalse':
      return { ...state, isLoggedIn: false, isAuthenticated: false, user: {} };
    default:
      throw new Error('Unknow action type');
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);

  const { user, userName, loading, isLoggedIn, isAuthenticated } = state;

  function getLoginUserData(userData) {
    dispatch({ type: 'loginIsTrue', payload: userData });
    const userName = formatUserName(userData.name);
    getUserName(userName);
  }

  function getUserName(name) {
    dispatch({ type: 'getUserName', payload: name });
  }

  function logoutUserData() {
    dispatch({ type: 'loginIsFalse' });
  }

  //Update user data
  function updateUser(oldUserData, newUserData) {
    const updatedData = Object.assign({}, oldUserData, newUserData);
    dispatch({ type: 'loginIsTrue', payload: updatedData });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userName,
        loading,
        isLoggedIn,
        isAuthenticated,
        updateUser,
        getUserName,
        getLoginUserData,
        logoutUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('AuthContext is used outside the ModalProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
