import React, { useState } from "react";
import "../styles/CarCard.css";

const cars = [
  {
    name: "R15 V4",
    image: "/images/vehicleList/r15v4.webp",
    price: "₹1209/day",
    weekendPrice: "₹1497/day",
  },
  {
    name: "Dominar 400",
    image: "/images/vehicleList/dominar400.webp",
    price: "₹1369/day",
    weekendPrice: "₹1579/day",
  },
  {
    name: "Activa 4G",
    image: "/images/vehicleList/activa4g.png",
    price: "₹767/day",
    weekendPrice: "₹839/day",
  },
  {
    name: "Zoom Scooty",
    image: "/images/vehicleList/zoom.avif",
    price: "₹809/day",
    weekendPrice: "₹879/day",
  },
  {
    name: "Pulsar NS160",
    image: "/images/vehicleList/pulsarns160.jpg",
    price: "₹1199/day",
    weekendPrice: "₹1399/day",
  },
  {
    name: "Dominar 250",
    image: "/images/vehicleList/dominar250.webp",
    price: "₹1109/day",
    weekendPrice: "₹1309/day",
  },
  {
    name: "Bullet 350",
    image: "/images/vehicleList/bullet350.webp",
    price: "₹1409/day",
    weekendPrice: "₹1609/day",
  },
  {
    name: "GT 650",
    image: "/images/vehicleList/gt650.webp",
    price: "₹2499/day",
    weekendPrice: "₹2799/day",
  },
  {
    name: "Swift",
    image: "/images/vehicleList/swift.png",
    price: "₹1909/day",
    weekendPrice: "₹2119/day",
  },
  {
    name: "Amaze",
    image: "/images/vehicleList/amaze.webp",
    price: "₹1809/day",
    weekendPrice: "₹2009/day",
  },
  {
    name: "Thar",
    image: "/images/vehicleList/thar.webp",
    price: "₹2599/day",
    weekendPrice: "₹2899/day",
  },
];

const CarCard = ({ priceRange, searchQuery }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (carName) => {
    if (favorites.includes(carName)) {
      setFavorites(favorites.filter((name) => name !== carName));
    } else {
      setFavorites([...favorites, carName]);
    }
  };

  const filteredCars = cars.filter((car) => {
    // const isInPriceRange =
    //   parseInt(car.price.replace(/[^\d]/g, "")) >= priceRange.minPrice &&
    //   parseInt(car.price.replace(/[^\d]/g, "")) <= priceRange.maxPrice;

    const matchesSearchQuery = car.name.toLowerCase().startsWith(searchQuery);

    return matchesSearchQuery;
  });

  return (
    <div className="car-container">
      {searchQuery===''?<h2>Popular Vehicles</h2>:<h2>Your Search Results</h2>}
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
                <div className="price-container">
                  <p>Weekday Price : {car.price}</p>
                  <p>Weekend Price : {car.weekendPrice}</p>
                </div>
                <button className="rentnow-btn">Rent Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-search-match">No vehicles found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
};

export default CarCard;
