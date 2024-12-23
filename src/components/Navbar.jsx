import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

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
  }, [showMenu]); // Dependency array ensures the effect re-runs when showMenu changes

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
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/rental">Rental</Link>
        </li>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/cars">Second-Hand Cars</Link>
        </li>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/service"> Servicing</Link>
        </li>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/drivers"> Drivers</Link>
        </li>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li className={showMenu ? "menu-nav-item" : "nav-item"}>
          <Link to="/feedback">Feedback</Link>
        </li>
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
