// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,  // Include authReducer to manage authentication state
  },
});

export default store;
