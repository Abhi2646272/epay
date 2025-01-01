import React, { useState, useEffect } from 'react';
import { getAllTransactions } from './api'; // Adjust your API imports

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    user: '',
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
  });
  const [activeTab, setActiveTab] = useState('user'); // Default tab

  useEffect(() => {
    // Fetch all transactions when the component mounts
    const fetchTransactions = async () => {
      try {
        const data = await getAllTransactions(filters); // API call with filters
        setTransactions(data); // Store the fetched transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Transactions</h2>
    <div style={styles.card}>
    <div style={styles.tabs}>
        <button
          style={activeTab === 'user' ?  { ...styles.tab, ...styles.activeTab } : styles.tab}
          onClick={() => setActiveTab('user')}
        >
          User Filter
        </button>
        <button
          style={activeTab === 'date' ?  { ...styles.tab, ...styles.activeTab }: styles.tab}
          onClick={() => setActiveTab('date')}
        >
          Date Filter
        </button>
        <button
          style={activeTab === 'amount' ? { ...styles.tab, ...styles.activeTab }: styles.tab}
          onClick={() => setActiveTab('amount')}
        >
          Amount Filter
        </button>
      </div>

      {/* Dynamic Filter Inputs */}
      {activeTab === 'user' && (
        <div style={styles.filterSection}>
          <label style={styles.label}>
            Filter by User:
            <input
              type="text"
              name="user"
              value={filters.user}
              onChange={handleFilterChange}
              style={styles.input}
              placeholder="Search User"
            />
          </label>
        </div>
      )}

      {activeTab === 'date' && (
        <div style={styles.filterSection}>
          <label style={styles.label}>
            Date From:
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Date To:
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </label>
        </div>
      )}

      {activeTab === 'amount' && (
        <div style={styles.filterSection}>
          <label style={styles.label}>
            Min Amount:
            <input
              type="number"
              name="minAmount"
              value={filters.minAmount}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Max Amount:
            <input
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleFilterChange}
              style={styles.input}
            />
          </label>
        </div>
      )}
    </div>
      
      {/* Transactions Table */}
      <div style={styles.transactions}>
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
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td style={styles.td}>{transaction.id}</td>
                <td style={styles.td}>{transaction.sender}</td>
                <td style={styles.td}>{transaction.receiver}</td>
                <td
                  style={
                    transaction.amount < 0 ? styles.negative : styles.positive
                  }
                >
                  {transaction.amount}
                </td>
                <td style={styles.td}>{transaction.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: "20px",
    marginLeft: "50px",
    padding: "20px",
    maxWidth: "800px",
    borderRadius: "15px",
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    padding: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff',
  },
  title: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  tabs: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
 
  tab: {
    flex: 1,
    padding: '10px',
    margin: '0 5px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#e0e0e0',
    boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
    textAlign: 'center',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    backgroundColor: '#d1d1d1',
    boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
    color: '#333',
  },
//   filterSection: {
//     marginBottom: '10px',
//   },
  label: {
    marginBottom: '15px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
  width: '100%',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#e0e0e0',
    boxShadow: 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff',
    marginTop: '5px',
    fontSize: '14px',
    outline: 'none',
    color: '#333',
    },
  transactions: {
    marginTop: '20px',
    width: '100%',
    padding: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '15px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
};

export default AllTransactions;
