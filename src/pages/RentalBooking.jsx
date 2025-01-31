import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialLinks from "../components/SocialLinks";
import { useLocation } from "react-router-dom";
import "../styles/RentalBooking.css";
import RentalVehicleRating from "../components/RentalVehicleRating";
import { BiSolidOffer } from "react-icons/bi";
import RideOptions from "../components/RideOptions";
import FeedbackSlideshow from "../components/FeedbackSlideshow";
import RentalRatingForm from "../components/RentalRatingForm";
import Slideshow from "../components/Slideshow";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useAuth } from "../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const RentalBooking = () => {
  const location = useLocation();
  const {
    car,
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffLocation,
    dropOffDuration,
  } = location.state || {};

  const { user } = useAuth();

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    if (user && user.userData) {
      setUserDetails(user.userData);
    }
  }, [user]);

  useEffect(() => {
    if (userDetails) {
      console.log("Updated user details:", userDetails);
    }
  }, [userDetails]);

  // Generating Invoice

  const generateInvoice = async () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Add company logo at the top center
    const logoUrl = "/images/logo2.png";
    const logoX = (doc.internal.pageSize.width - 50) / 2; // Center horizontally
    const logoY = 10; // Top padding
    const logoWidth = 23; // Width of the logo
    const logoHeight = 23; // Height of the logo

    // Load the logo image
    const img = new Image();
    img.src = logoUrl;

    img.onload = async () => {
      doc.addImage(img, "PNG", logoX, logoY, logoWidth, logoHeight);

      // Set up invoice details
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Evotto", 20, 40);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Invoice Date: ${currentDate}`, 20, 50);

      const userName = `${userDetails.name}`;
      const userEmail = `${userDetails.email}`;
      const userPhone = `${userDetails.phone}`;

      doc.setFontSize(12);
      doc.text(`Customer Name: ${userName}`, 20, 60);
      doc.text(`Email: ${userEmail}`, 20, 70);
      doc.text(`Phone: ${userPhone}`, 20, 80);

      doc.setFontSize(14);
      doc.text("Rental Invoice", 20, 100);

      const tableColumn = ["Details", "Values"];
      const tableRows = [
        ["Vehicle Name", car?.name || "N/A"],
        ["Pick-Up Location", pickUpLocation || "N/A"],
        ["Pick-Up Date", pickUpDate || "N/A"],
        ["Pick-Up Time", pickUpTime || "N/A"],
        ["Drop-Off Location", dropOffLocation || "N/A"],
        ["Duration (hours)", dropOffDuration || "N/A"],
        ["Total Cost", `${totalCost}`],
      ];

      const tableOptions = {
        startY: 110, // Start table after user details
        head: [tableColumn],
        body: tableRows,
      };
      doc.autoTable(tableOptions);

      const finalY = doc.autoTable.previous.finalY + 40;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(
        `Note: You have to show this invoice along with your transaction id at the center`,
        20,
        finalY
      );

      const finalYContact = doc.autoTable.previous.finalY + 80;
      doc.setFontSize(12);
      doc.text(`Contact Details`, 20, finalYContact);
      doc.text(`Email: evotto.service@gmail.com`, 20, finalYContact + 10);
      doc.text(`Phone: +91 7077829595`, 20, finalYContact + 20);

      // Convert the PDF to a Blob object
      const pdfBlob = doc.output("blob");

      // Trigger the automatic download of the invoice
      doc.save("Invoice.pdf");

      // Create FormData to send the Blob as part of a POST request
      const formData = new FormData();
      formData.append("invoicePdf", pdfBlob, "Invoice.pdf");

      // Other email details
      const emailDetails = {
        toEmail: "evotto.service@gmail.com",
        subject: "Invoice for your recent booking",
        text: `Please find attached the invoice for recent booking of ${car?.name}`,
      };

      // Append email details to FormData
      formData.append("emailDetails", JSON.stringify(emailDetails));

      // Call the backend to send email with invoice attached
      try {
        const response = await fetch(`${baseURL}/api/send-invoice`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Invoice sent successfully to your email!");
        } else {
          alert("Failed to send invoice.");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Something went wrong while sending the invoice.");
      }
    };
  };

  const vehicleId = car?._id || null;

  const [vehicle, setVehicle] = useState([]);
  const [totalCost, setTotalCost] = useState(0); // Track total cost
  const [pricePerHour, setPricePerHour] = useState(0); // Track price per hour
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3); // For pagination
  const [coupon, setCoupon] = useState([]);
  const [userCode, setUserCode] = useState("");
  const [message, setMessage] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  // Fetch vehicle details
  const getVehicle = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/vehicle/${vehicleId}`, {
        method: "GET",
      });
      const data = await response.json();
      setVehicle(data); // Update the vehicle state
      setReviews(data[0]?.reviews || []); // Safely update reviews
    } catch (e) {
      console.error(e);
    }
  };

  // Fetching coupons
  const getCoupons = async () => {
    try {
      const response = await fetch(`${baseURL}/api/data/getAllCoupons`, {
        method: "GET",
      });
      const data = await response.json();
      setCoupon(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();

    // Check if any coupon code matches the user input
    const matchingCoupon = coupon.find((coupon) => coupon.code === userCode);

    if (matchingCoupon) {
      setMessage(
        `Coupon code activated! Discount: ${matchingCoupon.discount}%`
      );

      const discount = parseFloat(matchingCoupon.discount);
      const discountCost = totalCost - (discount / 100) * totalCost;
      setTotalCost(Math.ceil(discountCost));

      // Mark coupon as applied
      setIsCouponApplied(true);
    } else {
      setMessage("Invalid coupon code.");
    }

    setUserCode("");
  };

  // Calculate Price
  useEffect(() => {
    if (car && dropOffDuration) {
      const perHourPrice = Math.ceil(Number(car?.sixhrPrice) / 6);
      setPricePerHour(perHourPrice);

      if (parseInt(dropOffDuration, 10) <= 5) {
        const calculatedCost = perHourPrice * parseInt(dropOffDuration, 10);
        setTotalCost(calculatedCost);
      } else {
        let duration = parseInt(dropOffDuration, 10);
        if (duration === 6) {
          setTotalCost(car.sixhrPrice);
        } else if (duration === 12) {
          setTotalCost(car.twelvehrPrice);
        } else if (duration === 24) {
          setTotalCost(car.twentyfourhrPrice);
        }
      }
    }
  }, [car, dropOffDuration]);

  useEffect(() => {
    if (vehicleId) {
      getVehicle();
    } else {
      console.error("Vehicle ID is missing.");
    }
  }, [vehicleId]);

  useEffect(() => {
    getCoupons();
  }, []);

  // Handle Payment with Razorpay
  // const handlePayment = async () => {
  //   const options = {
  //     key: "your_razorpay_key_id", // Replace with your Razorpay key
  //     amount: totalCost * 100, // Razorpay accepts payment in paisa (₹1 = 100 paisa)
  //     currency: "INR",
  //     name: "Evotto Rentals",
  //     description: "Vehicle Rental Payment",
  //     image: "/images/logo.png", // Optional: Your logo
  //     handler: function (response) {
  //       alert(
  //         `Payment successful! Payment ID: ${response.razorpay_payment_id}`
  //       );
  //       console.log("Payment Response:", response);
  //     },
  //     prefill: {
  //       name: "John Doe", // Prefilled customer name
  //       email: "johndoe@example.com", // Prefilled customer email
  //       contact: "9876543210", // Prefilled customer phone number
  //     },
  //     notes: {
  //       booking_id: vehicleId, // Optional: Add additional notes
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  // Load More Reviews
  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 3); // Load 3 more reviews
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="rental-vehicle-heading">
        <h2 className="rental-heading-text">
          Let's Ride With <span className="evotto-highlight">Evotto</span>
        </h2>
      </div>

      <div className="rental-booking-main">
        <div className="rental-booking-img">
          <img src={vehicle[0]?.image} alt="" width={500} />
          <div className="trip-planner-info">
            <div className="pickup-info">
              <h4>PickUp Location : {pickUpLocation}</h4>
              <h4>PickUp Date : {pickUpDate}</h4>
              <h4>PickUp Time : {pickUpTime}</h4>
            </div>
            <div className="dropoff-info">
              <h4>DropOff Location : {dropOffLocation}</h4>
              <h4>DropOff Duration : {dropOffDuration}</h4>
            </div>
          </div>
          {console.log(coupon)}
          {/* <div className="rental-booking-slideshow">
            <Slideshow />
          </div> */}
        </div>
        <div className="rental-vehicle-info">
          <h3 className="rental-car-name">{car?.name || "Vehicle Name"}</h3>
          {console.log(car?.isAvailable)}
          <RentalVehicleRating />

          {/* Pricing Calculation */}
          <h2 className="rental-total-cost">
            Total Cost: {totalCost > 0 ? `₹${totalCost}` : "Calculating..."}
          </h2>

          {car?.isAvailable ? (
            <>
              <button
                className="rental-pay-now-btn"
                onClick={() => {
                  generateInvoice(); // Call the function to generate the invoice
                  window.location.href =
                    "https://razorpay.me/@evottoprivatelimited"; // Redirect to Razorpay link
                }}
              >
                Pay Now
              </button>
              <form
                className="rental-booking-couponcode"
                onSubmit={handleCouponSubmit}
              >
                <label htmlFor="coupon-code">
                  <input
                    type="text"
                    placeholder="Have a coupon code?"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    disabled={isCouponApplied}
                  />
                </label>
                <button type="submit" disabled={isCouponApplied}>
                  Apply Coupon
                </button>
              </form>

              {message && <p className="rental-coupon-activate">{message}</p>}
            </>
          ) : (
            <div className="rental-not-available">
              Vehicle Currently Not Available
            </div>
          )}

          <h3 className="rental-vehicle-description-heading">
            Available Offers :
          </h3>
          <p className="rental-vehicle-description">
            <ul className="rental-offer-list">
              <li>
                <BiSolidOffer color="#6CAE75" size={20} />
                30 minutes extra ride time for students
              </li>
            </ul>
          </p>

          <h3 className="rental-vehicle-description-heading">Description : </h3>
          <p className="rental-vehicle-description">{car?.desc}</p>

          <div className="rental-rating-review">
            <div className="rental-vehicle-review-heading">
              <h3>Ratings and Reviews : </h3>
              <button
                onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                className="rental-rate-btn"
              >
                {isReviewFormOpen ? "Close Form" : "Rate The Vehicle"}
              </button>
            </div>
            {isReviewFormOpen && (
              <RentalRatingForm
                vehicleId={vehicleId}
                onReviewAdded={() => {
                  alert("Review added successfully!");
                  setIsReviewFormOpen(false);
                }}
              />
            )}
            <div className="rental-review-card-main">
              {reviews.slice(0, visibleReviews).map((curr, index) => (
                <div key={index} className="rental-review-card">
                  <p>{curr.comment}</p>
                  <p className="review-user-info">{curr.user || "Anonymous"}</p>
                </div>
              ))}
              {visibleReviews < reviews.length && (
                <button onClick={loadMoreReviews}>Load More Reviews</button>
              )}
            </div>
          </div>
        </div>
      </div>

      <RideOptions />

      <FeedbackSlideshow />

      <section className="social-links">
        <SocialLinks />
      </section>
      <Footer />
    </>
  );
};

export default RentalBooking;
