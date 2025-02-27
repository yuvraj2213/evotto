import React, { useEffect, useState } from "react";
import "../styles/CarCard.css";
import { toast, Toaster } from "react-hot-toast";
import Termsandcond from "./Termsandcond";
import { useAuth } from "../store/auth";
import CarCardSU from "./ShimmerUi/CarCardSU";
import { useNavigate } from "react-router-dom";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const CarCard = ({
  searchQuery,
  pickUpLocation,
  pickUpDate,
  pickUpTime,
  dropOffLocation,
  dropOffDuration,
}) => {
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const [selectedCar, setSelectedCar] = useState({});
  const navigate = useNavigate();

  // New state for vehicle type selection
  const [selectedVehicleType, setSelectedVehicleType] = useState("All");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/rentalVehicles`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setCars(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  const handleRentClick = (car) => {
    if (
      !pickUpLocation ||
      !pickUpDate ||
      !pickUpTime ||
      !dropOffLocation ||
      !dropOffDuration
    ) {
      toast(
        "Please select all required details (Pick-Up and Drop-Off locations, Date, Time, and Duration) before proceeding!",
        { icon: "⚠️" }
      );
      return;
    }

    const selectedDateTime = new Date(`${pickUpDate}T${pickUpTime}`);
    const currentDateTime = new Date();

    if (selectedDateTime < currentDateTime) {
      toast(
        "The selected Pick-Up Date and Time is in the past. Please select a valid date and time.",
        {
          icon: "⚠️",
        }
      );
      return;
    }

    if (!isLoggedIn) {
      toast("You need to login first", { icon: "⚠️" });
    } else {
      navigate("/rentalBooking", {
        state: {
          car,
          pickUpLocation,
          pickUpDate,
          pickUpTime,
          dropOffLocation,
          dropOffDuration,
        },
      });
    }
  };

  const handleSubmitTerms = (car) => {
    if (!isTermsAccepted) {
      toast("Please accept the terms and conditions to proceed.", {
        icon: "⚠️",
      });
      return;
    }

    const message = `
    Hello, I am interested in renting this vehicle:
    *Name:* ${car.name}
    *Pickup Location:* ${pickUpLocation}
    *Pickup Date:* ${pickUpDate}
    *Pickup Time:* ${pickUpTime}
    *Drop-Off Location:* ${dropOffLocation}
    *Drop-Off Duration:* ${dropOffDuration}
    *Image:* [${car.name}](${car.image})
    
    Please let me know the next steps. Thank you!
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/7077829595?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

    setShowTermsModal(false);
  };

  const toggleFavorite = (carName) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(carName)
        ? prevFavorites.filter((name) => name !== carName)
        : [...prevFavorites, carName]
    );
  };

  const handleVehicleTypeChange = (e) => {
    setSelectedVehicleType(e.target.value);
  };

  // Updated filtering logic with vehicle type
  const filteredCars = cars.filter((car) => {
    const matchesSearchQuery = car.name
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase());

    const matchesPickUpLocation = pickUpLocation
      ? car.location?.includes(pickUpLocation)
      : true;

    const matchesVehicleType =
      selectedVehicleType === "All" || car.vehicleType === selectedVehicleType;

    return matchesSearchQuery && matchesPickUpLocation && matchesVehicleType;
  });

  if (loading) {
    return <CarCardSU />;
  }

  return (
    <>
      <Toaster />
      <div className="car-container">
        {searchQuery === "" ? (
          <h2 style={{ color: "red" }}>Popular Vehicles</h2>
        ) : (
          <h2>Your Search Results</h2>
        )}

        {/* Dropdown for Vehicle Type Selection */}
        <div
          className="filter-container"
          style={{ marginBottom: "20px", textAlign: "center" }}
        >
          <label
            htmlFor="vehicleType"
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              marginRight: "10px",
              color: "#333",
            }}
          >
            Select Vehicle Type:
          </label>
          <select
            id="vehicleType"
            value={selectedVehicleType}
            onChange={handleVehicleTypeChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "2px solid #007BFF",
              backgroundColor: "#f8f9fa",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#007BFF",
              outline: "none",
              transition: "all 0.3s ease",
              boxShadow: "0px 4px 6px rgba(0, 123, 255, 0.1)",
            }}
          >
            <option value="All">All</option>
            <option value="EV" style={{ color: "green", fontWeight: "bold" }}>
              EV
            </option>
            <option value="Petrol" style={{ color: "red", fontWeight: "bold" }}>
              Petrol
            </option>
          </select>
        </div>

        <div className="car-cards">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div className="car-card" key={car.name}>
                <div className="card-header">
                  <span className="car-name">{car.name}</span>
                  <span
                    className="fav-heart"
                    onClick={() => toggleFavorite(car.name)}
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "16px",
                      fontSize: "24px",
                      cursor: "pointer",
                      color: favorites.includes(car.name) ? "red" : "gray",
                    }}
                  >
                    &#9829;
                  </span>
                </div>

                <div className="car-img">
                  <img src={car.image} alt={car.name} />
                </div>
                <div className="car-info">
                  <button
                    className="rentnow-btn"
                    onClick={() => handleRentClick(car)}
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-search-match">
              No vehicles found matching your search criteria.
            </p>
          )}
        </div>
      </div>

      {showTermsModal && (
        <Termsandcond
          handleSubmitTerms={handleSubmitTerms}
          isTermsAccepted={isTermsAccepted}
          setIsTermsAccepted={setIsTermsAccepted}
          setShowTermsModal={setShowTermsModal}
          filteredCars={filteredCars}
          selectedCar={selectedCar}
        />
      )}
    </>
  );
};

export default CarCard;
