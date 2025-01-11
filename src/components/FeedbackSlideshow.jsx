import React, { useState, useEffect } from "react";
import "../styles/FeedbackSlideshow.css";
import { LuUser } from "react-icons/lu";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const FeedbackSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    if (feedbacks.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % feedbacks.length);
    }
  };

  const handlePrev = () => {
    if (feedbacks.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 2 + feedbacks.length) % feedbacks.length
      );
    }
  };

  const getFeedbacks = async () => {
    try {
      const response = await fetch(`${baseURL}/api/form/getFeedback`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback(data);
      } else {
        console.error("Failed to fetch feedbacks");
      }
    } catch (error) {
      console.error("Error fetching feedbacks data:", error);
    } finally {
      setLoading(false); // Stop the loading spinner regardless of success or error
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [feedbacks]); // Only re-run when feedbacks array changes

  if (loading || feedbacks.length === 0) {
    return <p>Loading feedbacks...</p>;
  }

  return (
    <>
      <div className="feedback-heading">
        <h2
          style={{
            textAlign: "center",
            backgroundColor: "white",
            color: "#e71d36",
            padding: "10px",
            borderRadius: "22px",
          }}
        >
          Straight from Customer's Heart
        </h2>
      </div>

      <div className="carousel-container">
        <div className="carousel-content">
          <div className="carousel-card">
            <p className="feedback">{feedbacks[currentIndex].feedback}</p>
            <h4 className="name">
              <LuUser />
              {feedbacks[currentIndex].name}
            </h4>
          </div>
          <div className="carousel-card">
            <p className="feedback">
              {feedbacks[(currentIndex + 1) % feedbacks.length].feedback}
            </p>
            <h4 className="name">
              <LuUser />
              {feedbacks[(currentIndex + 1) % feedbacks.length].name}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackSlideshow;
