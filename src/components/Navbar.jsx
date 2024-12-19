import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Evotto</div>
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/rental">Automobile Rental</a></li>
        <li><a href="/secondhand">Second-Hand Cars</a></li>
        <li><a href="/servicing">Vehicle Servicing</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;