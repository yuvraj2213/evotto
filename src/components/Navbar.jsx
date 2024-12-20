import React from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-img">
        <img src="/images/logo2.png" width={50} alt="Logo" />
        <div className="logo">Evotto</div>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rental">Automobile Rental</Link>
        </li>
        <li>
          <Link to="/cars">Second-Hand Cars</Link>
        </li>
        <li>
          <Link to="/service">Vehicle Servicing</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
