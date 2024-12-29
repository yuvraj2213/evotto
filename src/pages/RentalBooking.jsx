import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import { useLocation } from "react-router-dom";

import "../styles/RentalBooking.css";

const RentalBooking = () => {
  const location = useLocation();
  const vehicleId = location.state?.rentalId;
  console.log(vehicleId);

  const [vehicle, setVehicle] = useState([]);

  const getVehicle = async () => {
    try {
      const response = await fetch(
        `https://evotto-backend.onrender.com/api/data/vehicle/${vehicleId}`,
        { method: "GET" }
      );
      const data = await response.json();

      setVehicle(data);
      console.log("data", data);
      console.log("vehicle data", vehicle);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVehicle();
  }, [vehicleId]);

  if (!vehicle) {
    // Show a loading message or placeholder while vehicle data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div className="rental-booking-main">
        <div
          className="rental-vehicle-img"
          style={{
            backgroundImage: vehicle[0]?.image
              ? `url(${vehicle[0].image})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        </div>
        <div className="rental-vehicle-info">Info</div>
      </div>

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default RentalBooking;
