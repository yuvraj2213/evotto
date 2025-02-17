import React, { useState, useContext } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/auth";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const Login = ({ check, setCheck }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data Sent to Backend:", formData);

    try {
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error Data:", errorData);
        toast.error(errorData.message || "Login failed!");
        return;
      }

      const data = await response.json();
      console.log("Response Data:", data);

      toast.success("Login Successful!");
      storeTokenInLS(data.token);

      setFormData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Toaster />
      <div className="signup-container">
        <h1 className="signup-heading-color">Login</h1>
        <form onSubmit={handleSubmit} className="signup-form">
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
            <label htmlFor="password">Password:</label>
            <input
              type={passwordVisible ? "text" : "password"} // Toggle password visibility
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              {passwordVisible ? "Hide Password" : "Show Password"}
            </button>
          </div>
          {/* <div className="form-links">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div> */}
          <div className="user-check">
            <button type="button" onClick={() => setCheck(!check)}>
              New here
            </button>
          </div>
          <button type="submit" className="signup-button">
            Login
          </button>
        </form>

          <h3 style={{textAlign:'center',color:'white'}}>OR</h3>

        <Link
          className="login-with-otp-btn"
          to="/loginwithotp"
          style={{
            display: "block",
            width: "200px",
            padding: "12px",
            margin: "20px auto",
            textAlign: "center",
            backgroundColor: "#3b82f6", // Blue background
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow
            transition:
              "background-color 0.3s ease-in-out, transform 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#2563eb"; // Darker blue on hover
            e.target.style.transform = "scale(1.05)"; // Slight zoom on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#3b82f6"; // Revert to original color
            e.target.style.transform = "scale(1)"; // Revert to normal size
          }}
        >
          Login With OTP
        </Link>
      </div>
    </>
  );
};

export default Login;
