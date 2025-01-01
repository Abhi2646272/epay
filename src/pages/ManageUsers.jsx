import React, { useState, useEffect } from 'react';
import { getAllUsers } from './api'; // Adjust your API imports

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
  });

  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data); // Store the fetched users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manage Users</h2>

      {/* Filter by name */}
      <div style={styles.filters}>
        <label>
          Search by Name:
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </label>
      </div>

      {/* Users Table */}
      <div style={styles.users}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Wallet ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.walletId}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.walletId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    maxWidth: '900px',
    margin: '20px auto',
    borderRadius: '15px',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  filters: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
    maxWidth: '300px',
    marginTop: '10px',
  },
  users: {
    marginTop: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '15px',
    border: '1px solid #ddd',
    backgroundColor: '#f4f4f4',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
  },
};

export default ManageUsers;
