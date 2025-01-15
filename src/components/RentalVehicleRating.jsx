import React from "react";
import { FaStar } from "react-icons/fa"; // For star icon

const Rating = ({ rating = 0, totalRatings = 0, totalReviews = 0 }) => {
  return (
    <div style={styles.container}>
      <div style={styles.ratingBox}>
        <span style={styles.ratingText}>{rating}</span>
        <FaStar style={styles.starIcon} />
      </div>
      <div style={styles.details}>
        {totalRatings.toLocaleString()} Ratings & {totalReviews} Reviews
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontFamily: "Arial, sans-serif",
  },
  ratingBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Green background
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  ratingText: {
    marginRight: "4px",
  },
  starIcon: {
    color: "#fff",
    fontSize: "14px",
  },
  details: {
    color: "#555", // Gray text
    fontSize: "14px",
  },
};

export default Rating;
