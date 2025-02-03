import React, { useState, useEffect } from "react";
import "../../styles/Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../store/auth";

const VendorNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {

    const handleScroll = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMenu]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
    <div className="navbar-main">
    <nav className="navbar">
      <div className="logo-img">
        <img src="/images/logo2.png" width={50} alt="Logo"/>
        <div className="logo" style={{color:"black"}}>Evotto</div>
      </div>

      <ul className={showMenu ? "menu-nav-links" : "nav-links"}>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/vendor">Home</Link>
        </li>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/vendor/vendorOrders">Orders</Link>
        </li>

        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/revenue">Revenue</Link>
        </li>

        {/* Services Dropdown */}
        <li
          className={showMenu ? "menu-nav-item" : "nav-item services"}
          onClick={toggleDropdown} // Toggle on click for mobile
        >
          <Link>Vehicles</Link>
          {showDropdown && (
            <ul className="dropdown">
              <li>
                <Link to="/vendor/vendorManagement">Management</Link>
              </li>
              <li>
                <Link to="/cars">Status</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <button className="ham-btn" onClick={() => setShowMenu(!showMenu)}>
            <GiHamburgerMenu />
          </button>
        </li>
      </ul>
    </nav>
    </div>
    </>
  );
};

export default VendorNavbar;
