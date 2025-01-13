import React, { useState, useEffect } from "react";
import "../styles/FeedbackSlideshow.css";
import { LuUser } from "react-icons/lu"; // Using React Icon

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const FeedbackSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleNext = () => {
    if (feedbacks.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }
  };

  const handlePrev = () => {
    if (feedbacks.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + feedbacks.length) % feedbacks.length
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
        setFeedbacks(data);
      } else {
        console.error("Failed to fetch feedbacks");
      }
    } catch (error) {
      console.error("Error fetching feedbacks data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Auto-scroll every 5 seconds
    return () => clearInterval(interval);
  }, [feedbacks]);

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  if (feedbacks.length === 0) {
    return <p>No feedbacks available at the moment.</p>;
  }

  const prevIndex = (currentIndex - 1 + feedbacks.length) % feedbacks.length;
  const nextIndex = (currentIndex + 1) % feedbacks.length;

  return (
    <div className="feedback-slideshow">
      <h2 className="feedback-heading">Straight from the Customer's heart</h2>

      <div className="carousel-container">
        {/* Previous Feedback */}
        <div className="carousel-card faded">
          <p className="feedback">{feedbacks[prevIndex]?.feedback}</p>
          <div className="user-info">
            <div className="profile-circle">
              <LuUser className="user-icon" />
              <h4 className="name">{feedbacks[prevIndex]?.name}</h4>
            </div>
          </div>
        </div>

        {/* Current Feedback */}
        <div className="carousel-card active">
          <p className="feedback">{feedbacks[currentIndex]?.feedback}</p>
          <div className="user-info">
            <div className="profile-circle">
              <LuUser className="user-icon" />
              <h4 className="name">{feedbacks[currentIndex]?.name}</h4>
            </div>
          </div>
        </div>

        {/* Next Feedback */}
        <div className="carousel-card faded">
          <p className="feedback">{feedbacks[nextIndex]?.feedback}</p>
          <div className="user-info">
            <div className="profile-circle">
              <LuUser className="user-icon" />
              <h4 className="name">{feedbacks[nextIndex]?.name}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSlideshow;
