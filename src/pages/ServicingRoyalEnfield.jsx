import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import "../styles/ServicingRoyalEnfield.css";
import ServicingForm from "../components/ServicingForm";
import ServicingFormRE from "../components/ServicingFormRE";

const ServicingRoyalEnfield = () => {
  return (
    <>
      <Navbar />

      {/* Royal Enfield Banner with Heading */}
      <section className="re-banner-container">
        <div className="re-banner-heading">
          <h1>Welcome to Royal Enfield Servicing</h1>
        </div>
        <img
          src="/images/royalEnfield.webp"
          alt="Royal Enfield Servicing"
          className="re-banner-image"
        />
      </section>

      <ServicingFormRE />

      {/* Services Section */}
      <section className="re-services-section">
        <h2 className="re-section-title">Our Premium Servicing Packages</h2>
        <div className="re-services-container">
          <div className="re-service-card">
            <h3>Basic Servicing</h3>
            <p>
              Includes oil change, chain lubrication, and a 20-point check-up
              for smooth rides.
            </p>
          </div>
          <div className="re-service-card">
            <h3>Advanced Care</h3>
            <p>
              Detailed engine diagnostics, brake maintenance, and complete fluid
              replacements.
            </p>
          </div>
          <div className="re-service-card">
            <h3>Premium Detailing</h3>
            <p>
              PPF coating, ceramic polishing, and deep cleaning to make your
              bike shine.
            </p>
          </div>
        </div>
      </section>

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
    </>
  );
};

export default ServicingRoyalEnfield;
