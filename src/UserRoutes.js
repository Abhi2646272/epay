import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SendMoney from './pages/SendMoney';
import CheckBalance from './pages/CheckBalance';
import Transactions from './pages/Transactions';
import ManageBeneficiaries from './pages/ManageBeneficiaries';
import ProfileSettings from './pages/ProfileSettings';

const UserRoutes = () => {
  // const { isAuthenticated } = React.useContext(AuthContext);
  const isAuthenticated = true;
  return (
    <>
      {isAuthenticated && <Sidebar />}
      <div style={{ marginLeft: isAuthenticated ? '260px' : '0', padding: '20px', width: '100%'  }}>
        <Routes>
          <Route path="/send-money" element={isAuthenticated ? <SendMoney /> : <Navigate to="/login" />} />
          <Route path="/check-balance" element={isAuthenticated ? <CheckBalance /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
          <Route path="/manage-beneficiaries" element={isAuthenticated ? <ManageBeneficiaries /> : <Navigate to="/login" />} />
          <Route path="/profile-settings" element={isAuthenticated ? <ProfileSettings /> : <Navigate to="/login" />} />
          {/* Add more user-specific routes here */}
        </Routes>
      </div>
    </>
  );
};

export default UserRoutes;