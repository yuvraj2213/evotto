import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminSecondHandCars = () => {
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    const response = await fetch(`${baseURL}/api/cars/getAllVehicles`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setOrder(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Second Hand Cars Data</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Whatsapp</th>
                <th>Vehicle</th>
                <th>Images</th>
                <th>Condition</th>
                <th>Description</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {order.map((curr, index) => {
                return (
                  <tr key={index}>
                    <td>{curr.name}</td>
                    <td>{curr.address}</td>
                    <td>{curr.phoneNumber}</td>
                    <td>{curr.whatsappNumber}</td>
                    <td>{curr.carName}</td>

                    {/* 🔥 Styled Image Links */}
                    <td>
                      <div className="image-links">
                        {curr.carPhotos?.map((photo, i) => (
                          <a
                            key={i}
                            href={photo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="image-link"
                          >
                            Image {i + 1}
                          </a>
                        ))}
                      </div>
                    </td>

                    <td>{curr.condition}</td>
                    <td>{curr.conditionDesc}</td>
                    <td>{curr.sellingPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Custom CSS for Image Links */}
      <style jsx>{`
        .image-links {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .image-link {
          display: inline-block;
          padding: 5px 10px;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          text-decoration: none;
          font-size: 14px;
          font-weight: bold;
          transition: background 0.3s ease-in-out;
        }
        .image-link:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
};

export default AdminSecondHandCars;
