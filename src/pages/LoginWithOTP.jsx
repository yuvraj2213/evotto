import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginWithOTP.css"; // Import CSS file
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const LoginWithOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const requestOTP = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${baseURL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStep(2);
        setMessage(data.message);
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  const verifyOTP = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${baseURL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        storeTokenInLS(data.token); 
        navigate("/"); 
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-with-otp-main">
        <div className="login-card">
          <h2 className="login-title">Login with OTP</h2>

          {step === 1 ? (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <button
                className="primary-btn"
                onClick={requestOTP}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field"
              />
              <button
                className="primary-btn"
                onClick={verifyOTP}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {message && <p className="status-message">{message}</p>}
        </div>
      </div>
      <section className="social-links-container">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default LoginWithOTP;
