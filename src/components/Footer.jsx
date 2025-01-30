import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-heading">
            <h4>ABOUT</h4>
            <img
              src="/images/about_icon.png"
              alt=""
              width={30}
              height={30}
            />
          </div>
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
          <div className="footer-heading">
            <h4>SERVICES</h4>
            <img
              src="/images/services_icon.png"
              alt=""
              width={30}
              height={30}
            />
          </div>
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
          <div className="footer-heading">
            <h4>HELP</h4>
            <img src="/images/help_logo.png" alt="" width={30} height={30} />
          </div>
          <ul>  
            <li>Payments</li>
            <li>Cancellation & Returns</li>
          </ul>
        </div>
        <div className="footer-section">
        <div className="footer-heading">
            <h4>CONSUMER POLICY</h4>
            <img src="/images/consumer_icon.png" alt="" width={30} height={30} />
          </div>
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
          <h4>REGISTERED OFFICE ADDRESS</h4>
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
        <div>© 2024-2025 Evotto. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
