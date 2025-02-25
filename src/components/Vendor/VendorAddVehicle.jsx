import React, { useState } from "react";
import "../../styles/Vendor/VendorAddVehicle.css";

import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VendorAddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    name: "",
    image: "",
    description: "",
    vehicleNumber: "",
    kmRunning: "",
  });
  const { authorizationToken, user } = useAuth();

  const userData = user?.userData;
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmitAddVehicle = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append("name", vehicle.name);
    formData.append("image", imageFile);
    formData.append("description", vehicle.description);
    formData.append("vehicleNumber", vehicle.vehicleNumber);
    formData.append("kmRunning", vehicle.kmRunning);
    formData.append("vendor", userData.name);
    formData.append("vendorId", userData._id);

    try {
      const response = await fetch(`${baseURL}/api/vendor/addRentalVehicle`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Vehicle Added Successfully");
        setVehicle({
          name: "",
          image: "",
          description: "",
          vehicleNumber: "",
          kmRunning: "",
        });
        setImageFile(null);
        setLoading(false);
      } else {
        toast.error("Failed to add the vehicle.");
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while adding the vehicle.");
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <>
    {console.log(userData._id)}
      <Toaster />
      <div className="vendor-add-vehicle-container">
        <div className="form-wrapper">
          <h2 className="form-title">Add New Vehicle</h2>
          <form onSubmit={handleSubmitAddVehicle} className="vehicle-form">
            <input
              type="text"
              name="name"
              value={vehicle.name}
              onChange={handleChange}
              placeholder="Vehicle Name"
              className="input-field"
              required
            />
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
            <textarea
              name="description"
              value={vehicle.description}
              onChange={handleChange}
              placeholder="Vehicle Description"
              className="input-field textarea"
              required
            ></textarea>
            <input
              type="text"
              name="vehicleNumber"
              value={vehicle.vehicleNumber}
              onChange={handleChange}
              placeholder="Vehicle Number"
              className="input-field"
              required
            />
            <input
              type="number"
              name="kmRunning"
              value={vehicle.kmRunning}
              onChange={handleChange}
              placeholder="KM Running"
              className="input-field"
              required
            />
            <button type="submit" className="submit-button">
              {!loading ? "Add Vehicle" : "Adding..."}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VendorAddVehicle;
