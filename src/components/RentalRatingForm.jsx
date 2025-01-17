import React, { useState } from "react";
import "../styles/RentalRatingForm.css"; // Import the CSS file for styling

const RentalRatingForm = ({ vehicleId, onReviewAdded }) => {
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = { user, comment, rating };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app"}/api/data/rentalVehicle/${vehicleId}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setUser("");
        setComment("");
        setRating("");
        onReviewAdded();
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3 className="form-title">Rate This Vehicle</h3>
      <div className="form-group">
        <label htmlFor="user">Name:</label>
        <input
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Rating (1-5):</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          placeholder="Enter your rating"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment"
          required
        ></textarea>
      </div>
      <button type="submit" className="submit-btn">
        Submit Review
      </button>
    </form>
  );
};

export default RentalRatingForm;
