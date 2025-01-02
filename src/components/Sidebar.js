import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    navigate('/login');
     
  };
  
  return (
    <div className="sidebar">
        <h2 style={ 
            {
                fontFamily:'sans-serif',
                textAlign:'center',
                fontStyle:'italic',
                fontSize:'35px',
                marginRight:'10px',
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
        {/* <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li> */}
        <li><Link to="/user/send-money">Send Money</Link></li>
        <li><Link to="/user/send-money">UPI Transfer</Link></li>

        <li><Link to="/user/check-balance">Check Balance</Link></li>
        <li><Link to="/user/transactions">View Transactions</Link></li>
        <li><Link to="/user/manage-beneficiaries">Bill Payment</Link></li>
        <li><Link to="/user/profile-settings">Bank Accounts</Link></li>

        <li><Link to="/user/profile-settings">Profile Settings</Link></li>
        <li><button onClick={handleLogout} style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: '#e74c3c',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}>Logout</button></li>

      </ul>
    </div>
  );
};

export default Sidebar;
