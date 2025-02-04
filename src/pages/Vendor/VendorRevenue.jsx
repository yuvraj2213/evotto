import React, { useEffect, useState } from "react";
import "../../styles/Vendor/VendorRevenue.css";
import { useAuth } from "../../store/auth";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VendorRevenue = () => {
  const { user } = useAuth();
  const userId = user?.userData?._id;

  const [totalRev, setTotalRev] = useState(0);
  const [last7DaysRevenue, setLast7DaysRevenue] = useState(0);
  const [last15DaysRevenue, setLast15DaysRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  const totalRevenue = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/vendor/totalRevenue/${userId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setTotalRev(data.totalRevenue * 0.6);
      setLast7DaysRevenue(data.last7DaysRevenue * 0.6);
      setLast15DaysRevenue(data.last15DaysRevenue * 0.6);
      setMonthlyRevenue(data.monthlyRevenue * 0.6);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    totalRevenue();
  }, []);

  return (
    <div className="vendor-revenue-container">
      <h1 className="vendor-revenue-title">Vendor Revenue</h1>

      {/* Total Revenue Card */}
      <div className="total-revenue-card">
        <h2>Total Revenue</h2>
        <p>₹{totalRev.toFixed(2)}</p>
      </div>

      {/* Other Revenue Cards */}
      <div className="revenue-cards-grid">
        <div className="revenue-card">
          <h2>Last 7 Days Revenue</h2>
          <p>₹{last7DaysRevenue.toFixed(2)}</p>
        </div>
        <div className="revenue-card">
          <h2>Last 15 Days Revenue</h2>
          <p>₹{last15DaysRevenue.toFixed(2)}</p>
        </div>
        <div className="revenue-card">
          <h2>Monthly Revenue</h2>
          <p>₹{monthlyRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default VendorRevenue;
