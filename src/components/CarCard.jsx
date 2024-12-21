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

const CarCard = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (carName) => {
    if (favorites.includes(carName)) {
      // Remove from favorites
      setFavorites(favorites.filter((name) => name !== carName));
    } else {
      // Add to favorites
      setFavorites([...favorites, carName]);
    }
  };

  return (
    <div className="car-container">
      <h2>Popular Vehicles</h2>
      <div className="car-cards">
        {cars.map((car) => (
          <div className="car-card" key={car.name}>
            <h3>{car.name}</h3>
            <span
              onClick={() => toggleFavorite(car.name)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "24px",
                cursor: "pointer",
                color: favorites.includes(car.name) ? "red" : "gray",
              }}
            >
              &#9829;
            </span>
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
        ))}
      </div>
    </div>
  );
};

export default CarCard;