import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";
import "../styles/UserOrders.css";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const UserOrders = () => {
  const { authorizationToken } = useAuth();
  const [activeTab, setActiveTab] = useState("current");

  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);

  const fetchCurrentBookings = async () => {
    try {
      const response = await fetch(`${baseURL}/api/users/getAllOrders`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentBookings(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchCurrentBookings();
  }, []);

  return (
    <>
      <Navbar />

      <div className="orders-main">
        <div className="order-heading">
          <h1>Your Bookings</h1>
        </div>

        {/* Tabs for selecting current or previous orders */}
        <div className="order-tabs">
          <button
            className={activeTab === "current" ? "active-tab" : ""}
            onClick={() => setActiveTab("current")}
          >
            Current Bookings
          </button>
          <button
            className={activeTab === "previous" ? "active-tab" : ""}
            onClick={() => setActiveTab("previous")}
          >
            Previous Bookings
          </button>
        </div>

        {/* Orders List */}
        <div className="order-list">
          {activeTab === "current" ? (
            currentBookings.length > 0 ? (
              currentBookings.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-details">
                    <span>Order Type:</span> <span>{order.type}</span>
                  </div>
                  <div className="order-details">
                    <span>Order Amount:</span> <span>{order.amount}</span>
                  </div>
                  <div className="order-details">
                    <span>Vehicle:</span> <span>{order.vehicle}</span>
                  </div>
                  <div className="order-details">
                    <span>Order Status:</span> <span>{order.isCompleted ? "Completed" : "Ongoing"}  </span>
                  </div>
                </div>
                              
              ))
            ) : (
              <p>No current bookings</p>
            )
          ) : previousBookings.length > 0 ? (
            previousBookings.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-details">
                  <span>Order Type:</span> <span>{order.type}</span>
                </div>
                <div className="order-details">
                  <span>Order Amount:</span> <span>{order.amount}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No previous bookings</p>
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

export default UserOrders;

