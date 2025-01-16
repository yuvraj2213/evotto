import React from "react";
import "../styles/ReturnPolicy.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ReturnPolicy = () => {
  return (
    <>
      <div className="policy-container">
        <h1 className="policy-heading">Evotto Rentals Return Policy</h1>
        <p className="policy-intro">
          At Evotto, we prioritize customer satisfaction and strive to ensure a
          hassle-free experience. Our return policy is designed to provide
          clarity and fairness to all parties involved.
        </p>

        <div className="policy-section">
          <h2 className="section-heading">1. Eligibility for Returns</h2>
          <ul className="section-list">
            <li>
              Vehicles must be returned in the same condition as they were
              rented, with no significant damage or modifications.
            </li>
            <li>
              All accessories and documents provided during the rental must be
              returned.
            </li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="section-heading">2. Return Timeframe</h2>
          <p className="section-text">
            Vehicles must be returned by the agreed-upon time. Late returns may
            incur additional charges as per our late fee policy.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="section-heading">3. Inspection Process</h2>
          <p className="section-text">
            Upon return, the vehicle will undergo a thorough inspection. Any
            damages or missing components will be documented, and repair or
            replacement costs will be charged accordingly.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="section-heading">4. Cancellation and Refund Policy</h2>
          <ul className="section-list">
            <li>
              If you cancel your booking before the scheduled pickup time, a
              partial refund may be issued depending on the cancellation policy.
            </li>
            <li>
              Refunds for security deposits will be processed within 7 working
              days after the vehicle is inspected and cleared.
            </li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="section-heading">5. Special Circumstances</h2>
          <p className="section-text">
            In case of unavoidable circumstances such as accidents or
            breakdowns, please notify us immediately. Support will be provided,
            and additional terms may apply.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="section-heading">6. Contact Us</h2>
          <p className="section-text">
            For assistance or queries regarding the return process, please
            contact our customer service team.
          </p>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;
