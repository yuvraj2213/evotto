import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "../../styles/Vendor/VendorOrders.css";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const { user } = useAuth();

  const getOrders = async (vendorId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/orders/getVendorOrders/${vendorId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleMarkAsCompleted = async (orderId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/orders/markAsCompleted/${orderId}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark order as completed");
      }

      getOrders(userDetails._id);
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  const handleMarkAsCancelled = async (orderId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/orders/markAsCancelled/${orderId}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark order as cancelled");
      }

      getOrders(userDetails._id);
    } catch (error) {
      console.error("Error marking order as cancelled:", error);
    }
  };

  useEffect(() => {
    if (user && user.userData) {
      setUserDetails(user.userData);
    }
  }, [user]);

  useEffect(() => {
    if (userDetails && userDetails._id) {
      getOrders(userDetails._id);
    }
  }, [userDetails]);

  return (
    <div className="vendor-orders-container">
      <h2>Your Orders</h2>

      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Vehicle Name</th>
              <th>Amount</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Mark as Completed</th>
              <th>Mark as Cancelled</th>
              <th>User Document</th> {/* New column header */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userName}</td>
                <td>{order.vehicle}</td>
                <td>₹{order.amount}</td>
                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "No Date Available"}
                </td>
                <td>
                  {order.isCompleted
                    ? "Completed"
                    : order.isCancelled
                    ? "Cancelled"
                    : "Pending"}
                </td>
                <td>
                  {!order.isCompleted && !order.isCancelled && (
                    <button
                      className="mark-completed-btn"
                      onClick={() => handleMarkAsCompleted(order._id)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </td>
                <td>
                  {!order.isCancelled && !order.isCompleted && (
                    <button
                      className="rental-cancel-btn"
                      onClick={() => handleMarkAsCancelled(order._id)}
                    >
                      Mark as Cancelled
                    </button>
                  )}
                </td>
                <td>
                  {/* Display the user document link if available */}
                  {order.userDocument ? (
                    <a href={order.userDocument} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  ) : (
                    "No Document"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default VendorOrders;
