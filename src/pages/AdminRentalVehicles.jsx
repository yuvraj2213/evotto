import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
import "../styles/AdminRentalVehicles.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import VehicleUpdateForm from "../components/Admin/VehicleUpdateForm";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminRentalVehicles = () => {
  const { authorizationToken } = useAuth();
  const [vehicleId, setVehicleId] = useState();
  const [showForm, setShowForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    image: "",
    sixhrPrice: "",
    twelvehrPrice: "",
    twentyfourhrPrice: "",
    isAvailable: true,
    location: [],
  });
  const [imageFile, setImageFile] = useState(null);

  const getAllVehiclesData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/rentalVehicle`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
      } else {
        toast.error("Failed to fetch rental vehicles data.");
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while fetching rental vehicles data.");
    }
  };

  const deleteVehicle = async (id) => {
    try {
      const response = await fetch(
        `${baseURL}/api/admin/deleteRentalVehicle/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        toast.success("Vehicle Deleted Successfully");
        getAllVehiclesData();
      } else {
        toast.error("Failed to delete the vehicle.");
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while deleting the vehicle.");
    }
  };

  const handleOnClick = (id) => {
    setVehicleId(id);
    setShowForm(true);
  };

  const handleAddVehicleToggle = () => {
    setShowAddForm(!showAddForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleLocationsChange = (e) => {
    const value = e.target.value.split(","); 
    setNewVehicle({ ...newVehicle, locations: value });
  };

  const handleSubmitAddVehicle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newVehicle.name);
    formData.append("image", imageFile);
    formData.append("sixhrPrice", newVehicle.sixhrPrice);
    formData.append("twelvehrPrice", newVehicle.twelvehrPrice);
    formData.append("twentyfourhrPrice", newVehicle.twentyfourhrPrice);
    formData.append("isAvailable", newVehicle.isAvailable);
    formData.append("location", JSON.stringify(newVehicle.location));

    try {
      const response = await fetch(`${baseURL}/api/admin/addRentalVehicle`, {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Vehicle Added Successfully");
        getAllVehiclesData();
        setShowAddForm(false); // Close the add form
        setNewVehicle({
          name: "",
          image: "",
          sixhrPrice: "",
          twelvehrPrice: "",
          twentyfourhrPrice: "",
          isAvailable: true,
          location: [],
        });
        setImageFile(null); // Reset the image file state
      } else {
        toast.error("Failed to add the vehicle.");
      }
    } catch (e) {
      console.log(e);
      toast.error("An error occurred while adding the vehicle.");
    }
  };

  useEffect(() => {
    getAllVehiclesData();
  }, [vehicles]);

  return (
    <>
      <Toaster />
      <section className="admin-rental-vehicles-section">
        <div className="container">
          <h1>Admin Rental Vehicles Data</h1>
          <button
            onClick={handleAddVehicleToggle}
            style={{
              marginBottom: "20px",
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            {showAddForm ? "Cancel" : "Add New Vehicle"}
          </button>
        </div>

        {/* Add Vehicle Form */}
        {showAddForm && (
          <form onSubmit={handleSubmitAddVehicle} className="add-vehicle-form">
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={newVehicle.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Image:</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>
            <div>
              <label>6hr Price:</label>
              <input
                type="number"
                name="sixhrPrice"
                value={newVehicle.sixhrPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>12hr Price:</label>
              <input
                type="number"
                name="twelvehrPrice"
                value={newVehicle.twelvehrPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>24hr Price:</label>
              <input
                type="number"
                name="twentyfourhrPrice"
                value={newVehicle.twentyfourhrPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Available:</label>
              <select
                name="isAvailable"
                value={newVehicle.isAvailable}
                onChange={handleInputChange}
                required
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div>
              <label>Locations:</label>
              <input
                type="text"
                name="locations"
                placeholder="Enter locations separated by commas"
                onChange={handleLocationsChange}
                required
              />
            </div>
            <button type="submit" style={{ marginTop: "20px" }}>
              Add Vehicle
            </button>
          </form>
        )}

        <div className="admin-rental-vehicles">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>6hr Price</th>
                <th>12hr Price</th>
                <th>24hr Price</th>
                <th>Available</th>
                <th>Locations</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.name}</td>
                  <td>
                    <a
                      href={vehicle.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>
                  </td>
                  <td>{vehicle.sixhrPrice}</td>
                  <td>{vehicle.twelvehrPrice}</td>
                  <td>{vehicle.twentyfourhrPrice}</td>
                  <td>{vehicle.isAvailable ? "Yes" : "No"}</td>
                  <td>{vehicle.location?.join(", ") || "N/A"}</td>
                  <td className="admin-edit-vehicle-btn">
                    <button
                      onClick={() => handleOnClick(vehicle._id)}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "green",
                        border: "none",
                        padding: "10px",
                        borderRadius: "20px",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="admin-del-btn"
                      onClick={() => deleteVehicle(vehicle._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && <VehicleUpdateForm setShowForm={setShowForm} vehicleId={vehicleId} />}
      </section>
    </>
  );
};

export default AdminRentalVehicles;
