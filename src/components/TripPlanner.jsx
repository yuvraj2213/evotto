import React, { useState } from "react";
import "../styles/TripPlanner.css"; 

const TripPlanner = ({
  pickUpLocation,
  setPickUpLocation,
  pickUpDate,
  setPickUpDate,
  pickUpTime,
  setPickUpTime,
  dropOffLocation,
  setDropOffLocation,
  dropOffDuration,
  setDropOffDuration,
}) => {
 
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
    }
  };

  const handleTimeChange = (time, isPickUp) => {
    if (isPickUp) {
      setPickUpTime(time);
    }
  };

  const handleDurationChange = (duration) => {
    setDropOffDuration(duration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tripDetails = {
      pickUpLocation,
      pickUpDate,
      pickUpTime,
      dropOffLocation,
      dropOffDuration,
    };
    console.log("Trip Details:", tripDetails);
    alert("Trip details submitted successfully!");
  };

  return (
    <div className="trip-planner">
      <form onSubmit={handleSubmit} className="trip-planner-form">
        <div className="trip-section">
          <div className="section-header">
            <span className="section-icon">●</span>
            <span>Pick-Up</span>
          </div>
          <div className="section-content">
            <div className="field">
              <label htmlFor="pickUpLocation">Location</label>
              <select
                id="pickUpLocation"
                className="input-style"
                value={pickUpLocation}
                onChange={(e) => handleLocationChange(e.target.value, true)}
                required
              >
                <option value="">Select your location</option>
                <option value="ITER">ITER</option>
                <option value="KIIT">KIIT</option>
                <option value="CUTTACK">CUTTACK</option>
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
                required
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
                required
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
              <label htmlFor="dropOffLocation">Location</label>
              <select
                id="dropOffLocation"
                className="input-style"
                value={dropOffLocation}
                onChange={(e) => handleLocationChange(e.target.value, false)}
                required
              >
                <option value="">Select your location</option>
                <option value="ITER">ITER</option>
                <option value="KIIT">KIIT</option>
                <option value="CUTTACK">CUTTACK</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="dropOffDuration">Duration</label>
              <select
                id="dropOffDuration"
                className="input-style"
                value={dropOffDuration}
                onChange={(e) => handleDurationChange(e.target.value)}
                required
              >
                <option value="">Select Duration</option>
                <option value="6 hr">6 hr</option>
                <option value="12 hr">12 hr</option>
                <option value="24 hr">24 hr</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TripPlanner;
