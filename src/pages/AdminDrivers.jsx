import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminDrivers = () => {
  const [driver, setDriver] = useState([]);
  const { authorizationToken } = useAuth();

  const getDrivers = async () => {
    const response = await fetch(`${baseURL}/api/data/getAllDrivers`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    });
    const data = await response.json();
    console.log(data);
    setDriver(data);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1>Admin Drivers Data</h1>
        </div>
        <div className="admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {driver.map((curr, index) => {
                return (
                  <tr key={index}>
                    <td>{curr.name}</td>
                    <td>{curr.email}</td>
                    <td>{curr.isDriverOnline?'Yes':'No'}</td>
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

export default AdminDrivers;
