import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const DriverMyBookings = () => {
  const { authorizationToken } = useAuth();

  const [orders, setOrders] = useState([]);

  const getAllMyOrders = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/getOrderByIds`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      console.log("ye lo", data);
      if (data.orders.length !== 0) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllMyOrders();
  }, []);

  return (
    <>
      {console.log("idhr dekh", orders)}
      <section className="admin-users-section">
        <div className="container">
          <h1>My Orders</h1>
        </div>
        {orders.length === 0 ? (
          "No Orders"
        ) : (
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
                  <th>Status</th>
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
                      <td>{curr.isCompleted ? "Completed" : "Pending"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export default DriverMyBookings;
