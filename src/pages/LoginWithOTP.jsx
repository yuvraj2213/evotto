import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginWithOTP.css"; // Import the CSS file
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

  // Handle OTP request
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
        storeTokenInLS(data.token); // ✅ Store token and trigger authentication
        navigate("/"); // Redirect after login
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
      <div className="login-container">
        <h2>Login with OTP</h2>

        {step === 1 ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="send-otp-btn" onClick={requestOTP} disabled={loading}>
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
            />
            <button className="verify-otp-btn" onClick={verifyOTP} disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {message && <p className="message">{message}</p>}
      </div>
      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default LoginWithOTP;
