import React, { useState, useEffect } from "react";
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import Login from "../components/Login";
import UserProfile from "./UserProfile";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import "../styles/Profile.css";

const Profile = () => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

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

  // Use an effect to simulate waiting for `user` data to load
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

  return (
    <>
      <Navbar />

      {isLoggedIn ? (
        <UserProfile name={userDetails.name} email={userDetails.email} phone={userDetails.phone}/>
      ) : (
        <>
          {check ? (
            <Signup check={check} setCheck={setCheck} />
          ) : (
            <Login check={check} setCheck={setCheck} />
          )}
        </>
      )}

      {userDetails && userDetails.isAdmin && (
        <div className="profile-admin-btn">
          <Link to="/admin">
            <button>Open Admin Panel</button>
          </Link>
        </div>
      )}

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default Profile;
