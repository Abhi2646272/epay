import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from './api'; // Import API functions
import { AuthContext } from '../AuthProvider';

const LoginRegisterNeuromorphic = () => {
  const { login } = useContext(AuthContext);
 
  const [activeTab, setActiveTab] = useState('login');
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
    role: 'USER', // Default role
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      const response = await loginUser(loginData);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('role', response.role);
      console.log('role:', response.role);
      console.log('accessToken:', response.accessToken);
      console.log('res:', response);
      login(response.accessToken, response.user);
 
      console.log('role:', response.role);
      console.log('accessToken:', response.accessToken);
      if(response.role === 'ADMIN'){
      navigate('/admin/dashboard');
      }else{
      navigate('/user/send-money');}
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        password: formData.password,
      };
      const response = await registerUser(userData);
      alert(`Registration successful! Your Wallet ID: ${response.walletId}`);
      setActiveTab('login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Tabs */}
        <div style={styles.tabContainer}>
          <button
            style={activeTab === 'login' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            style={activeTab === 'register' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>

        {/* Error Message */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Form Content */}
        <div style={styles.formContainer}>
          {activeTab === 'login' ? (
            <form style={styles.form} onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                style={styles.input}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                style={styles.input}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form style={styles.form} onSubmit={handleRegister}>
              <input
                type="text"
                name="name"
                style={styles.input}
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                style={styles.input}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                style={styles.input}
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <select
                name="role"
                style={styles.input}
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              <input
                type="password"
                name="password"
                style={styles.input}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                style={styles.input}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    width: '420px',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    boxShadow: '15px 15px 30px #bebebe, -15px -15px 30px #ffffff',
    padding: '14px',
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '10px',
  },
  tab: {
    flex: 1,
    padding: '10px',
    margin: '0 10px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#e0e0e0',
    color: '#666',
    boxShadow: '5px 5px 10px #bebebe, -5px -5px 10px #ffffff',
    borderRadius: '12px',
    transition: 'all 0.3s',
  },
  activeTab: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    boxShadow: 'inset 5px 5px 10px #bebebe, inset -5px -5px 10px #ffffff',
  },
  formContainer: {
    padding: '10px 6px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    marginBottom: '20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#e0e0e0',
    boxShadow: 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff',
    outline: 'none',
    color: '#333',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '3px 3px 6px #bebebe, -3px -3px 6px #ffffff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

export default LoginRegisterNeuromorphic;
