import React, { useState } from "react";
import "../styles/FormSwitcher.css"; // Custom CSS for styling

const FormSwitcher = () => {
  const [selectedForm, setSelectedForm] = useState("contact");

  return (
    <div className="form-switcher-container">
      <h2>Choose a Form</h2>
      <div className="radio-buttons">
        <label
          className={`radio-label ${
            selectedForm === "contact" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="formType"
            value="contact"
            checked={selectedForm === "contact"}
            onChange={() => setSelectedForm("contact")}
          />
          Contact Us
        </label>
        <label
          className={`radio-label ${
            selectedForm === "feedback" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="formType"
            value="feedback"
            checked={selectedForm === "feedback"}
            onChange={() => setSelectedForm("feedback")}
          />
          Feedback
        </label>
      </div>
      <div className="form-container">
        {selectedForm === "contact" && (
          <div className="contact-form">
            <h3>Contact Us Form</h3>

            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number:</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="Enter your comment"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        )}
        {selectedForm === "feedback" && (
          <div className="feedback-form">
            <h3>Feedback Form</h3>

            <form>
              <label>Feedback:</label>
              <textarea placeholder="Enter your feedback"></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSwitcher;
