import React, { useEffect, useState } from "react";
import "../styles/CarCard.css";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';

const CarCard = ({ searchQuery, pickUpLocation, pickUpDate, pickUpTime, dropOffLocation, dropOffDuration }) => {
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await fetch(
        `http://localhost:2213/api/data/rentalVehicles`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCars(data);
      }
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  const handleRentClick = (car) => {

    if (!pickUpLocation || !pickUpDate || !pickUpTime || !dropOffLocation || !dropOffDuration) {
      toast('Please select all required details (Pick-Up and Drop-Off locations, Date, Time, and Duration) before proceeding.!', {
        icon: '⚠️',
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
    const whatsappURL = `https://wa.me/7261007718?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };
  
  useEffect(() => {
    fetchCars();
  }, []);

  const toggleFavorite = (carName) => {
    if (favorites.includes(carName)) {
      setFavorites(favorites.filter((name) => name !== carName));
    } else {
      setFavorites([...favorites, carName]);
    }
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearchQuery = car.name.toLowerCase().startsWith(searchQuery.toLowerCase());
    return matchesSearchQuery;
  });

  return (
    <>
    <Toaster/>
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
    </>
  );
};

export default CarCard;
