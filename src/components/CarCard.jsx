import React, { useEffect, useState } from "react";
import "../styles/CarCard.css";
import { toast, Toaster } from "react-hot-toast";
import Termsandcond from "./Termsandcond";

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

  const fetchCars = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/rentalVehicles`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setCars(data);
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
        {
          icon: "⚠️",
        }
      );
      return;
    }

    // Combine pickUpDate and pickUpTime into a Date object
    const selectedDateTime = new Date(`${pickUpDate}T${pickUpTime}`);
    const currentDateTime = new Date();

    // Check if the selected date/time is in the past
    if (selectedDateTime < currentDateTime) {
      toast(
        "The selected Pick-Up Date and Time is in the past. Please select a valid date and time.",
        {
          icon: "⚠️",
        }
      );
      return;
    }

    // Show the Terms and Conditions modal
    setShowTermsModal(true);
  };

  const handleSubmitTerms = (car) => {
    if (!isTermsAccepted) {
      toast("Please accept the terms and conditions to proceed.", {
        icon: "⚠️",
      });
      return;
    }

    // Construct the WhatsApp message
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

    // Close the modal after submitting
    setShowTermsModal(false);
  };

  const toggleFavorite = (carName) => {
    if (favorites.includes(carName)) {
      setFavorites(favorites.filter((name) => name !== carName));
    } else {
      setFavorites([...favorites, carName]);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearchQuery = car.name
      .toLowerCase()
      .startsWith(searchQuery.toLowerCase());
    return matchesSearchQuery;
  });

  return (
    <>
      <Toaster />
      <div className="car-container">
        {searchQuery === "" ? (
          <h2>Popular Vehicles</h2>
        ) : (
          <h2>Your Search Results</h2>
        )}
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

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <Termsandcond
          handleSubmitTerms={handleSubmitTerms}
          isTermsAccepted={isTermsAccepted}
          setIsTermsAccepted={setIsTermsAccepted}
          filteredCars={filteredCars}
        />
      )}
    </>
  );
};

export default CarCard;
