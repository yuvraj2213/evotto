import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminServicing = () => {
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    const response = await fetch(`${baseURL}/api/servicing/getOrders`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setOrder(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const { authorizationToken } = useAuth();
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Servicing Orders</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Vehicle Name</th>
                <th>Image</th>
                <th>Service Type</th>
                <th>Requirements</th>
                <th>Date</th>
                <th>Time</th>
                <th>User Email</th>
              </tr>
            </thead>
            <tbody>
              {order.map((curr, index) => {
                return (
                  <tr key={index}>
                    <td>{curr.vehicleType}</td>
                    <td>{curr.vehicleName}</td>
                    <td><a href={curr.vehicleImage}>View Image</a></td>
                    <td>{curr.serviceType}</td>
                    <td>{curr.requirements}</td>
                    <td>{curr.date}</td>
                    <td>{curr.time}</td>
                    <td>{curr.userEmail}</td>
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

export default AdminServicing;
