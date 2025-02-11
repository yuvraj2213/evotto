import React, { useEffect, useState } from "react";
import "../../styles/Vendor/VendorManagement.css";
import { useAuth } from "../../store/auth";
import VendorAddVehicle from "../../components/Vendor/VendorAddVehicle";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VendorManagement = () => {
  const { user } = useAuth();
  const userId = user?.userData?._id;
  const [vehicle, setVehicle] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [newLocation, setNewLocation] = useState("");

  const getVehicles = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/vendor/getAllVehicles/${userId}`,
        { method: "GET" }
      );
      const data = await response.json();
      setVehicle(data);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleAvailability = async (vehicleId, currentStatus) => {
    try {
      const response = await fetch(
        `${baseURL}/api/vendor/updateVehicle/${vehicleId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAvailable: !currentStatus }),
        }
      );

      if (response.ok) {
        setVehicle((prev) =>
          prev.map((v) =>
            v._id === vehicleId ? { ...v, isAvailable: !currentStatus } : v
          )
        );
      }
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const startEditingLocation = (vehicle) => {
    setEditingVehicle(vehicle);
    setNewLocation(vehicle.location?.join(", ") || "");
  };

  const handleLocationUpdate = async () => {
    if (!editingVehicle) return;

    try {
      const response = await fetch(
        `${baseURL}/api/vendor/rentalVehicle/${editingVehicle._id}/update`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: newLocation.split(",").map((l) => l.trim()),
          }),
        }
      );

      if (response.ok) {
        setVehicle((prev) =>
          prev.map((v) =>
            v._id === editingVehicle._id
              ? { ...v, location: newLocation.split(",").map((l) => l.trim()) }
              : v
          )
        );
        setEditingVehicle(null);
      }
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <>
      <button
        className="toggle-form-btn"
        onClick={() => setShowAddForm((prev) => !prev)}
      >
        {showAddForm ? "Hide Form" : "Add New Vehicle"}
      </button>

      {showAddForm && <VendorAddVehicle />}

      <div className="vendor-vehicles-container">
        <h2>Your Listed Vehicles Data</h2>

        {vehicle.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Availability</th>
                <th>Action</th>
                <th>Locations</th>
                <th>Edit Location</th>
              </tr>
            </thead>
            <tbody>
              {vehicle.map((curr) => (
                <tr key={curr._id}>
                  <td>{curr.name}</td>
                  <td>
                    <a
                      href={curr.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Image
                    </a>
                  </td>
                  <td>{curr.isAvailable ? "Available" : "Not Available"}</td>
                  <td>
                    <button
                      className={
                        curr.isAvailable
                          ? "unavailable-mark-btn"
                          : "available-mark-btn"
                      }
                      onClick={() =>
                        toggleAvailability(curr._id, curr.isAvailable)
                      }
                    >
                      {curr.isAvailable ? "Mark Unavailable" : "Mark Available"}
                    </button>
                  </td>
                  <td>{curr.location?.join(", ") || "N/A"}</td>
                  <td>
                    <button
                      className="edit-location-btn"
                      onClick={() => startEditingLocation(curr)}
                    >
                      Edit Location
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-orders">No vehicles found.</p>
        )}
      </div>

      {editingVehicle && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setEditingVehicle(null)}
          ></div>
          <div className="edit-location-modal">
            <h3>Update Location for {editingVehicle.name}</h3>
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Enter new location(s), separated by commas"
            />
            <button onClick={handleLocationUpdate}>Update Location</button>
            <button onClick={() => setEditingVehicle(null)}>Cancel</button>
          </div>
        </>
      )}
    </>
  );
};

export default VendorManagement;
