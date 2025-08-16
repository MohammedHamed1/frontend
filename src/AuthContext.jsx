import React, { createContext, useEffect, useState } from 'react';
import { setAuthToken } from './api';

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      setIsAuth(true);
    } else {
      setAuthToken(null);
      setIsAuth(false);
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 