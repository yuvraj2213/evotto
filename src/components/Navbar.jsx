import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {

  const [showMenu,setShowMenu]=useState(false);

  return (
    <nav className="navbar">
      <div className="logo-img">
        <img src="/images/logo2.png" width={50} alt="Logo" />
        <div className="logo">Evotto</div>
      </div>

      <ul className={showMenu?'menu-nav-links':'nav-links'}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/rental">Rental</Link>
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
        <button className="ham-btn" onClick={()=>setShowMenu(!showMenu)}>
        <GiHamburgerMenu />
        </button>
      </ul>

      <div className="hamburger-menu">
      <button className={showMenu?'ham-btn-hidden':'ham-btn'} onClick={()=>setShowMenu(!showMenu)}>
        <GiHamburgerMenu />
      </button>
      </div>
    </nav>
  );
};

export default Navbar; 
