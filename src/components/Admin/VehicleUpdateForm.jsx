import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast, Toaster } from "react-hot-toast";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VehicleUpdateForm = ({ setShowForm, vehicleId }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    weekdayPrice: "",
    weekendPrice: "",
    isAvailable: false,
  });

  const [vehicle, setVehicle] = useState(null); // Initially null
  const { authorizationToken } = useAuth();

  const getVehicleData = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/admin/rentalVehicle/${vehicleId}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      setVehicle(data); // Update vehicle state
    } catch (e) {
      console.error("Failed to fetch vehicle data:", e);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${baseURL}/api/admin/rentalVehicle/${vehicleId}/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(formData),
        }
      );


      if (response.ok) {
        toast.success("Updated Successfully");
      } else {
        toast.error("Update Failed");
      }
    } catch (e) {
      console.log(e);
    }
    setShowForm(false)
  };

  useEffect(() => {
    getVehicleData();
  }, [vehicleId]); // Fetch vehicle data only when vehicleId changes

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name || "",
        image: vehicle.image || "",
        weekdayPrice: vehicle.weekdayPrice || "",
        weekendPrice: vehicle.weekendPrice || "",
        isAvailable: vehicle.isAvailable || false, // Ensure boolean value
      });
    }
  }, [vehicle]); // Update formData when vehicle changes

  return (
    <>
    <Toaster />
    <form onSubmit={handleSubmit} className="admin-vehicle-update-form">
      <div className="vehicle-update-form-in">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="vehicle-update-form-in">
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>

      <div className="vehicle-update-form-in">
        <label htmlFor="weekdayPrice">Weekday Price:</label>
        <input
          type="text"
          id="weekdayPrice"
          name="weekdayPrice"
          value={formData.weekdayPrice}
          onChange={handleChange}
          required
        />
      </div>

      <div className="vehicle-update-form-in">
        <label htmlFor="weekendPrice">Weekend Price:</label>
        <input
          type="text"
          id="weekendPrice"
          name="weekendPrice"
          value={formData.weekendPrice}
          onChange={handleChange}
          required
        />
      </div>

      <div className="vehicle-update-form-in-check">
        <label htmlFor="isAvailable">Is Available:</label>
        <input
          type="checkbox"
          id="isAvailable"
          name="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
        />
      </div>

      <div className="buttons">
        <button className="vehicle-update-form-btn" type="submit">
          Submit
        </button>
        <button
          className="vehicle-update-form-btn"
          type="button"
          onClick={() => setShowForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
    </>
  );
};

export default VehicleUpdateForm;
