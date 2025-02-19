import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import ServicingForm from "../components/ServicingForm";
import { Link } from "react-router-dom";

const Servicing = () => {
  return (
    <>
      <Navbar />

      <Link to="/servicingRoyalEnfield" className="styled-link">
        Royal Enfield Servicing
      </Link>
      <ServicingForm />

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
    </>
  );
};

export default Servicing;
