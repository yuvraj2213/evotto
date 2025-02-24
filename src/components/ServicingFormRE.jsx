import React, { useState } from "react";
import "../styles/ServicingForm.css";
import { useAuth } from "../store/auth";
import toast, { Toaster } from "react-hot-toast";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const ServicingFormRE = () => {
  const { user } = useAuth();
  const userEmail = user?.userData?.email;
  const userId = user?.userData?._id; // Ensure user ID is included

  const [loading, setLoading] = useState(false);
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

    if (!formData.vehicleImage) {
      toast.error("Please upload a vehicle image.");
      return;
    }

    setLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("vehicleType", formData.vehicleType);
      formDataObj.append("vehicleName", formData.vehicleName);
      formDataObj.append("vehicleImage", formData.vehicleImage);
      formDataObj.append("serviceType", formData.serviceType);
      formDataObj.append("requirements", formData.requirements);
      formDataObj.append("date", formData.date);
      formDataObj.append("time", formData.time);
      formDataObj.append("userEmail", userEmail);
      formDataObj.append("user", userId);

      const response = await fetch(`${baseURL}/api/servicing/create`, {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Appointment booked successfully!");
        setFormData({
          vehicleType: "",
          vehicleName: "",
          vehicleImage: null,
          serviceType: "",
          requirements: "",
          date: "",
          time: "",
        });
      } else {
        toast.error(result.message || "Booking failed, try again.");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <>
      <Toaster />
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
              required
            />
          </div>
          <div className="form-group">
            <label>Service Type:</label>
            <div className="radio-group">
              {["PPF", "Polishing", "Ceramic"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="serviceType"
                    value={type}
                    checked={formData.serviceType === type}
                    onChange={handleChange}
                    required
                  />
                  {type}
                </label>
              ))}
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
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ServicingFormRE;
