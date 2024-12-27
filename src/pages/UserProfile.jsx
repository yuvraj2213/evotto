import React from "react";
import "../styles/UserProfile.css"; // Assuming the CSS will be in this file
import { useAuth } from "../store/auth";

const UserProfile = () => {
  const { user } = useAuth();
  
  // Check if user or userData is undefined
  if (!user || !user.userData) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or message
  }

  const User = user.userData;

  const handleEditProfile = () => {
    alert("Profile editing feature coming soon!");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>
        <div className="profile-info">
          <div className="profile-detail">
            <span className="label">Name:</span>
            <span className="value">{User.name}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Email:</span>
            <span className="value">{User.email}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Phone:</span>
            <span className="value">{User.phone}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button className="edit-btn" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
