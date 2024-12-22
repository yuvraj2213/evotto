import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/SecondHand.css";

const SecondHand = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <div className="header">
          <h2>I WANT TO</h2>
        </div>
        <div className="buttons">
          <button className="buy-btn">BUY</button>
          <button className="sell-btn">SELL</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SecondHand;
