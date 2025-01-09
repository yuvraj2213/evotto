import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Password reset failed!");
        return;
      }

      toast.success("Password reset successful! Please login.");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ 
      width: "100%", 
      maxWidth: "400px", 
      margin: "50px auto", 
      padding: "20px", 
      textAlign: "center", 
      backgroundColor: "#f9f9f9", 
      border: "1px solid #ccc", 
      borderRadius: "5px" 
    }}>
      <Toaster />
      <h1 style={{ marginBottom: "20px" }}>Reset Password</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label htmlFor="newPassword" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ 
              width: "100%", 
              padding: "10px", 
              fontSize: "16px", 
              border: "1px solid #ccc", 
              borderRadius: "5px" 
            }}
          />
        </div>
        <div style={{ marginBottom: "15px", textAlign: "left" }}>
          <label htmlFor="confirmPassword" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ 
              width: "100%", 
              padding: "10px", 
              fontSize: "16px", 
              border: "1px solid #ccc", 
              borderRadius: "5px" 
            }}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: "10px 20px", 
            fontSize: "16px", 
            color: "#fff", 
            backgroundColor: "#007bff", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
