import React from "react";

const Termsandcond = ({
  handleSubmitTerms,
  isTermsAccepted,
  setIsTermsAccepted,
  filteredCars,
  setShowTermsModal
}) => {
  return (
    <>
      <div className="terms-modal">
        <div className="modal-content">
          <h3>Terms and Conditions</h3>
          <p>
            By proceeding, you agree to our terms and conditions for renting the
            vehicle. Please read carefully before accepting.
          </p>
          <div className="terms-scroll-container">
            <ul>
              <li className="rental-terms">
                <h3>1. Eligibility</h3>
                <span>
                  1.1. The renter must be at least 18 years old and possess a
                  valid driver's license.{" "}
                </span>
                <span>
                  1.2. The renter must be at least 18 years old and possess a
                  valid drivers license.{" "}
                </span>
                <span>
                  1.3. The renter must have a clean driving record with no
                  significant violations.
                </span>
              </li>
              <li className="rental-terms">
                <h3>2. Booking and Payment</h3>
                <span>
                  2.1. Full payment is required at the time of booking to
                  confirm your reservation.
                </span>
                <span>
                  2.2. Any additional charges (e.g., late returns, damages,
                  etc.) will be charged separately.
                </span>
                <span>
                  2.3. Evotto reserves the right to cancel or modify bookings in
                  case of unforeseen circumstances.
                </span>
              </li>
              <li className="rental-terms">
                <h3>3. Vehicle Usage</h3>
                <span>
                  3.1. Vehicles must only be used for lawful purposes and in
                  compliance with traffic laws.
                </span>
                <span>
                  3.2. Sub-leasing or sharing the rented vehicle with
                  unauthorized persons is strictly prohibited.
                </span>
                <span>
                  3.3. Smoking, consumption of alcohol, or illegal substances in
                  the vehicle is not allowed.
                </span>
              </li>
              <li className="rental-terms">
                <h3>4. Fuel Policy</h3>
                <span>
                  4.1. Vehicles are provided with a specific fuel level. The
                  same level must be maintained at the time of return.
                </span>
                <span>
                  4.2. Additional fuel charges may apply if the vehicle is
                  returned with less fuel.
                </span>
                <span>4.3. It's mandatory to bring the fuel bill.</span>
              </li>
              <li className="rental-terms">
                <h3>5. Insurance and Damages</h3>
                <span>
                  5.1. Basic insurance coverage is included. However, it does
                  not cover damages caused by negligence or illegal activities.
                </span>
                <span>
                  5.2. In case of an accident, the renter must immediately
                  inform Evotto Rentals and the relevant authorities.
                </span>
                <span>
                  5.3. The renter is responsible for any damages or loss of the
                  vehicle during the rental period.
                </span>
              </li>
              <li className="rental-terms">
                <h3>6. Late Returns</h3>
                <span>
                  6.1. Vehicles must be returned at the agreed-upon time. Late
                  returns will incur additional charges.
                </span>
                <span>
                  6.2. In case of delays, inform Evotto Rentals at least 2 hours
                  before the return time.
                </span>
              </li>
              <li className="rental-terms">
                <h3>7. Cancellation and Refund</h3>
                <span>
                  7.1. Cancellations made 24 hours before the booking date will
                  receive a full refund.
                </span>
                <span>
                  7.2. Cancellations made within 24 hours of the booking date
                  will incur a cancellation fee.
                </span>
                <span>7.3. No refunds will be provided for no-shows.</span>
              </li>
              <li className="rental-terms">
                <h3>8. Evotto's Rights</h3>
                <span>
                  8.1. Evotto Rentals reserves the right to refuse service or
                  terminate a rental agreement if any T&C is violated.
                </span>
                <span>
                  8.2. Evotto is not responsible for delays, breakdowns, or
                  cancellations due to unforeseen circumstances like weather or
                  technical issues.
                </span>
              </li>
              <li className="rental-terms">
                <h3>9. Governing Law</h3>
                <span>9.1. These terms are governed by the laws of India.</span>
                <span>
                  9.2. Any disputes shall be resolved in the jurisdiction of the
                  registered address of Evotto Rentals.
                </span>
              </li>
            </ul>
          </div>
          <div>
            <input
              type="checkbox"
              id="terms"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms"> I accept the terms and conditions</label>
          </div>
          <button
            className="submit-terms-btn"
            onClick={() => handleSubmitTerms(filteredCars[0])}
          >
            Submit and Proceed
          </button>
          <button
            className="submit-terms-btn"
            onClick={() => setShowTermsModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Termsandcond;
