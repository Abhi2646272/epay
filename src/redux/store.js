import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../slice/authSlice';

export const store = configureStore({
  reducer: {
    api: apiReducer,  // Integrate the apiSlice reducer here
  },
});
