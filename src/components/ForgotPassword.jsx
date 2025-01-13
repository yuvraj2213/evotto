import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`${baseURL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to send reset link!");
        return;
      }

      toast.success("Password reset link sent to your email!");
      setEmail(""); // Clear input
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false); // End loading
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
            placeholder="Enter your registered email"
            required
            disabled={isLoading} // Disable input while loading
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
