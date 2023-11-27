// EditProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    
    axios.get('http://localhost:3001/users/') 
      .then(response => setUserData(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  }, []); 

  const handlePasswordChange = () => {
  
    const updatedUserData = { ...userData, password: newPassword };

    axios.put(`http://localhost:3001/users/${userData.id}`, updatedUserData)
      .then(response => {
        console.log('Password changed successfully!', response.data);
      })
      .catch(error => console.error('Error updating password:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Edit Profile</h2>
  
      
      <form className="mt-3">
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Current Password:</label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password:</label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handlePasswordChange}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
