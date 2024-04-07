import React, { useState, useEffect } from 'react';
import defaultProfilePic from '../assets/avatar.jpg'; // Path to your default profile image


const Sidebar = () => {
  const [user, setUser] = useState({
    photoUrl: '', // Initialize with empty string or fetch from user data
    // ... other user fields
  });

  useEffect(() => {
    // TODO: Fetch the user data from the server or context/state management
    // For now, we are using hardcoded data
    const userData = {
      photoUrl: '', // Replace with actual photo URL if available
      // ... other user fields
    };
    setUser(userData);
  }, []);

  // Function to get the user's photo or a default one
  const getProfilePic = () => {
    return user.photoUrl || defaultProfilePic;
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <img src={getProfilePic()} alt="Profile" className="rounded-circle" width="40" height="40" />
        <span className="fs-4">My Profile</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Home
          </a>
        </li>
        
      </ul>
      <br></br>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Update profile
          </a>
        </li>
        
      </ul>
      <br></br>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            User Information
          </a>
        </li>
       
      </ul>
      <hr />
      
    </div>
  );
};

export default Sidebar;
