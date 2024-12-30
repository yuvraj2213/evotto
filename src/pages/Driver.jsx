import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";

const Driver = () => {
  return (
    <>
      <Navbar />
      <div className="comingsoon-heading">
        <h2>Drivers Section Will Be Available Soon</h2>
        <h3>Stay Tuned</h3>
      </div>

      <div className="second-hand-comingsoon"></div>

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
      <></>
    </>
  );
};

export default Driver;
