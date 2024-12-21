import React, { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import RentalHeader from "../components/RentalHeader";
import TripPlanner from "../components/TripPlanner";
import CarCard from "../components/CarCard";

import "../App.css";
import "../styles/Rental.css";

const Rental = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  return (
    <>
      <UserNavbar />
      <section className="rental-header-main">
        <RentalHeader handleSearchChange={handleSearchChange}/>
      </section>
      <div className="trip-planner-main">
        <TripPlanner />
      </div>

      <div className="car-card-main">
        <CarCard searchQuery={searchQuery}/>
      </div>

      <Footer />
    </>
  );
};

export default Rental;
