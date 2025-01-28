import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
      <div className="admin-navbar">
        <ul>
          <li className="heading">Admin Panel</li>
          <li>
            <NavLink to="/admin">Admin Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/feedbacks">Feedbacks</NavLink>
          </li>
          <li>
            <NavLink to="/admin/slideshow">Slideshow</NavLink>
          </li>
          <li onClick={toggleDropdown}>
            <Link>Rentals</Link>
            {showDropdown && (
              <ul className="admin-navbar-dropdown">
                <li>
                  <NavLink to="/admin/rentalLocations">
                    Rental Locations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/rentalVehicles">Rental Vehicles</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/admin/drivers">Drivers</NavLink>
          </li>
          <li>
            <NavLink to="/admin/blogs">Blogs</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavbar;
