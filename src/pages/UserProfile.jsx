import React, { useEffect } from "react";
import "../styles/UserProfile.css"; 
import { useAuth } from "../store/auth";

const UserProfile = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  if (!user || !user.userData) {
    return <div>Loading...</div>; 
  }

  const User = user?.userData;

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
            <span className="value">{User?.name || "Not Available"}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Email:</span>
            <span className="value">{User?.email || "Not Available"}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Phone:</span>
            <span className="value">{User?.phone || "Not Available"}</span>
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
