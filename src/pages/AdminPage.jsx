import React, { useEffect, useState } from 'react';
import { getAllUsers, getAllTransactions } from './api';  // Import API calls

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data); // Store the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch all transactions
  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data); // Store the fetched transactions
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTransactions();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Dashboard</h2>

      {/* Users Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Users</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Wallet ID</th>
              <th style={styles.th}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.walletId}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.walletId}</td>
                <td style={styles.td}>{user.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transactions Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Transactions</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Transaction ID</th>
              <th style={styles.th}>Sender</th>
              <th style={styles.th}>Receiver</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td style={styles.td}>{tx.id}</td>
                <td style={styles.td}>{tx.sender}</td>
                <td style={styles.td}>{tx.receiver}</td>
                <td
                  style={{
                    ...styles.td
                     
                  }}
                >
                  {tx.amount}
                </td>
                <td style={styles.td}>{tx.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#e0e5ec',
    maxWidth: '900px',
    margin: '20px auto',
    borderRadius: '15px',
    boxShadow: '6px 6px 10px #b8b9be, -6px -6px 10px #ffffff',
  },
  title: {
    marginBottom: '20px',
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '1.5em',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '15px 20px',
    border: '1px solid #d9dee3',
    backgroundColor: '#f0f2f5',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  td: {
    padding: '15px 20px',
    border: '1px solid #d9dee3',
  },
  negative: {
    color: 'red',
  },
  positive: {
    color: 'green',
  },
};

export default AdminPage;
