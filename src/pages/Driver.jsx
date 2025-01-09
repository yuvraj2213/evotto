import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import DriverForm from "../components/DriverForm";
import UploadImage from "../components/UploadImage";

const Driver = () => {
  return (
    <>
      <Navbar />

      <DriverForm/>

      <section className="social-links">
        <SocialLinks />
      </section>

      <UploadImage/>

      <Footer />
      <></>
    </>
  );
};

export default Driver;
