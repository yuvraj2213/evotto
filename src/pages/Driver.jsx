import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import DriverForm from "../components/DriverForm";

const Driver = () => {
  return (
    <>
      <Navbar />

      <DriverForm/>

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
      <></>
    </>
  );
};

export default Driver;
