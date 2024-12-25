import React, { useState } from "react";
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import Login from "../components/Login";
import { useAuth } from "../store/auth";

const Profile = () => {
  const [check, setCheck] = useState(false);

  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <Navbar />
      {console.log("Is Logged In:", isLoggedIn)}

      {/* Show greeting if user is logged in */}
      {isLoggedIn ? (
        <h1>Hy {user?.userData?.name || "User"}</h1>
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

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default Profile;
