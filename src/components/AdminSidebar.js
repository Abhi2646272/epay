import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul className="sidebar-list">
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Link to="/all-transaction">All Transactions</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        {/* Add more admin-specific links here */}
      </ul>
    </div>
  );
};

export default AdminSidebar;
