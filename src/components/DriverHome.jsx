import React, { useState } from "react";
import "../styles/AdminHome.css";
import "../styles/DriverHome.css";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/auth";

const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const DriverHome = () => {
  const { user, authorizationToken } = useAuth();
  const [status, setStatus] = useState(user?.userData?.isDriverOnline || false);

  const updateStatus = async (newStatus) => {
    try {
      console.log("token", authorizationToken);
      const response = await fetch(`${baseURL}/api/data/changeStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ isDriverOnline: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus(newStatus);
        toast.success(`Status updated to ${newStatus ? "Available" : "Unavailable"}`);
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <>
    <Toaster/>
      <h1>Hey There, Welcome to Driver Panel</h1>
      <h3>Set Status</h3>
      <div className="driver-availability-status">
        <button
          onClick={() => updateStatus(true)}
          className={status ? "active" : ""}
        >
          Available
        </button>
        <button
          onClick={() => updateStatus(false)}
          className={!status ? "active" : ""}
        >
          Unavailable
        </button>
      </div>
    </>
  );
};

export default DriverHome;
