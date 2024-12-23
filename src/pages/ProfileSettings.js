import React, { useState, useEffect } from 'react';

const ProfileSettings = () => {
  const [userData, setUserData] = useState({ name: '', email: '', phoneNumber: '' });

  useEffect(() => {
    // Fetch user profile data
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user-profile');
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        // alert('Error fetching profile.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile.');
    }
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <label>
        Name:
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </label>
      <br />
      <label>
        Phone Number:
        <input
          type="text"
          value={userData.phoneNumber}
          onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
        />
      </label>
      <br />
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
};

export default ProfileSettings;
