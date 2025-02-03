import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "../../styles/Vendor/VendorOrders.css";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const { user } = useAuth();

  console.log("User Details:", userDetails);

  // Fetch orders of the vendor by their ID
  const getOrders = async (vendorId) => {
    try {
      const response = await fetch(`${baseURL}/api/orders/getVendorOrders/${vendorId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log("Orders Data:", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Handle marking an order as completed
  const handleMarkAsCompleted = async (orderId) => {
    try {
      const response = await fetch(`${baseURL}/api/orders/markAsCompleted/${orderId}`, {
        method: "PATCH", // Using PATCH to update the status
      });

      if (!response.ok) {
        throw new Error("Failed to mark order as completed");
      }

      // Refresh the orders list after updating
      getOrders(userDetails._id);

    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  // Handle marking an order as cancelled
  const handleMarkAsCancelled = async (orderId) => {
    try {
      const response = await fetch(`${baseURL}/api/orders/markAsCancelled/${orderId}`, {
        method: "PATCH", // Using PATCH to update the status
      });

      if (!response.ok) {
        throw new Error("Failed to mark order as cancelled");
      }

      // Refresh the orders list after updating
      getOrders(userDetails._id);

    } catch (error) {
      console.error("Error marking order as cancelled:", error);
    }
  };

  // Set user details once the user is authenticated
  useEffect(() => {
    if (user && user.userData) {
      setUserDetails(user.userData);
    }
  }, [user]);

  // Fetch orders when user details are available
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
              <th>Status</th>
              <th>Mark as Completed</th>
              <th>Mark as Cancelled</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{order.userName}</td>
                <td>{order.vehicle}</td>
                <td>₹{order.amount}</td>
                <td>
                  {order.isCompleted
                    ? "Completed"
                    : order.isCancelled
                    ? "Cancelled"
                    : "Pending"}
                </td>
                <td>
                  {/* Only show "Mark as Completed" button if not completed or cancelled */}
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
                  {/* Only show "Mark as Cancelled" button if not cancelled */}
                  {!order.isCancelled && (
                    <button
                      className="rental-cancel-btn"
                      onClick={() => handleMarkAsCancelled(order._id)}
                    >
                      Mark as Cancelled
                    </button>
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
