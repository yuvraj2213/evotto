import React from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import RentalHeader from "../components/RentalHeader";
import TripPlanner from "../components/TripPlanner";

import "../App.css";
import "../styles/Rental.css"

const Rental = () => {
  return (
    <>
      <UserNavbar />
      <section className="rental-header-main">
        <RentalHeader />
      </section>
      <div className="trip-planner-main">
        <TripPlanner />
      </div>

      <Footer />
    </>
  );
};

export default Rental;
