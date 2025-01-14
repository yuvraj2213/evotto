import React from "react";
import "../styles/ConsumerPolicy.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";

const ConsumerPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="policy-container">
        <h1 className="policy-heading">Evotto Consumer Policy</h1>
        <p className="policy-intro">
          At Evotto, we prioritize transparency, affordability, and customer
          satisfaction. Our consumer policy outlines the principles and
          commitments we adhere to, ensuring a seamless experience for all our
          users:
        </p>
        <div className="policy-list">
          <div className="policy-item">
            <h2>1. Transparency</h2>
            <ul>
              <li>Clear pricing with no hidden charges.</li>
              <li>
                Comprehensive information about services, vehicle
                specifications, and terms of use.
              </li>
            </ul>
          </div>
          <div className="policy-item">
            <h2>2. Affordability</h2>
            <ul>
              <li>Cost-effective rental and automobile-related solutions.</li>
              <li>
                Competitive pricing to make our services accessible to everyone.
              </li>
            </ul>
          </div>
          <div className="policy-item">
            <h2>3. Consumer Safety</h2>
            <ul>
              <li>
                Regular vehicle maintenance and quality checks to ensure safety.
              </li>
              <li>
                Comprehensive insurance and support for unforeseen incidents.
              </li>
            </ul>
          </div>
          <div className="policy-item">
            <h2>4. Flexibility and Accessibility</h2>
            <ul>
              <li>Easy booking and cancellation policies.</li>
              <li>
                Wide range of vehicles and services to suit diverse needs.
              </li>
            </ul>
          </div>
          <div className="policy-item">
            <h2>5. Customer Support</h2>
            <ul>
              <li>
                Dedicated 24/7 customer service to address queries and issues
                promptly.
              </li>
              <li>Feedback-driven approach to improve our services.</li>
            </ul>
          </div>
          <div className="policy-item">
            <h2>6. Environmental Responsibility</h2>
            <ul>
              <li>Promoting eco-friendly transportation options.</li>
              <li>
                Encouraging sustainable practices through solar-integrated
                solutions.
              </li>
            </ul>
          </div>
        </div>
        <p className="policy-footer">
          This policy reflects our commitment to delivering top-notch services
          while fostering trust and reliability among our consumers.
        </p>
      </div>
      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
    </>
  );
};

export default ConsumerPolicy;
