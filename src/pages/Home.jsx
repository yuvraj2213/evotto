import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/ContactUs.css";
import "../styles/Fireworks.css"; // Import Fireworks CSS
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Chatbox from "../components/Chatbox";
import SocialLinks from "../components/SocialLinks";
import Slideshow from "../components/Slideshow";
import Firework from "../components/Firework";
import Safety from "../components/Safety";
import KnowUs from "../components/KnowUs";
import FeedbackSlideshow from "../components/FeedbackSlideshow";
import RideOptions from "../components/RideOptions";
import FormSwitcher from "../components/FormSwitcher";
import ImpactSection from "../components/ImpactSection";
import { useAuth } from "../store/auth";

const Home = () => {
  

  return (
    <>
      <Navbar />
      <div className="home">
        <header className="hero-section">
          <HeroSection />
        </header>
        <section className="safety-for-all-home">
          <Safety />
        </section>

        <RideOptions />
        <section className="know-us-better-home">
          <KnowUs />
        </section>
        <section className="home-impact-section">
          <ImpactSection />
        </section>

        <section className="services">
          <Services />
        </section>
        <section className="feedback-slideshow">
          <FeedbackSlideshow />
        </section>
        {/* <FormSwitcher /> */}
        <section className="social-links">
          <SocialLinks />
        </section>
        <Chatbox />
      </div>
      <Footer />
    </>
  );
};

export default Home;
