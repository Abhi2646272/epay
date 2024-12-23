import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
// import AdminPage from './components/AdminPage';
// import ManageUsers from './components/ManageUsers'; // Example admin-specific component

const AdminRoutes = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated && <AdminSidebar />}
      <div style={{ marginLeft: isAuthenticated ? '260px' : '0', padding: '20px', width: '100%', backgroundColor: '#fff', boxShadow: '3px 3px 10px 3px #dddddd;' }}>
        <Routes>
          {/* <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} />
          <Route path="/manage-users" element={isAuthenticated ? <ManageUsers /> : <Navigate to="/login" />} /> */}
          {/* Add more admin-specific routes here */}
        </Routes>
      </div>
    </>
  );
};

export default AdminRoutes;