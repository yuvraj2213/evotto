import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RentalHeader from "../components/RentalHeader";
import TripPlanner from "../components/TripPlanner";
import CarCard from "../components/CarCard";
import SocialLinks from '../components/SocialLinks';

import "../App.css";
import "../styles/Rental.css";

const Rental = () => {
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
        <TripPlanner />
      </div>

      <div className="car-card-main">
        <CarCard searchQuery={searchQuery} />
      </div>
      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default Rental;
