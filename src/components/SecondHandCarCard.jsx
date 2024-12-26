import React, { useEffect, useState } from "react";

const SecondHandCarCard = ({ searchQuery }) => {
  const [favorites, setFavorites] = useState([]);
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const response = await fetch(
        `http://localhost:2213/data/secondHandCars`,
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
    const matchesSearchQuery = car.name.toLowerCase().startsWith(searchQuery);

    return matchesSearchQuery;
  });

  return (
    <>
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

export default SecondHandCarCard;
