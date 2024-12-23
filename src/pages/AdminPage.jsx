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
      <h1>Admin Dashboard</h1>
      <div style={styles.section}>
        <h2>Users</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Wallet ID</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.walletId}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.walletId}</td>
                <td>{user.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h2>Transactions</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.sender}</td>
                <td>{tx.receiver}</td>
                <td>{tx.amount}</td>
                <td>{tx.timestamp}</td>
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
    backgroundColor: '#f4f4f4',
  },
  section: {
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  tableHead: {
    backgroundColor: '#f2f2f2',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
};

export default AdminPage;
