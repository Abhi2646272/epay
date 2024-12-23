import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
  return (
    <div className="sidebar">
        <h2 style={ 
            {
                fontFamily:'sans-serif',
                textAlign:'center',
                fontStyle:'italic',
                fontSize:'35px',
                fontWeight: 'bold',
                background: 'linear-gradient(to left, #FF0000 0%, #000000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent', // Ensure the text is transparent to show the background
              }
        }>
            ePay
        </h2>
     <ul className="sidebar-list">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/send-money">Send Money</Link></li>
        <li><Link to="/check-balance">Check Balance</Link></li>
        <li><Link to="/transactions">View Transactions</Link></li>
        <li><Link to="/manage-beneficiaries">Manage Beneficiaries</Link></li>
        <li><Link to="/profile-settings">Profile Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
