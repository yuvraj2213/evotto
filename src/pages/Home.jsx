import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import "../styles/Fireworks.css"; // Import Fireworks CSS
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Chatbox from "../components/Chatbox";
import SocialLinks from "../components/SocialLinks";
import Slideshow from "../components/Slideshow";
import Firework from "../components/Firework"; // Import the Firework component

const Home = () => {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const generateFireworks = () => {
      const bursts = [];
      for (let i = 0; i < 20; i++) {
        bursts.push({
          top: Math.random() * 80 + "vh",
          left: Math.random() * 100 + "vw",
          animationDuration: Math.random() * 2 + 1 + "s",
          animationDelay: Math.random() * 2 + "s",
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`, // Random color
        });
      }
      setFireworks(bursts);
    };

    generateFireworks();
  }, []);

  return (
    <>
      <div className="fireworks-overlay">
        {fireworks.map((burst, index) => (
          <Firework key={index} style={burst} />
        ))}
      </div>
      <Navbar />
      <div className="home">
        <header className="hero-section">
          <HeroSection />
        </header>
        <section className="slideshow">
          <Slideshow />
        </section>
        <section className="services">
          <Services />
        </section>
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
