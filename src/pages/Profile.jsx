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
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [timeoutReached, setTimeoutReached] = useState(false); // Fallback for stuck state

  const { user, isLoggedIn } = useAuth();
  const User = user?.userData;

  useEffect(() => {
    // If `user` data is already available, stop loading immediately
    if (user) {
      setLoading(false);
    } else {
      // Set a timeout to handle cases where `user` might not load
      const timer = setTimeout(() => setTimeoutReached(true), 5000); // 5 seconds
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [user]);

  // Handle loading fallback state
  if (loading && !timeoutReached) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  // Handle timeout (fallback message or redirect)
  if (!user && timeoutReached) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <p>Unable to load data. Please refresh or try again later.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {console.log("User", User)}

      {isLoggedIn ? (
        <UserProfile />
      ) : (
        <>
          {check ? (
            <Signup check={check} setCheck={setCheck} />
          ) : (
            <Login check={check} setCheck={setCheck} />
          )}
        </>
      )}

      {User && User.isAdmin && (
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
