import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('auth');
    const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage
    setIsAuthenticated(authStatus === 'true');
    setIsAdmin(userRole === 'admin');
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '20px', width: '100%', backgroundColor: '#fff', boxShadow: '3px 3px 10px 3px #dddddd;' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {isAdmin ? <Route path="/*" element={<AdminRoutes isAuthenticated={isAuthenticated} />} /> : <Route path="/*" element={<UserRoutes isAuthenticated={isAuthenticated} />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
