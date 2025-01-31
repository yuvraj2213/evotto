import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../styles/AdminCoupons.css";
import toast, { Toaster } from "react-hot-toast";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const AdminCoupons = () => {
  const { authorizationToken } = useAuth();
  const [coupon, setCoupon] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: "", discount: "" });

  // Fetch existing coupons
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

  useEffect(() => {
    getCoupons();
  }, []);

  // Handle input change in form
  const handleChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  // Handle form submission to add new coupon
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/data/addCoupons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(newCoupon),
      });

      if (response.ok) {
        toast.success("Coupon added successfully!");
        setNewCoupon({ code: "", discount: "" });
        setShowForm(false);
        getCoupons(); // Refresh coupon list
      } else {
        toast.error("Failed to add coupon.");
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  // Handle deleting a coupon
  const handleDelete = async (couponId) => {
    try {
      const response = await fetch(`${baseURL}/api/data/deleteCoupon/${couponId}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        toast.success("Coupon deleted successfully!");
        getCoupons(); // Refresh coupon list after deletion
      } else {
        toast.error("Failed to delete coupon.");
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Error deleting coupon.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="admin-coupons-container">
        <h2 className="admin-coupons-heading">Coupons</h2>
        <button
          className="admin-toggle-form-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Coupon"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="admin-coupon-form">
            <div className="form-group">
              <label htmlFor="code" className="form-label">
                Coupon Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={newCoupon.code}
                onChange={handleChange}
                placeholder="Enter Coupon Code"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="discount" className="form-label">
                Discount Percentage
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={newCoupon.discount}
                onChange={handleChange}
                placeholder="Enter Discount %"
                required
                className="form-input"
              />
            </div>

            <button type="submit" className="admin-submit-btn">
              Submit
            </button>
          </form>
        )}

        <div className="admin-coupon-table">
          <table className="coupon-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {coupon.map((curr) => (
                <tr key={curr._id}>
                  <td>{curr.code}</td>
                  <td>{curr.discount}%</td>
                  <td>
                    <button
                      className="admin-delete-btn"
                      onClick={() => handleDelete(curr._id)} 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminCoupons;
