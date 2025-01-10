import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import DriverForm from "../components/DriverForm";
import UploadImage from "../components/ImageUploader";
import ImageUploader from "../components/ImageUploader";

const Driver = () => {
  return (
    <>
      <Navbar />

      <DriverForm/>

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
      
    </>
  );
};

export default Driver;
