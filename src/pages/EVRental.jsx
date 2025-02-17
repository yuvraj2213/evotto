import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RentalHeader from "../components/RentalHeader";
import TripPlanner from "../components/TripPlanner";
import CarCard from "../components/CarCard";
import SocialLinks from "../components/SocialLinks";

import "../App.css";
import "../styles/Rental.css";

const EVRental = () => {

  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [dropOffDuration, setDropOffDuration] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <>
      <Navbar />
      <section className="rental-header-main">
        <RentalHeader handleSearchChange={handleSearchChange} />
      </section>
      <div className="trip-planner-main">
        <TripPlanner
          pickUpLocation={pickUpLocation}
          setPickUpLocation={setPickUpLocation}
          pickUpDate={pickUpDate}
          setPickUpDate={setPickUpDate}
          pickUpTime={pickUpTime}
          setPickUpTime={setPickUpTime}
          dropOffLocation={dropOffLocation}
          setDropOffLocation={setDropOffLocation}
          dropOffDuration={dropOffDuration}
          setDropOffDuration={setDropOffDuration}
        />
      </div>

      <div className="car-card-main">
        <CarCard
          searchQuery={searchQuery}
          pickUpLocation={pickUpLocation}
          pickUpDate={pickUpDate}
          pickUpTime={pickUpTime}
          dropOffLocation={dropOffLocation}
          dropOffDuration={dropOffDuration}
        />
      </div>
      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default EVRental;
