import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [walletId, setWalletId] = useState('');
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/wallet/${walletId}/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
    //   alert('Error fetching transactions.');
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      <input
        type="text"
        placeholder="Enter Wallet ID"
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
      />
      <button onClick={fetchTransactions}>View Transactions</button>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.transactionId}>
            {tx.date}: {tx.amount} {tx.type} (to/from {tx.party})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
