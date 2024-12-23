import React, { useState } from 'react';
import { getWalletBalance } from './api';
const CheckBalance = () => {
  const [walletId, setWalletId] = useState('');
  const [balance, setBalance] = useState(null);

  const handleCheckBalance = async () => {
    try {
      const response = await getWalletBalance(walletId) ;
     
      setBalance(response);
    } catch (error) {
    //   alert('Error fetching balance.');
    }
  };

  return (
    <div style={{marginLeft: '20px'}}>
      <h2 >Check Balance</h2>
      <input
      style={{
        width: '200px',
        height: '40px',
        border: 'none',
        borderRadius:'15px',
        
      }}
        type="text"
        placeholder="Enter Wallet ID"
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
      />
      <button
      style={{
        width:'120px',
        height:'40px',
        marginLeft:'18px',
        border:'none',
       

      }}
      onClick={handleCheckBalance}>Check Balance</button>
      {balance !== null && <p>Balance: {balance}</p>}
    </div>
  );
};

export default CheckBalance;
