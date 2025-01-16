import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>ABOUT</h4>
          <ul>
            <li><Link to='/contact'>Contact Us</Link></li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
            <li><Link to='/return-policy'>Return Policy</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link to="/rental">Rental</Link></li>
            <li><Link to="/cars">Second Hand Cars</Link></li>
            <li><Link to="/service">Servicing</Link></li>
            <li><Link to="/drivers">Drivers</Link></li>
            <li>Evotto Adsmith</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>HELP</h4>
          <ul>
            <li>Payments</li>
            <li>Cancellation & Returns</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>CONSUMER POLICY</h4>
          <ul>
            <li><Link to='/consumer-policy'>Cancellation & Returns</Link></li>
            <li><Link to='/consumer-policy'>Terms Of Use</Link></li>
            <li><Link to='/consumer-policy'>Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2025 Evotto. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
