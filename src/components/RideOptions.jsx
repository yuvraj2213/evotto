import React from "react";
import "../styles/RideOptions.css"; 

const RideOptions = () => {
  return (
    <div className="ride-options-container">
      <h1 className="ride-title">There's a Rental Service for everyone</h1>
      <div className="ride-cards">
        {/* Card 1 */}
        <div className="ride-card">
          <img src="/images/ride1.png" alt="" width={300}/>
          <h3>For any budget</h3>
          <p>
            From <strong>Scooties</strong> and <strong>Bike</strong> to{" "}
            <strong>Cars</strong>, you
            will find a vehicle in your budget at your convenience any time.
          </p>
        </div>
        {/* Card 2 */}
        <div className="ride-card">
        <img src="/images/ride2.png" alt="" width={300}/>
          <h3>For any distance</h3>
          <p>
            Book vehicles to travel long distances at your convenience any time.
          </p>
        </div>
        {/* Card 3 */}
        <div className="ride-card">
        <img src="/images/ride3.png" alt="" width={300}/>
          <h3>For any duration</h3>
          <p>
            Variety of ranges are available from 1 hr a day to 24 hrs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RideOptions;
