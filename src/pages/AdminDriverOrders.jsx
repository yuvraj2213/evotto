import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminDriverOrders = () => {
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

  useEffect(() => {
    getAllOrdersData();
  }, []);

  return (
    <>
      <Toaster />
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Users Data</h1>
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

export default AdminDriverOrders;
