import React, { useEffect, useState } from "react";
import "../styles/UserProfile.css";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserProfile = ({ name, email, phone }) => {
  const [loading, setLoading] = useState(true);

  const { user, isLoggedIn } = useAuth();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    if (user && user.userData) {
      setUserDetails(user.userData);
    }
  }, [user]);

  useEffect(() => {
    if (userDetails) {
      console.log("Updated user details:", userDetails);
    }
  }, [userDetails]);

  useEffect(() => {
    if (user) {
      setLoading(false); // Stop loading when `user` is fetched
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <p>Loading..</p>
        </div>
        <Footer />
      </>
    );
  }

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
            <span className="value">{userDetails.name || "Not Available"}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Email:</span>
            <span className="value">{userDetails.email || "Not Available"}</span>
          </div>
          <div className="profile-detail">
            <span className="label">Phone:</span>
            <span className="value">{userDetails.phone || "Not Available"}</span>
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
