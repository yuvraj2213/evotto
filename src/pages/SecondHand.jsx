import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/SecondHand.css";
import CarSellingForm from "../components/CarSellingForm";
import CarBuying from "../components/CarBuying";
import SocialLinks from "../components/SocialLinks";

const SecondHand = () => {
  const [isSell, setIsSell] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const carSellingFormRef = useRef(null);
  const carBuyingFormRef = useRef(null);

  // useEffect(() => {
  //   if (isSell && carSellingFormRef.current) {
  //     carSellingFormRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // }, [isSell]);

  // useEffect(() => {
  //   if (isBuy && carBuyingFormRef.current) {
  //     carBuyingFormRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // }, [isBuy]);

  const handleSellClick = () => {
    setIsSell(!isSell);
    setIsBuy(false);
  };

  const handleBuyClick = () => {
    setIsBuy(!isBuy);
    setIsSell(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <div className="page-container">
      <Navbar />

      <div className="content">
        <div className="header">
          <h2>I WANT TO</h2>
        </div>
        <div className="buttons">
          <button className="buy-btn" onClick={handleBuyClick}>
            BUY
          </button>
          <button className="sell-btn" onClick={handleSellClick}>
            SELL
          </button>
        </div>
      </div>

      {isSell && (
        <div ref={carSellingFormRef}>
          <CarSellingForm />
        </div>
      )}

      {isBuy && (
        <div ref={carBuyingFormRef}>
          <CarBuying />
        </div>
      )}

      <section className="social-links">
        <SocialLinks />
      </section>

      <Footer />
    </div>
  );
};

export default SecondHand;
