import React, { useState } from 'react';
import { getWalletBalance } from './api';

const CheckBalance = () => {
  const [walletId, setWalletId] = useState('');
  const [balance, setBalance] = useState(null);

  const handleCheckBalance = async () => {
    try {
      const response = await getWalletBalance(walletId);
      console.log('Response:', response);

      setBalance(response);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Check Balance</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Enter Wallet ID"
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
      />
      <button style={styles.button} onClick={handleCheckBalance}>
        Check Balance
      </button>
      {balance !== null && <p style={styles.balance}>Balance: {balance}</p>}
    </div>
  );
};

const styles = {
  container: {
    
    margin: "20px",
    marginLeft: "50px",
    padding: "20px",
    backgroundColor: "#e0e5ec",
    maxWidth: "800px",
    borderRadius: "15px",
    boxShadow: "6px 6px 10px #b8b9be, -6px -6px 10px #ffffff",
  },
  header: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  input: {
    width: '250px',
    height: '40px',
    border: 'none',
    borderRadius: '15px',
    padding: '10px',
    boxShadow: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff',
    marginBottom: '20px',
    outline: 'none',
    fontSize: '16px',
  },
  button: {
    width: '150px',
    height: '40px',
    border: 'none',
    borderRadius: '15px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '4px 4px 8px #bebebe, -4px -4px 8px #ffffff',
    transition: 'all 0.3s',
  },
  balance: {
    fontSize: '18px',
    color: '#333',
    marginTop: '20px',
  },
};

export default CheckBalance;
