import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminPage from './pages/AdminPage';
import ManageUsers from './pages/ManageUsers';
import AllTransactions from './pages/AllTransactions';

const AdminRoutes = () => {
  const isAuthenticated = true;

  return (
    <>
      {isAuthenticated && <AdminSidebar />}
      <div style={{ marginLeft: isAuthenticated ? '260px' : '0', padding: '20px', width: '100%', backgroundColor: '#fff', boxShadow: '3px 3px 10px 3px #dddddd;' }}>
        <Routes>
          <Route path="/dashboard" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path="/manage-users" element={isAuthenticated ? <ManageUsers /> : <Navigate to="/login" />} />
          <Route path="/all-transaction" element={isAuthenticated ? <AllTransactions /> : <Navigate to="/login" />} />
     
        </Routes>
      </div>
    </>
  );
};

export default AdminRoutes;