import React from "react";
import "../styles/ImpactSection.css"; // External CSS for styling

const ImpactSection = () => {
  return (
    <div className="impact-section">
      <div className="impact-background">
        <h2 className="impact-title">Our Impact</h2>
        <p className="impact-description">
        Simplifying your journey, solving everyday automobile hassles with innovation and care
        </p>
        <div className="impact-stats">
          <div className="stat-item">
            <img src="/images/driver-logo.png" alt="Masters" />
            <h3>50+ </h3>
            <p>Masters</p>
          </div>
          <div className="stat-item">
            <img src="/images/user-logo.png" alt="Customers" />
            <h3>100+ </h3>
            <p>Customers</p>
          </div>
          <div className="stat-item">
            <img src="/images/ride-logo.png" alt="Downloads" />
            <h3>500+</h3>
            <p>Bookings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;
