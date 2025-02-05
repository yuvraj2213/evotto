import React, { useEffect, useState } from "react";
import "../../styles/Vendor/VendorManagement.css";
import { useAuth } from "../../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VendorManagement = () => {
  const { user } = useAuth();
  const userId = user?.userData?._id;

  const [vehicle, setVehicle] = useState([]);

  const getVehicles = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/vendor/getAllVehicles/${userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setVehicle(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <>
      <h1 className="vendor-vehicle-manage-heading">Vehicle Listing</h1>

      <p className="vendor-vehicle-manage-para">Currently Listed Vehicles</p>

      <div className="car-container">
        <div className="car-cards">
          {vehicle.map((car) => (
            <div className="car-card" key={car.name}>
              <div className="card-header">
                <span className="car-name">{car.name}</span>
              </div>

              <div className="car-img">
                <img src={car.image} alt={car.name} />
              </div>
              <div className="car-info"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VendorManagement;
