import React from "react";
import "../styles/Safety.css";
import { Link } from "react-router-dom";

const Safety = () => {
  return (
    <>
      <div class="safety-for-all-container">
        <h2>Safety For All</h2>
        <p>
          At Evotto, customer safety is our top priority. We ensure all vehicles
          are regularly maintained, insured, and GPS-enabled for real-time
          tracking. Our vendors and drivers are thoroughly verified, and we
          provide 24/7 emergency support for a hassle-free experience. With
          secure payments and transparent policies, Evotto guarantees a safe and
          reliable ride every time.
        </p>
        <button class="know-more-button">
          <Link to="/about">Know More</Link>
        </button>
      </div>
      <div className="safety-image"></div>
    </>
  );
};

export default Safety;
