import React from "react";
import { Link } from "react-router-dom";
import "../styles/KnowUs.css";

const KnowUs = () => {
  return (
    <>
      <div className="know-us-better-img"></div>
      <div class="know-us-better-container">
        <h2>Know Us Better</h2>
        <p>
          Evotto is more than just a rental service; it's your trusted partner
          for affordable and reliable rides. We bring together verified vendors
          and top-quality vehicles to create a seamless experience for our
          customers. Whether you're looking for convenience, safety, or value,
          Evotto is here to deliver with transparency and care. Explore a
          smarter way to ride with us!
        </p>
        <button class="know-more-button">
          <Link to="/about">Know More</Link>
        </button>
      </div>
    </>
  );
};

export default KnowUs;
