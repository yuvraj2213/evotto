import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";
import { useAuth } from "../store/auth";

const UserProfile = ({ name, email, phone }) => {

  console.log(name);

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
            <span className="value">{name || "Not Available"}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Email:</span>
            <span className="value">{email || "Not Available"}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Phone:</span>
            <span className="value">{phone || "Not Available"}</span>
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
