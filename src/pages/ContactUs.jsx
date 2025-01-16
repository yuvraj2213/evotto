import React from "react";
import "../styles/ContactUs.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";

const ContactUs = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1 className="contact-heading">You can find us here</h1>
        <p className="contact-subheading">Find help for your queries here:</p>

        <div className="contact-content">
          {/* Contact Form */}
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Enter your comment"
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>

          {/* Address Card */}
          <div className="contact-card">
            <h2>Contact Information</h2>
            <p><strong>Address:</strong></p>
            <p>
              D/3 Plot 103/765 Brahman, Mahal, Kendrapara, <br />
              Kendrapara, Orissa, India, 754210
            </p>
            <p><strong>Phone:</strong></p>
            <p>+91 7077829595</p>
          </div>
        </div>
      </div>

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
