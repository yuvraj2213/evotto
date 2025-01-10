import React, { useState } from "react";
import "../styles/DriverForm.css";

const DriverForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDate = new Date(formData.date);
    const currentDate = new Date();
    const timeDiff = (bookingDate - currentDate) / (1000 * 60 * 60 * 24);

    if (timeDiff < 1) {
      alert("Please book the driver at least 24 hours in advance.");
      return;
    }

    alert("Driver booked successfully!");
  };
  
  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add 1 day to today
    return tomorrow.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Book a Driver</h2>
      <p className="form-note">
        Note: Please book a driver at least 24 hours before your required date.
      </p>
      <form className="driver-booking-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            min={getTomorrowDate()}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Book Driver
        </button>
      </form>
    </div>
  );
};

export default DriverForm;
