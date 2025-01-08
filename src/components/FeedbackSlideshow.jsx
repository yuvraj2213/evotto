import React, { useState, useEffect } from "react";
import "../styles/FeedbackSlideshow.css";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const FeedbackSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % feedbacks.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 2 + feedbacks.length) % feedbacks.length
    );
  };

  const getFeedbacks = async () => {
    try {
      const response = await fetch(`${baseURL}/api/form/getFeedback`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setFeedback(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch feedbacks");
      }
    } catch (error) {
      console.error("Error fetching feedbacks data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [feedbacks]); // Only re-run when feedbacks array changes

  useEffect(() => {
    getFeedbacks();
  }, []);

  if (loading) {
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
          {feedbacks.length > 0 && (
            <>
              <div className="carousel-card">
                <p className="feedback">{feedbacks[currentIndex].feedback}</p>
                <h4 className="name">{feedbacks[currentIndex].name}</h4>
                <p className="role">{feedbacks[currentIndex].role}</p>
              </div>
              <div className="carousel-card">
                <p className="feedback">
                  {
                    feedbacks[(currentIndex + 1) % feedbacks.length].feedback
                  }
                </p>
                <h4 className="name">
                  {feedbacks[(currentIndex + 1) % feedbacks.length].name}
                </h4>
                <p className="role">
                  {feedbacks[(currentIndex + 1) % feedbacks.length].role}
                </p>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
};

export default FeedbackSlideshow;
