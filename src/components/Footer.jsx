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
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/return-policy">Return Policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>
              <Link to="/rental">Rental</Link>
            </li>
            <li>
              <Link to="/cars">Second Hand Cars</Link>
            </li>
            <li>
              <Link to="/service">Servicing</Link>
            </li>
            <li>
              <Link to="/drivers">Drivers</Link>
            </li>
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
            <li>
              <Link to="/consumer-policy">Cancellation & Returns</Link>
            </li>
            <li>
              <Link to="/consumer-policy">Terms Of Use</Link>
            </li>
            <li>
              <Link to="/consumer-policy">Security</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section-address">
          <h4>Registered Office Address</h4>
          <ul>
            <li>
              <p>Evotto Private Limited,</p>
            </li>
            <li>
              <p>D/3 Plot 103/765 Brahman,</p>
            </li>
            <li>
              <p>Mahal, Kendrapara</p>
            </li>
            <li>
              <p>Bhubaneswar, 754210</p>
            </li>
            <li>
              <p>Odisha, India</p>
            </li>
            <li>
              <p>CIN: U74901OD2024PTC046310</p>
            </li>
            <li>
              <p>Phone: +91 7077829595</p>
            </li>
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
