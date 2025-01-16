import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReturnPolicy from "../components/ReturnPolicy";
import SocialLinks from "../components/SocialLinks";

const ReturnPolicyPage = () => {
  return (
    <>
      <Navbar />
      <ReturnPolicy />
      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default ReturnPolicyPage;
