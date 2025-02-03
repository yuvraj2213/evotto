import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminRentalOrders = () => {

    const [order,setOrder]=useState([])

  const getOrders = async () => {
    const response = await fetch(`${baseURL}/api/orders/getAllOrders`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setOrder(data);
  };

  useEffect(()=>{
    getOrders();
  },[])

  const { authorizationToken } = useAuth();
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Rental Orders Data</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Vehicle Name</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Cancelled</th>
              </tr>
            </thead>
            <tbody>
              {order.map((curr, index) => {
                return (
                  <tr key={index}>
                    <td>{curr.userName}</td>
                    <td>{curr.vehicle}</td>
                    <td>{curr.vendor}</td>
                    <td>{curr.amount}</td>
                    <td>{curr.isCompleted ? "Completed" : "Pending"}</td>
                    <td>{curr.isCancelled ? "Cancelled" : "No"}</td>
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

export default AdminRentalOrders;
