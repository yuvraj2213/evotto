import React, { useState } from "react";
import "../styles/DriverForm.css";
import { useAuth } from "../store/auth";
import toast, { Toaster } from "react-hot-toast";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const DriverForm = () => {
  const { user } = useAuth();
  const userEmail = user?.userData?.email;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    duration: "1 day", // Default duration value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bookingDate = new Date(formData.date);
    const currentDate = new Date();
    const timeDiff = (bookingDate - currentDate) / (1000 * 60 * 60 * 24);

    if (timeDiff < 1) {
      toast.error("Please book the driver at least 24 hours in advance.");
      setLoading(false);
      return;
    }

    // Extract user details from auth context
    const userName = user?.userData?.name;
    const userPhone = user?.userData?.phone;

    if (!userName || !userEmail || !userPhone) {
      toast.error("User details are missing. Please log in again.");
      setLoading(false);
      return;
    }

    // Prepare the form data with user details
    const submissionData = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      duration: formData.duration,
    };

    try {
      const response = await fetch(`${baseURL}/api/data/driverForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        toast.success("Driver booked successfully!");
        setFormData({
          date: "",
          time: "",
          location: "",
          duration: "1 day",
        });
      } else {
        toast.error("Failed to book driver.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Add 1 day to today
    return tomorrow.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  };

  return (
    <>
      <Toaster />
      <div className="driver-form-img">
        <div className="book-driver-beside-img">
          <img src="/images/driverBook.jpg" alt="Driver Booking" />
        </div>

        <div className="form-container">
          <h2 className="form-title">Book a Driver</h2>
          <p className="form-note">
            Note: Please book a driver at least 24 hours before your required
            date.
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
            <div className="form-group">
              <label>Duration:</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              >
                <option value="1 day">1 day</option>
                <option value="30 days">30 days</option>
              </select>
            </div>
            <button type="submit" className="submit-button">
              {loading ? "Booking" : "Book Driver"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DriverForm;
