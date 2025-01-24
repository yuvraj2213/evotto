import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";

const Express = () => {
  return (
    <>
      <Navbar />

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
    </>
  );
};

export default Express;
