import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role');
    if (accessToken && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const login = (token, role) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setRole(role);
  }; 

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
