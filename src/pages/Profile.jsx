import React, { useState } from "react";
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import Login from "../components/Login";
import UserProfile from "./UserProfile";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const [check, setCheck] = useState(false);

  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <Navbar />

      {isLoggedIn ? (
        <UserProfile />
      ) : (
        // Show Login or Signup only if user is not logged in
        <>
          {check ? (
            <Signup check={check} setCheck={setCheck} />
          ) : (
            <Login check={check} setCheck={setCheck} />
          )}
        </>
      )}

      <Link to="/admin">
        <button style={{border:'none',backgroundColor:'red',padding:'15px',color:'white'}}>Open Admin Panel</button>
      </Link>

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default Profile;
