import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast, Toaster } from "react-hot-toast";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VehicleUpdateForm = ({ setShowForm, vehicleId }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    sixhrPrice: "",
    twelvehrPrice: "",
    twentyfourhrPrice: "",
    isAvailable: false,
    location: [],
  });

  const [vehicle, setVehicle] = useState(null);
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
      setVehicle(data);
    } catch (e) {
      console.error("Failed to fetch vehicle data:", e);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "location") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((loc) => loc.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
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
      console.error("Error updating vehicle:", e);
    }

    setShowForm(false);
  };

  useEffect(() => {
    getVehicleData();
  }, [vehicleId]);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        name: vehicle.name || "",
        image: vehicle.image || "",
        sixhrPrice: vehicle.sixhrPrice || "",
        twelvehrPrice: vehicle.twelvehrPrice || "",
        twentyfourhrPrice: vehicle.twentyfourhrPrice || "",
        isAvailable: vehicle.isAvailable || false,
        location: vehicle.location || [],
      });
    }
  }, [vehicle]);

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
          <label htmlFor="sixhrPrice">Six Hr. Price:</label>
          <input
            type="text"
            id="sixhrPrice"
            name="sixhrPrice"
            value={formData.sixhrPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="vehicle-update-form-in">
          <label htmlFor="twelvehrPrice">Twelve Hr. Price:</label>
          <input
            type="text"
            id="twelvehrPrice"
            name="twelvehrPrice"
            value={formData.twelvehrPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="vehicle-update-form-in">
          <label htmlFor="twentyfourhrPrice">Twenty Four Hr. Price:</label>
          <input
            type="text"
            id="twentyfourhrPrice"
            name="twentyfourhrPrice"
            value={formData.twentyfourhrPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="vehicle-update-form-in">
          <label htmlFor="location">Locations:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location.join(", ")} // Convert array to comma-separated string
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
