import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";

const Blogs = () => {
  return (
    <>
      <Navbar />
      <div className="comingsoon-heading">
        <h2 style={{color:'#e71d36'}}>Blogs Section Will Be Available Soon</h2>
        <h3 style={{color:'#e95e36'}}>Stay Tuned</h3>
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

export default Blogs;
