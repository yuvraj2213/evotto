import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
  const [showDropdownRental, setShowDropdownRental] = useState(false);
  const [showDropdownDrivers, setShowDropdownDrivers] = useState(false);

  const toggleDropdownRental = () => {
    setShowDropdownRental(!showDropdownRental);
  };

  const toggleDropdownDrivers = () => {
    setShowDropdownDrivers(!showDropdownDrivers);
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
          <li onClick={toggleDropdownRental}>
            <Link>Rentals</Link>
            {showDropdownRental && (
              <ul className="admin-navbar-dropdown">
                <li>
                  <NavLink to="/admin/rentalOrders">
                    Rental Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/rentalLocations">
                    Rental Locations
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/rentalVehicles">Rental Vehicles</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/pendingVehicles">Pending Vehicles</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li onClick={toggleDropdownDrivers}>
            <Link>Drivers</Link>
            {showDropdownDrivers && (
              <ul className="admin-navbar-dropdown">
                <li>
                  <NavLink to="/admin/drivers">
                    Drivers List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/driverOrders">Orders</NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink to="/admin/station">Stations</NavLink>
          </li>
          <li>
            <NavLink to="/admin/blogs">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/admin/secondHandCars">Second Hand Cars</NavLink>
          </li>
          <li>
            <NavLink to="/admin/coupons">Coupons</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavbar;
