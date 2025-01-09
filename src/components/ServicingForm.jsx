import React, { useState } from "react";
import "../styles/ServicingForm.css";
import { useAuth } from "../store/auth";

const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const ServicingForm = () => {

  const {user}=useAuth()
  const userEmail=user.userData.email;
  console.log(userEmail)

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("vehicleType", formData.vehicleType);
    formDataObj.append("vehicleName", formData.vehicleName);
    formDataObj.append("vehicleImage", formData.vehicleImage);
    formDataObj.append("serviceType", formData.serviceType);
    formDataObj.append("requirements", formData.requirements);
    formDataObj.append("date", formData.date);
    formDataObj.append("time", formData.time);
    formDataObj.append("userEmail", `${userEmail}`); // Replace with user's email input

    try {
      const response = await fetch(`${baseURL}/api/data/servicingForm`, {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
              PPF
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="fullBodyService"
                onChange={handleChange}
              />
              Polishing
            </label>
            <label>
              <input
                type="radio"
                name="serviceType"
                value="fullBodyService"
                onChange={handleChange}
              />
              Ceramic
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
