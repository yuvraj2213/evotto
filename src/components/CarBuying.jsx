import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../App.css";
import "../styles/CarBuying.css";

const CarBuying = () => {
  const cars = [
    {
      name: "Swift",
      image: "/images/vehicleList/swift.png",
    },
    {
      name: "Amaze",
      image: "/images/vehicleList/amaze.webp",
    },
    {
      name: "Thar",
      image: "/images/vehicleList/thar.webp",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
   
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (carName) => {
    if (favorites.includes(carName)) {
      setFavorites(favorites.filter((name) => name !== carName));
    } else {
      setFavorites([...favorites, carName]);
    }
  };

  const filteredCars = cars.filter((car) => {
    const matchesSearchQuery = car.name.toLowerCase().startsWith(searchQuery);

    return matchesSearchQuery;
  });

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <FaSearch />
        </button>
      </div>

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
                  <button className="rentnow-btn">Buy Now</button>
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

export default CarBuying;
