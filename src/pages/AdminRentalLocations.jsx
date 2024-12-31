import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminRentalLocations = () => {
  const [location, setLocation] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLocation, setNewLocation] = useState({ name: "", mapLink: "" });
  const { authorizationToken } = useAuth();

  // Fetch locations from backend
  const getLocations = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/rentalLocation`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLocation(data);
      }
    } catch (error) {
      console.error("Error fetching locations data:", error);
    }
  };

  const addRentalLocation = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}/api/admin/addRentalLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(newLocation),
      });

      if (response.ok) {
        const data = await response.json();
        setLocation((prev) => [...prev, data]);
        setShowForm(false); 
        setNewLocation({ name: "", mapLink: "" });
        getLocations() 
      } else {
        console.error("Failed to add location. Status:", response.status);
      }
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <div style={{ margin: "20px" }}>
        <h2>Rental Locations</h2>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {location.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.name}</td>
                <td>
                  <a
                    href={loc.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "12px",
                      textDecoration: "none",
                      color: "white",
                    }}
                  >
                    {loc.mapLink}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
          onClick={() => setShowForm(true)}
        >
          Add New Location
        </button>

        {/* Pop-up Form */}
        {showForm && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#333",
              padding: "20px",
              borderRadius: "10px",
              color: "white",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
          >
            <h3>Add New Location</h3>
            <form onSubmit={addRentalLocation}>
              <div style={{ marginBottom: "10px" }}>
                <label>Location Name:</label>
                <br />
                <input
                  type="text"
                  value={newLocation.name}
                  onChange={(e) =>
                    setNewLocation((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>Location Link:</label>
                <br />
                <input
                  type="text"
                  value={newLocation.mapLink}
                  onChange={(e) =>
                    setNewLocation((prev) => ({
                      ...prev,
                      mapLink: e.target.value,
                    }))
                  }
                  required
                  style={{ width: "100%", padding: "5px" }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "10px",
                  marginLeft: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Background Overlay */}
        {showForm && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={() => setShowForm(false)}
          ></div>
        )}
      </div>
    </>
  );
};

export default AdminRentalLocations;