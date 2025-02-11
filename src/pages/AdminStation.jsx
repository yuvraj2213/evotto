import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import toast, { Toaster } from "react-hot-toast";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminStation = () => {
  const [selectedStation, setSelectedStation] = useState("KIIT");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { authorizationToken } = useAuth();

  const dropdownStyle = {
    width: "16rem",
    padding: "12px",
    border: "1px solid #d1d5db", // Light gray border
    borderRadius: "8px",
    backgroundColor: "white",
    color: "#4b5563", // Medium gray text
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    cursor: "pointer",
    transition:
      "background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  };

  const dropdownHoverStyle = {
    backgroundColor: "#f9fafb", // Lighter gray on hover
  };

  useEffect(() => {
    const fetchVehicles = async () => {
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
          setLoading(false);
        } else {
          toast.error("Failed to fetch rental vehicles data.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(
    (vehicle) => vehicle.location && vehicle.location.includes(selectedStation)
  );

  console.log("Filtered Vehicles:", filteredVehicles);

  return (
    <div>
      <h2>Select Station</h2>
      <select
        onChange={(e) => setSelectedStation(e.target.value)}
        value={selectedStation}
        style={dropdownStyle}
        onMouseEnter={(e) =>
          (e.target.style.backgroundColor = dropdownHoverStyle.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.target.style.backgroundColor = dropdownStyle.backgroundColor)
        }
      >
        <option value="KIIT">KIIT</option>
        <option value="ITER">ITER</option>
      </select>

      <h3>Available Vehicles at {selectedStation}</h3>

      <div className="admin-users">
        {loading ? (
          <p>Loading vehicles...</p>
        ) : filteredVehicles.length > 0 ? (
          <table
            border="1"
            cellPadding="10"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Vehicle Name</th>
                <th>Image</th>
                <th>Vendor</th>
                <th>6hr Price</th>
                <th>12hr Price</th>
                <th>24hr Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle._id}>
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
                  <td>{vehicle.vendor}</td>
                  <td>{vehicle.sixhrPrice}</td>
                  <td>{vehicle.twelvehrPrice}</td>
                  <td>{vehicle.twentyfourhrPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No vehicles available at this station.</p>
        )}
      </div>
    </div>
  );
};

export default AdminStation;
