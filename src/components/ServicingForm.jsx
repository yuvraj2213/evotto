import React, { useState } from "react";
import "../styles/ServicingForm.css"; 

const ServicingForm = () => {
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleName: "",
    vehicleImage: null,
    serviceType: "",
    requirements: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Appointment booked successfully!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Book a Servicing Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type of Vehicle:</label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          >
            <option value="">--Select--</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
        </div>
        <div className="form-group">
          <label>Name of Vehicle:</label>
          <input
            type="text"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image of Vehicle:</label>
          <input
            type="file"
            name="vehicleImage"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Service Type:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="serviceType"
                value="repairing"
                onChange={handleChange}
                required
              />
              Repairing
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="fullBodyService"
                onChange={handleChange}
              />
              Full Body Service
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Additional Requirements:</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
            placeholder="Describe your requirements"
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
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
        <button type="submit" className="submit-button">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default ServicingForm;
