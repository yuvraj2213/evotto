import React, { useEffect, useState } from "react";
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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [location, setLocation] = useState([]);
  const baseURL =
    process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

  const getLocations = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/rentalLocation`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setLocation(data);
      }
    } catch (error) {
      console.error("Error fetching locations data:", error);
    }
  };

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getFormattedTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const minDate = getFormattedDate(currentDateTime);
  const minTime =
    pickUpDate === minDate ? getFormattedTime(currentDateTime) : "00:00";

  const handleLocationChange = (location) => {
    setPickUpLocation(location);
    setDropOffLocation(location);
  };

  const handleDateChange = (date) => {
    setPickUpDate(date);
  };

  const handleTimeChange = (time) => {
    setPickUpTime(time);
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

  useEffect(() => {
    getLocations();
  });

  return (
    <div className="trip-planner">
      <h2 style={{color:"black"}}>Select Pick-Up and Drop-Off Information below : </h2>
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
                onChange={(e) => handleLocationChange(e.target.value)}
                required
              >
                <option value="">Select your location</option>
                {location.map((loc, index) => (
                  <option key={index} value={loc.name || loc}>
                    {loc.name || loc}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="pickUpDate">Date</label>
              <input
                type="date"
                className="input-style"
                id="pickUpDate"
                value={pickUpDate}
                min={minDate}
                onChange={(e) => handleDateChange(e.target.value)}
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
                min={minTime}
                onChange={(e) => handleTimeChange(e.target.value)}
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
              <input
                type="text"
                className="input-style"
                id="dropOffLocation"
                value={dropOffLocation}
                readOnly // Prevent changes to drop-off location
              />
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
                <option value="1 hr">1 hr</option>
                <option value="2 hr">2 hr</option>
                <option value="3 hr">3 hr</option>
                <option value="4 hr">4 hr</option>
                <option value="5 hr">5 hr</option>
                <option value="6 hr">6 hr</option>
                <option value="12 hr">12 hr</option>
                <option value="24 hr">24 hr</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TripPlanner;
