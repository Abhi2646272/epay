import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';  // Change this to your API URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

 
// API call to register a user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response.data; // Return the response data (e.g., walletId)
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// API call to login a user
export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/login', loginData);
    return response.data; // Return response (e.g., token)
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// API call to fetch all users (for Admin)
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users');
    return response.data; // Return all users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// API call to fetch all transactions (for Admin)
export const getAllTransactions = async () => {
  try {
    const response = await api.get('/admin/transactions');
    return response.data; // Return all transactions
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// API call to get wallet balance for a user
export const getWalletBalance = async (walletId) => {
  try {
    const response = await api.get(`/wallet/${walletId}/balance`);
    return response.data; // Return the balance
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    throw error;
  }
};

// API call to send money
export const sendMoney = async (transactionData) => {
  try {
    const txnReq = {walletId:transactionData.upi, amount:transactionData.amount};
    const response = await api.post('/wallet/add-money', transactionData);
    return response.data; // Return transaction success
  } catch (error) {
    console.error('Error sending money:', error);
    throw error;
  }
};

// API call to get transaction history for a user
export const getTransactionHistory = async (walletId) => {
  try {
    const response = await api.get(`/wallet/${walletId}/transactions`);
    return response.data; // Return transaction history
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const addMoneyToWallet = async (transactionData) => {
  try {
    const requestPayload = {
      walletId: transactionData.walletId,
      amount: transactionData.amount,
      description: transactionData.description,
    };
    const response = await api.post('/wallet/add-money', requestPayload);
    return response.data; // Success response
  } catch (error) {
    console.error('Error adding money to wallet:', error);
    throw error;
  }
};

// Send Money to Bank
export const sendToBank = async (transactionData) => {
  try {
    const requestPayload = {
      accountNumber: transactionData.accountNumber,
      amount: transactionData.amount,
      description: transactionData.description,
    };
    const response = await api.post('/wallet/send-to-bank', requestPayload);
    return response.data; // Success response
  } catch (error) {
    console.error('Error sending money to bank:', error);
    throw error;
  }
};

// Send Money to Another Wallet
export const sendToWallet = async (transactionData) => {
  try {
    const requestPayload = {
      senderWalletId: transactionData.senderWalletId,
      receiverWalletId: transactionData.receiverWalletId,
      amount: transactionData.amount,
      description: transactionData.description,
    };
    const response = await api.post('/wallet/transfer', requestPayload);
    return response.data; // Success response
  } catch (error) {
    console.error('Error sending money to another wallet:', error);
    throw error;
  }
};