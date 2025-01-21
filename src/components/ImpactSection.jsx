import React from "react";
import "../styles/ImpactSection.css"; // External CSS for styling

const ImpactSection = () => {
  return (
    <div className="impact-section">
      <div className="impact-background">
        <h2 className="impact-title">Our Impact</h2>
        <p className="impact-description">
          Our presence in the country has changed the concept of intra-city
          travel and made last-mile connectivity affordable for all.
        </p>
        <div className="impact-stats">
          <div className="stat-item">
            <img src="/icons/captains.png" alt="Captains" />
            <h3>50+ </h3>
            <p>Masters</p>
          </div>
          <div className="stat-item">
            <img src="/icons/customers.png" alt="Customers" />
            <h3>100+ </h3>
            <p>Customers</p>
          </div>
          <div className="stat-item">
            <img src="/icons/downloads.png" alt="Downloads" />
            <h3>500+ hours ride</h3>
            <p>Downloads</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;
