import React, { useEffect, useState } from "react";
import "../styles/AdminHome.css";
import { useAuth } from "../store/auth";
import { useContext } from "react";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminHome = () => {
  const { authorizationToken } = useAuth();
  const [userCount,setUserCount]=useState(0)
  const [feedbackCount,setFeedbackCount]=useState(0)

  const getUsersCount = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/usersCount`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserCount(data.count)
      } else {
        console.error("Failed to fetch user count");
      }
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const getFeedbacksCount = async () => {
    try {
      const response = await fetch(`${baseURL}/api/admin/feedbacksCount`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFeedbackCount(data.count)
      } else {
        console.error("Failed to fetch feedback count");
      }
    } catch (error) {
      console.error("Error fetching feedback count:", error);
    }
  };

  useEffect(() => {
    getUsersCount();
    getFeedbacksCount();
  },[]);

  return (
    <>
      <h1>Hey There, Welcome to admin panel</h1>

      <div className="admin-home-cards">
        <div className="admin-total-users">
            <h2>Total Users :</h2>
            <h2 style={{fontSize:'40px'}}>{userCount}</h2>
        </div>
        <div className="admin-total-users">
            <h2>Total Feedbacks :</h2>
            <h2 style={{fontSize:'40px'}}>{feedbackCount}</h2>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
