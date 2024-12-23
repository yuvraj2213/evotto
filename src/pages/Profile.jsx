import React from "react";
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";

const Profile = () => {
  return (
    <>
      <Navbar />
      <Signup />

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default Profile;
