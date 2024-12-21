import React, { useState } from "react";
import "../styles/TripPlanner.css"; // Import your CSS for styling

const TripPlanner = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");

  const handleLocationChange = (location, isPickUp) => {
    if (isPickUp) {
      setPickUpLocation(location);
    } else {
      setDropOffLocation(location);
    }
  };

  const handleDateChange = (date, isPickUp) => {
    if (isPickUp) {
      setPickUpDate(date);
    } else {
      setDropOffDate(date);
    }
  };

  const handleTimeChange = (time, isPickUp) => {
    if (isPickUp) {
      setPickUpTime(time);
    } else {
      setDropOffTime(time);
    }
  };

  return (
    <div className="trip-planner">
      <div className="trip-section">
        <div className="section-header">
          <span className="section-icon">●</span>
          <span>Pick-Up</span>
        </div>
        <div className="section-content">
          <div className="field">
            <label htmlFor="pickUpLocation">Locations</label>
            <select
              id="pickUpLocation"
              className="input-style"
              value={pickUpLocation}
              onChange={(e) => handleLocationChange(e.target.value, true)}
            >
              <option value="">Select your city</option>
              <option value="">Bhubaneswar</option>
              <option value="">Delhi</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="pickUpDate">Date</label>
            <input
              type="date"
              className="input-style"
              id="pickUpDate"
              value={pickUpDate}
              onChange={(e) => handleDateChange(e.target.value, true)}
            />
          </div>
          <div className="field">
            <label htmlFor="pickUpTime">Time</label>
            <input
              type="time"
              className="input-style"
              id="pickUpTime"
              value={pickUpTime}
              onChange={(e) => handleTimeChange(e.target.value, true)}
            />
          </div>
        </div>
      </div>

      <div className="trip-section">
        <div className="section-header">
          <span className="section-icon">●</span>
          <span>Drop-Off</span>
        </div>
        <div className="section-content">
          <div className="field">
            <label htmlFor="dropOffLocation">Locations</label>
            <select
              id="dropOffLocation"
              className="input-style"
              value={dropOffLocation}
              onChange={(e) => handleLocationChange(e.target.value, false)}
            >
              <option value="">Select your city</option>
              {/* Add more location options here */}
            </select>
          </div>
          <div className="field">
            <label htmlFor="dropOffDate">Date</label>
            <input
              type="date"
              className="input-style"
              id="dropOffDate"
              value={dropOffDate}
              onChange={(e) => handleDateChange(e.target.value, false)}
            />
          </div>
          <div className="field">
            <label htmlFor="dropOffTime">Time</label>
            <input
              type="time"
              className="input-style"
              id="dropOffTime"
              value={dropOffTime}
              onChange={(e) => handleTimeChange(e.target.value, false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
