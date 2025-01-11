import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/auth";
const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

import "../styles/Feedback.css";
import "../App.css";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const { user, isLoggedIn } = useAuth(); // Fetch user data from context

  // Update form data whenever the user data changes
  useEffect(() => {
    if (user?.userData) {
      setFormData({
        name: user.userData.name || "",
        email: user.userData.email || "",
        feedback: "",
      });
    }

    if (!isLoggedIn) {
      setFormData({
        name: "",
        email: "",
        feedback: "",
      });
    }
  }, [user, isLoggedIn]); // Run this effect whenever `user` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${baseURL}/api/form/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Feedback Not Submitted");
        return;
      }

      const data = await response.json();
      toast.success("Feedback Submitted");

      setFormData({
        name: "",
        email: "",
        feedback: "",
      });
    } catch (e) {
      console.log(e);
    }

    console.log("Feedback submitted:", formData);
    setSubmitted(true);
  };

  return (
    <>
      <Toaster />
      <Navbar />

      <div className="feedback-form-img">
      <div className="feedback-beside-img">
        <img src="/images/feedbackBeside.png" alt="Feedback" />
      </div>

      <div className="feedback-container">
        <h1>We Value Your Feedback</h1>
        <p>Please let us know how we can improve our services.</p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="feedback">Feedback:</label>
              <textarea
                id="feedback"
                name="feedback"
                rows="5"
                value={formData.feedback}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        ) : (
          <div className="thank-you">
            <h2>Thank You!</h2>
            <p>
              Your feedback has been received. We appreciate your time and
              effort!
            </p>
          </div>
        )}
      </div>
      </div>

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default FeedbackPage;
