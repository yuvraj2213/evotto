import React, { useEffect, useState } from "react";
const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const SecondHandCarCard = ({ searchQuery }) => {
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);

  const getCars = async () => {
    const response = await fetch(`${baseURL}/api/cars/getAllVehicles`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setCars(data);
  };

  useEffect(() => {
    getCars();
  }, []);

  const toggleFavorite = (carName) => {
    if (favorites.includes(carName)) {
      setFavorites(favorites.filter((name) => name !== carName));
    } else {
      setFavorites([...favorites, carName]);
    }
  };

  const filteredCars = cars.filter((car) => {
    return car.carName.toLowerCase().startsWith(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="car-container">
        {searchQuery === "" ? <h2>Popular Vehicles</h2> : <h2>Your Search Results</h2>}
        <div className="car-cards">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div className="car-card" key={car.carName}>
                <div className="card-header">
                  <span className="car-name">{car.carName}</span>
                  <span
                    className="fav-heart"
                    onClick={() => toggleFavorite(car.carName)}
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "16px",
                      fontSize: "24px",
                      cursor: "pointer",
                      color: favorites.includes(car.carName) ? "red" : "gray",
                    }}
                  >
                    &#9829;
                  </span>
                </div>

                <div className="car-img">
                  <img
                    src={car.carPhotos && car.carPhotos.length > 0 ? car.carPhotos[0] : "placeholder-image-url"}
                    alt={car.carName}
                    className="car-photo"
                  />
                </div>

                <div className="car-info">
                  <button className="rentnow-btn">Buy Now</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-search-match">No vehicles found matching your search criteria.</p>
          )}
        </div>
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        .car-img {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
          overflow: hidden;
        }

        .car-photo {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.3s ease-in-out;
        }

        .car-photo:hover {
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
};

export default SecondHandCarCard;
