import React, { useState } from 'react';
import { addMoneyToWallet, sendToBank, sendToWallet } from './api'; // Import API functions
import { useSelector } from 'react-redux';

const WalletActions = () => {
  const [activeTab, setActiveTab] = useState('addMoney');
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    accountNumber: '', // For Send to Bank
    walletId: '', // For Send to Wallet
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const walletId = useSelector((state) => state.auth.walletId); // Access walletId from Redux store

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let response;
      switch (activeTab) {
        case 'addMoney':
          response = await addMoneyToWallet({
            walletId: walletId, // Hardcoded wallet ID for now
            amount: formData.amount,
            description: formData.description,
          });
          break;
        case 'sendToBank':
          response = await sendToBank({
            amount: formData.amount,
            description: formData.description,
            accountNumber: formData.accountNumber,
          });
          break;
        case 'sendToWallet':
          response = await sendToWallet({
            amount: formData.amount,
            description: formData.description,
            walletId: formData.walletId,
          });
          break;
        default:
          throw new Error('Invalid action');
      }
      setMessage('Action successful!');
    } catch (error) {
      setMessage('Action failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Tabs */}
        <div style={styles.tabContainer}>
          <button
            style={activeTab === 'addMoney' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('addMoney')}
          >
            Add Money to Wallet
          </button>
          <button
            style={activeTab === 'sendToBank' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('sendToBank')}
          >
            Send to Bank
          </button>
          <button
            style={activeTab === 'sendToWallet' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('sendToWallet')}
          >
            Send to Wallet
          </button>
        </div>

        {/* Form */}
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            style={styles.input}
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            style={styles.textarea}
            placeholder="Enter Remark/Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {activeTab === 'sendToBank' && (
            <input
              type="text"
              name="accountNumber"
              style={styles.input}
              placeholder="Enter Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          )}

          {activeTab === 'sendToWallet' && (
            <input
              type="text"
              name="walletId"
              style={styles.input}
              placeholder="Enter Wallet ID"
              value={formData.walletId}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {/* Message */}
        {message && <div style={styles.message}>{message}</div>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px",
    marginLeft: "50px",
    padding: "20px",
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '500px',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff',
    padding: '14px',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  tab: {
    flex: 1,
    padding: '10px',
    margin: '0 5px',
    textAlign: 'center',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#e0e0e0',
    color: '#666',
    boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
    borderRadius: '10px',
  },
  activeTab: {
    color: '#333',
    boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#e0e0e0',
    boxShadow: 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff',
    outline: 'none',
    color: '#333',
  },
  textarea: {
    padding: '12px',
    fontSize: '14px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#e0e0e0',
    boxShadow: 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff',
    outline: 'none',
    color: '#333',
    resize: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
  },
  message: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#333',
  },
};

export default WalletActions;
