import React from "react";
import "../../styles/ShimmerUi/CarCardSU.css";

const ShimmerCarCard = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-image"></div>
      <div className="shimmer-text title"></div>
      <div className="shimmer-text button"></div>
    </div>
  );
};

const CarCardSU = () => {
  return (
    <div className="shimmer-grid">
      {/* Render multiple shimmer cards */}
      {[...Array(6)].map((_, index) => (
        <ShimmerCarCard key={index} />
      ))}
    </div>
  );
};

export default CarCardSU;
