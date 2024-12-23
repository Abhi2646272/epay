import React, { useState } from 'react';

const SendMoney = () => {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendData = { receiver, amount };
    console.log(sendData); // Replace with API call
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Send Money</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Receiver (Email/Phone Number/UPI ID):
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>Send</button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    margin: 0,
    padding: 0,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    overflow: 'hidden',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    marginBottom: '15px',
    fontSize: '16px',
    color: '#555',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    width: '100%',
  },
};

export default SendMoney;
