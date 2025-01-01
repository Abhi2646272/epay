import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // or useContext if using context
import { login } from './slice/authSlice'; // redux action or your context method
import { createContext } from 'react'; // Make sure createContext is imported
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [walletId, setWalletId] = useState(null); // Local state to hold walletId

  const handleLogin = async (token, user) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    
    // Assuming the response from login contains walletId
    setUserData(user);
    setWalletId(user.walletId); // Store walletId after login

    // Dispatch login to global state (if using Redux)
    dispatch(login({ userData: user, walletId: user.walletId, balance: user.balance })); // Store in global state (Redux or Context)
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    setUserData(null); // Clear user data
    setWalletId(null); // Clear walletId
  };

  return (
    <AuthContext.Provider value={{ userData, walletId, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
