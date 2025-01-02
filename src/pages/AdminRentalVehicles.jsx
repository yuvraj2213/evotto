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

  const [vehicles,setVehicles]=useState([])

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
        `${baseURL}/api/admin/rentalVehicles/delete/${id}`,
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

  const handleOnClick=(id)=>{
    setVehicleId(id)
    setShowForm(true);
    console.log(id)
  }

  useEffect(() => {
    getAllVehiclesData();
  }, [vehicles]);

  return (
    <>
      <Toaster />
      <section className="admin-rental-vehicles-section">
        <div className="container">
          <h1>Admin Rental Vehicles Data</h1>
        </div>
        <div className="admin-rental-vehicles">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Weekday Price</th>
                <th>Weekend Price</th>
                <th>Available</th>
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
                  <td>{vehicle.weekdayPrice}</td>
                  <td>{vehicle.weekendPrice}</td>
                  <td>{vehicle.isAvailable ? "Yes" : "No"}</td>
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

        {showForm && <VehicleUpdateForm setShowForm={setShowForm} vehicleId={vehicleId}/>}
      </section>
      <Footer />
    </>
  );
};

export default AdminRentalVehicles;
