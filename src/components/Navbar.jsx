import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // state for dropdown visibility

  const { LogoutUser, isLoggedIn } = useAuth();

  useEffect(() => {
    // Function to close the menu on scroll
    const handleScroll = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMenu]);

  // Toggle dropdown for services on mobile
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar">
      <div className="logo-img">
        <img src="/images/logo2.png" width={50} alt="Logo" />
        <div className="logo">Evotto</div>
      </div>

      <ul className={showMenu ? "menu-nav-links" : "nav-links"}>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/">Home</Link>
        </li>

        {/* Services Dropdown */}
        <li
          className={showMenu ? "menu-nav-item" : "nav-item services"}
          onClick={toggleDropdown} // Toggle on click for mobile
        >
          <Link>Services</Link>
          {/* Dropdown for mobile */}
          {showDropdown && (
            <ul className="dropdown">
              <li>
                <Link to="/rental">Rental</Link>
              </li>
              <li>
                <Link to="/cars">Second-Hand Cars</Link>
              </li>
              <li>
                <Link to="/service">Servicing</Link>
              </li>
              <li>
                <Link to="/drivers">Drivers</Link>
              </li>
            </ul>
          )}
        </li>

        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/about">About Us</Link>
        </li>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/feedback">Feedback</Link>
        </li>

        {isLoggedIn ? (
          <li
            className={`logout-button ${showMenu ? "menu-nav-item" : "nav-item"}`}
            onClick={LogoutUser}
            style={{ cursor: "pointer" }}
          >
            Logout
          </li>
        ) : null}

        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/profile">
            <CgProfile style={{ fontSize: "30px" }} />
          </Link>
        </li>

        <li>
          <button className="ham-btn" onClick={() => setShowMenu(!showMenu)}>
            <GiHamburgerMenu />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
