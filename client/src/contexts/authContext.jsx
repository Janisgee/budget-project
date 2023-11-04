import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();
const initalState = {
  user: {},
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

  const { user, loading, isLoggedIn, isAuthenticated } = state;

  function getLoginUserData(userData) {
    dispatch({ type: 'loginIsTrue', payload: userData });
  }

  function formatUserName(name) {
    const userName = name.toLowerCase();
    const firstLetter = userName.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = userName.slice(1);
    const capitalizedName = firstLetterCap + remainingLetters;

    return capitalizedName;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn,
        isAuthenticated,
        getLoginUserData,
        formatUserName,
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
