import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/AdminNavbar.css";

const DriverNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
      <div className="admin-navbar">
        <ul>
          <li className="heading">Driver Panel</li>
          <li>
            <NavLink to="/admin">Driver Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">Bookings</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DriverNavbar;
