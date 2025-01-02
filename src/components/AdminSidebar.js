import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    navigate('/login');
     
  };
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul className="sidebar-list">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/manage-users">Manage Users</Link></li>
        <li><Link to="/admin/all-transaction">All Transactions</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
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
        {/* Add more admin-specific links here */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
