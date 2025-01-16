import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PrivacyPolicy from "../components/PrivacyPolicy";
import SocialLinks from "../components/SocialLinks";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Navbar />
      <PrivacyPolicy/>

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;
