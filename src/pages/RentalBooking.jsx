import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import { useLocation } from "react-router-dom";
import "../styles/RentalBooking.css";
import RentalVehicleRating from "../components/RentalVehicleRating";
import { BiSolidOffer } from "react-icons/bi";
import RideOptions from "../components/RideOptions";
import FeedbackSlideshow from "../components/FeedbackSlideshow";
import RentalRatingForm from "../components/RentalRatingForm";
import Slideshow from "../components/Slideshow";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const RentalBooking = () => {
  const location = useLocation();
  const {
    car,
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffLocation,
    dropOffDuration,
  } = location.state || {};

  const vehicleId = car?._id || null;

  const [vehicle, setVehicle] = useState([]);
  const [totalCost, setTotalCost] = useState(0); // Track total cost
  const [pricePerHour, setPricePerHour] = useState(0); // Track price per hour
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3); // For pagination

  // Fetch vehicle details
  const getVehicle = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/vehicle/${vehicleId}`, {
        method: "GET",
      });
      const data = await response.json();
      setVehicle(data); // Update the vehicle state
      setReviews(data[0]?.reviews || []); // Safely update reviews
    } catch (e) {
      console.error(e);
    }
  };

  // Calculate Price
  useEffect(() => {
    if (car && dropOffDuration) {
      const perHourPrice = Math.ceil(Number(car?.sixhrPrice) / 6);
      setPricePerHour(perHourPrice);

      if (parseInt(dropOffDuration, 10) <= 5) {
        const calculatedCost = perHourPrice * parseInt(dropOffDuration, 10);
        setTotalCost(calculatedCost);
      } else {
        let duration = parseInt(dropOffDuration, 10);
        if (duration === 6) {
          setTotalCost(car.sixhrPrice);
        } else if (duration === 12) {
          setTotalCost(car.twelvehrPrice);
        } else if (duration === 24) {
          setTotalCost(car.twentyfourhrPrice);
        }
      }
    }
  }, [car, dropOffDuration]);

  useEffect(() => {
    if (vehicleId) {
      getVehicle();
    } else {
      console.error("Vehicle ID is missing.");
    }
  }, [vehicleId]);

  // Handle Payment with Razorpay
  const handlePayment = async () => {
    const options = {
      key: "your_razorpay_key_id", // Replace with your Razorpay key
      amount: totalCost * 100, // Razorpay accepts payment in paisa (₹1 = 100 paisa)
      currency: "INR",
      name: "Evotto Rentals",
      description: "Vehicle Rental Payment",
      image: "/images/logo.png", // Optional: Your logo
      handler: function (response) {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        console.log("Payment Response:", response);
      },
      prefill: {
        name: "John Doe", // Prefilled customer name
        email: "johndoe@example.com", // Prefilled customer email
        contact: "9876543210", // Prefilled customer phone number
      },
      notes: {
        booking_id: vehicleId, // Optional: Add additional notes
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Load More Reviews
  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3); // Load 3 more reviews
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="rental-vehicle-heading">
        <h2 className="rental-heading-text">
          Let's Ride With <span className="evotto-highlight">Evotto</span>
        </h2>
      </div>

      <div className="rental-booking-main">
        <div className="rental-booking-img">
          <img src={vehicle[0]?.image} alt="" width={500} />
          <div className="trip-planner-info">
            <div className="pickup-info">
              <h4>PickUp Location : {pickUpLocation}</h4>
              <h4>PickUp Date : {pickUpDate}</h4>
              <h4>PickUp Time : {pickUpTime}</h4>
            </div>
            <div className="dropoff-info">
              <h4>DropOff Location : {dropOffLocation}</h4>
              <h4>DropOff Duration : {dropOffDuration}</h4>
            </div>
          </div>
          <div className="rental-booking-slideshow">
            <Slideshow />
          </div>
        </div>
        <div className="rental-vehicle-info">
          <h3 className="rental-car-name">{car?.name || "Vehicle Name"}</h3>
          <RentalVehicleRating />

          {/* Pricing Calculation */}
          <h2 className="rental-total-cost">
            Total Cost: {totalCost > 0 ? `₹${totalCost}` : "Calculating..."}
          </h2>
          <a className="rental-pay-now-btn" href="https://razorpay.me/@evottoprivatelimited" >
            Pay Now
          </a>

          <h3 className="rental-vehicle-description-heading">
            Available Offers :
          </h3>
          <p className="rental-vehicle-description">
            <ul className="rental-offer-list">
              <li>
                <BiSolidOffer color="#6CAE75" size={20} />
                30 minutes extra ride time for students
              </li>
            </ul>
          </p>

          <h3 className="rental-vehicle-description-heading">Description : </h3>
          <p className="rental-vehicle-description">{car?.desc}</p>

          <div className="rental-rating-review">
            <div className="rental-vehicle-review-heading">
              <h3>Ratings and Reviews : </h3>
              <button onClick={() => setIsReviewFormOpen(!isReviewFormOpen)} className="rental-rate-btn">
                {isReviewFormOpen ? "Close Form" : "Rate The Vehicle"}
              </button>
            </div>
            {isReviewFormOpen && (
              <RentalRatingForm
                vehicleId={vehicleId}
                onReviewAdded={() => {
                  alert("Review added successfully!");
                  setIsReviewFormOpen(false);
                }}
              />
            )}
            <div className="rental-review-card-main">
              {reviews.slice(0, visibleReviews).map((curr, index) => (
                <div key={index} className="rental-review-card">
                  <p>{curr.comment}</p>
                  <p className="review-user-info">{curr.user || "Anonymous"}</p>
                </div>
              ))}
              {visibleReviews < reviews.length && (
                <button onClick={loadMoreReviews}>Load More Reviews</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <RideOptions />

      <FeedbackSlideshow />

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default RentalBooking;
