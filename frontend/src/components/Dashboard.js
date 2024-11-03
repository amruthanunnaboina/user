import React, { useEffect, useState } from 'react';
import { uploadPhoto, getUserProfile, updateUserProfile } from '../api';
import './Dashboard.css';

const Dashboard = ({isDarkMode}) => {
  const [user, setUser] = useState(null);
  const [activityFeed, setActivityFeed] = useState([]); 
  const [friends, setFriends] = useState([]); 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
        
        const profileData = await getUserProfile(userData.email); 
        setUser(prev => ({ ...prev, photo: profileData.photo ,name:profileData.name}));
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    const token = localStorage.getItem('token');
  
    if (!file) {
      console.error("No file selected");
      return; 
    }
  
    try {
      const { data } = await uploadPhoto(file, token);
      console.log("upload data", data);
      setUser((prevUser) => ({ ...prevUser, photo: data.photo })); 
      setDropdownVisible(false);
    } catch (error) {
      console.error('Photo upload failed:', error);
    }
  };
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

if (!user) {
    return (
      <div className="dashboard">
        <h2>Welcome to the User App</h2>
        <div className="login-register">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    );
  }
  return (
    <div className="dashboard">
      <div className="header">
        <h2>Welcome, {user?.name}</h2>
        <button onClick={toggleDropdown} className="profile-button">
          {user?.photo ? (
            <img src={`data:image/jpeg;base64,${user.photo}`} alt="Profile" />
          ) : (
            'Profile'
          )}
        </button>
        {dropdownVisible && (
          <div className="dropdown">
             <label htmlFor="fileUpload">Upload Photo</label>
             <input type="file" id="fileUpload" onChange={handlePhotoUpload} />
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="content">
        <p>Last Login: {new Date(user?.lastLoginTime).toLocaleString()}</p>
        <h3>Activity Feed:</h3>
        <ul>
          {activityFeed.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
        <h3>Friends List:</h3>
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>{friend.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
