import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../src/AuthProvider';
import LoginRegisterNeuromorphic from './pages/Login';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

const App = () => {
  // const { isAuthenticated, role } = React.useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginRegisterNeuromorphic />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<UserRoutes />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
