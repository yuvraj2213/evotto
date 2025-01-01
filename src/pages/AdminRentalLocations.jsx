import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import toast, { Toaster } from "react-hot-toast";
import "../styles/AdminRentalLocations.css";

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
      } else {
        console.error("Failed to fetch locations:", response.status);
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
        toast.success("Location added successfully!");
        setNewLocation({ name: "", mapLink: "" });
        setShowForm(false);
        getLocations();
      } else {
        console.error("Failed to add location:", response.status);
        toast.error("Failed to add location");
      }
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Error adding location");
    }
  };

  const handleLocationDelete = async (id) => {
    try {
      const response = await fetch(
        `${baseURL}/api/admin/rentalLocation/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        toast.success("Location deleted successfully");
        getLocations();
      } else {
        toast.error("Failed to delete location");
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Error deleting location");
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <Toaster />
      <div style={{ margin: "20px" }}>
        <h2>Rental Locations</h2>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Link</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {location.map((curr) => (
                <tr key={curr._id}>
                  <td>{curr.name}</td>
                  <td>
                    <a
                      href={curr.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={curr.mapLink}
                      style={{textDecoration
                        :'none',color:'#D77A61'
                      }}
                    >
                      {curr.mapLink.length > 30
                        ? `${curr.mapLink.substring(0, 50)}...`
                        : curr.mapLink}
                    </a>
                  </td>
                  <td>
                    <button
                      className="admin-del-btn"
                      onClick={() => handleLocationDelete(curr._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="admin-addNewLoc"
          style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
          onClick={() => setShowForm(true)}
        >
          Add New Location
        </button>

        {showForm && (
          <div
            style={{
              position: "fixed",
              width: "50%",
              height: "40%",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#86BBD8",
              padding: "20px",
              borderRadius: "10px",
              color: "black",
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
                    setNewLocation((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
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
