import React,{useState,useEffect} from 'react'
import { useSetState } from 'react-use';
export const AuthContext = React.createContext(null);
const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null
}
export const AuthProvider = ({children}) =>{
  const [state, setState] = useSetState(initialState);

  const setLoginPending = (isLoginPending) => setState({isLoginPending});
  const setLoginSuccess = (isLoggedIn) => setState({isLoggedIn});
  const setLoginError = (loginError) => setState({loginError});

  const [currentUser , setCurrentUser] = useState(null)

  const login = (phone, username,userdata) => {
    setLoginPending(true);
    setLoginSuccess(false);
    setLoginError(null);

    fetchLogin( phone, username,userdata, error => {
      setLoginPending(false);

      if (!error) {
        setLoginSuccess(true);
      } else {
        setLoginError(error);
      }
    })
  }
  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
  }

  return (
    <AuthContext.Provider
    value={{
      state,
      login,
      logout,
    }}
    >
      {children}

    </AuthContext.Provider>
  )
}

// fake login
const fetchLogin = (phone, username,userdata, callback) => 
  setTimeout(() => {
    if (phone === userdata.phone && username === userdata,name) {
      return callback(null);
    } else {
      return callback(new Error('Invalid email and password'));
    }
  }, 1000);