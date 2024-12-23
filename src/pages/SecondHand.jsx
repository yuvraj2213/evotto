import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SecondHand.css";
import CarSellingForm from "../components/CarSellingForm";

const SecondHand = () => {
  const [isSell, setIsSell] = useState(false);
  const carSellingFormRef = useRef(null);

  // Scroll to the CarSellingForm after it is rendered and make sure the header is at the top
  useEffect(() => {
    if (isSell && carSellingFormRef.current) {
      carSellingFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Ensures the top of the element aligns with the top of the viewport
      });
    }
  }, [isSell]); // Trigger only when 'isSell' changes

  const handleSellClick = () => {
    setIsSell(!isSell);
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="content">
        <div className="header">
          <h2>I WANT TO</h2>
        </div>
        <div className="buttons">
          <button className="buy-btn">BUY</button>
          <button className="sell-btn" onClick={handleSellClick}>
            SELL
          </button>
        </div>
      </div>

      {/* Render CarSellingForm and scroll to it when 'isSell' is true */}
      {isSell && (
        <div ref={carSellingFormRef}>
          <CarSellingForm />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SecondHand;
