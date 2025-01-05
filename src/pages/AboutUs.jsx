import React from "react";
import "../styles/AboutUs.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import Achievement from "../components/Achievement";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="about-us">
        <div className="about-header">
          <h1>
            Welcome to <span className="highlight">Evotto Rentals</span>
          </h1>
          <p>Your One-Stop Solution for All Automobile Needs!</p>
        </div>
        <div className="about-content">
          <p>
            At Evotto Rentals, we simplify your automobile experience with a
            comprehensive platform tailored to meet your needs. Whether you're
            looking for rental services, hassle-free automobile servicing,
            booking a second-hand car, or hiring a reliable driver, we’ve got
            you covered.
          </p>
          <div className="features">
            <div className="feature-card">
              <h3>🚗 Rental Services</h3>
              <p>
                Choose from a wide range of vehicles that cater to every
                occasion, from daily commutes to weekend getaways.
              </p>
            </div>
            <div className="feature-card">
              <h3>🔧 Automobile Servicing</h3>
              <p>
                Reliable and efficient servicing options to keep your vehicle in
                top-notch condition.
              </p>
            </div>
            <div className="feature-card">
              <h3>🚘 Second-Hand Car Booking</h3>
              <p>
                Find your perfect pre-owned vehicle with a transparent and
                stress-free process.
              </p>
            </div>
            <div className="feature-card">
              <h3>🧑‍✈️ Driver Rentals</h3>
              <p>
                Professional drivers you can trust, whenever and wherever you
                need them.
              </p>
            </div>
          </div>
          <p className="mission">
            Experience a smarter, more efficient way to manage your automobile
            needs—all under one roof. Evotto Rentals: redefining convenience,
            one ride at a time!
          </p>
        </div>
      </section>
      <section className="achievement-main">
        <Achievement/>
      </section>
      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer/>
    </>
  );
};

export default AboutUs;
