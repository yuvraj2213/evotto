import React from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import "../styles/Express.css";

const Express = () => {
  return (
    <>
      <Navbar />

      {/* Main Content */}
      <div className="express-container">
        {/* Pick-Up and Drop-Off Cards */}
        <div className="cards-container">
          {/* Pick-Up Card */}
          <div className="card">
            <h2>Pick-Up</h2>
            <div className="form-group">
              <label htmlFor="pickup-location">Location</label>
              <input
                type="text"
                id="pickup-location"
                placeholder="Enter pick-up location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pickup-date">Date</label>
              <input type="date" id="pickup-date" />
            </div>
            <div className="form-group">
              <label htmlFor="pickup-time">Time</label>
              <input type="time" id="pickup-time" />
            </div>
          </div>

          {/* Drop-Off Card */}
          <div className="card">
            <h2>Drop-Off</h2>
            <div className="form-group">
              <label htmlFor="dropoff-location">Location</label>
              <input
                type="text"
                id="dropoff-location"
                placeholder="Enter drop-off location"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dropoff-date">Date</label>
              <input type="date" id="dropoff-date" />
            </div>
            <div className="form-group">
              <label htmlFor="dropoff-time">Time</label>
              <input type="time" id="dropoff-time" />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className="user-form">
          <h2>Booking Details</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label htmlFor="car-type">Type of Car</label>
            <select id="car-type">
              <option value="sedan">Sedan</option>
              <option value="mini">Mini</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Book Now
          </button>
        </form>
      </div>

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
    </>
  );
};

export default Express;
