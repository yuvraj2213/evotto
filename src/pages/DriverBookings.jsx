import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "../styles/DriverHome.css";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const DriverBookings = () => {
  const { authorizationToken } = useAuth();
  const [orders, setOrders] = useState([]);

  const getAllOrdersData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/getAllDriverOrders`, {
        method: "GET",
      });

      const data = await response.json();
      setOrders(data);
    } catch (e) {
      console.log(e);
    }
  };

  const acceptOrder = async (orderId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/data/acceptOrder/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken, 
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Update the order status locally without needing to fetch again
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, isAccepted: true } : order
          )
        );
        toast.success("Order Accepted!");
      } else {
        toast.error(data.message || "Failed to accept order");
      }
    } catch (error) {
      console.error("Error accepting order:", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getAllOrdersData();
  }, []);

  return (
    <>
      <Toaster />
      <section className="admin-users-section">
        <div className="container">
          <h1>Driver Orders Data</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((curr, index) => {
                return (
                  <tr key={index}>
                    <td>{curr.name}</td>
                    <td>{curr.email}</td>
                    <td>{curr.phone}</td>
                    <td>{curr.date}</td>
                    <td>{curr.time}</td>
                    <td>{curr.location}</td>
                    <td>{curr.duration}</td>
                    <td>
                      <button
                        className="driver-order-btn"
                        onClick={() => acceptOrder(curr._id)}
                        disabled={curr.isAccepted}
                      >
                        {curr.isAccepted ? "Accepted" : "Accept"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DriverBookings;
