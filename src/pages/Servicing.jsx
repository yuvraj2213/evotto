import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import ServicingForm from "../components/ServicingForm";

const Servicing = () => {
  return (
    <>
      <Navbar />

      <ServicingForm/>

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
      <></>
    </>
  );
};

export default Servicing;
