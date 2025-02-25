import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";
import "../styles/AdminRentalVehicles.css";
import toast, { Toaster } from "react-hot-toast";
import VehicleUpdateForm from "../components/Admin/VehicleUpdateForm";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminPendingVehicles = () => {
  const { authorizationToken } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Tracks loading for specific button

  const getAllVehiclesData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/pendingVehicles`, {
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

  const handleAcceptClick = async (e, id, name, image, description, vendor, vendorId) => {
    e.preventDefault();
    setLoadingId(id); // Set loading state for specific vehicle

    const payload = {
      name,
      image,
      description,
      sixhrPrice: "",
      twelvehrPrice: "",
      twentyfourhrPrice: "",
      isAvailable: true,
      location: "",
      vendor,
      vendorId,
    };

    try {
      const addResponse = await fetch(`${baseURL}/api/admin/acceptPendingVehicle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(payload),
      });

      if (addResponse.ok) {
        const deleteResponse = await fetch(`${baseURL}/api/admin/deletePendingVehicle/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });

        if (deleteResponse.ok) {
          toast.success("Vehicle moved to Rental Vehicles and removed from Pending.");
          getAllVehiclesData(); // Refresh list from backend
        } else {
          toast.error("Failed to remove vehicle from pending list.");
        }
      } else {
        toast.error("Failed to add the vehicle.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the vehicle.");
    } finally {
      setLoadingId(null); // Reset loading state after operation
    }
  };

  useEffect(() => {
    getAllVehiclesData();
  }, []);

  return (
    <>
      <Toaster />
      <section className="admin-rental-vehicles-section">
        <div className="container">
          <h1>Admin Pending Rental Vehicles Data</h1>
        </div>

        <div className="admin-rental-vehicles">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Vehicle Number</th>
                <th>KM Running</th>
                <th>Vendor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle._id}>
                  <td>{vehicle.name}</td>
                  <td>
                    <a href={vehicle.image} target="_blank" rel="noopener noreferrer">
                      View Image
                    </a>
                  </td>
                  <td>{vehicle.description}</td>
                  <td>{vehicle.vehicleNumber}</td>
                  <td>{vehicle.kmRunning}</td>
                  <td>{vehicle.vendor}</td>
                  <td>
                    <button
                      className="pending-accept-btn"
                      onClick={(e) =>
                        handleAcceptClick(
                          e,
                          vehicle._id,
                          vehicle.name,
                          vehicle.image,
                          vehicle.description,
                          vehicle.vendor,
                          vehicle.vendorId
                        )
                      }
                      disabled={loadingId === vehicle._id} // Disable only the clicked button
                    >
                      {loadingId === vehicle._id ? "Accepting..." : "Accept"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminPendingVehicles;
