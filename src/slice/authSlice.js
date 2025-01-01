// src/slice/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,  // to track login status
  userData: null,          // to store user data
  walletId: null, 
  balance: 0,         // to store walletId
  error: null,             // to store any errors
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.walletId = action.payload.walletId;  // Store walletId after login
      state.balance = action.payload.balance;
    },
    setWalletBalance: (state, action) => {
      state.balance = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.walletId = null;  // Clear walletId on logout
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError } = authSlice.actions;

export default authSlice.reducer;
