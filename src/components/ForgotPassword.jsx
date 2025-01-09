import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to send reset link!");
        return;
      }

      toast.success("Password reset link sent to your email!");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="forgot-password-container">
      <Toaster />
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
