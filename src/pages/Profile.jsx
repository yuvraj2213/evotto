import React, { useState } from "react";
import Signup from "../components/Signup";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import Login from "../components/Login";

const Profile = () => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <Navbar />
      {check ? <Signup check={check} setCheck={setCheck} /> : <Login check={check} setCheck={setCheck} />}

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default Profile;
