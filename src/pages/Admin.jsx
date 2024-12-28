import React, { useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "../styles/Admin.css";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";

const Admin = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation(); // Hook to track location changes

  useEffect(() => {
    // Set background for admin page
    if (user?.userData?.isAdmin) {
      document.body.style.backgroundColor = "black";
      document.body.style.backgroundImage = "none";
    } else {
      document.body.style.backgroundImage = '/images/background2.jpg'; // Default background
    }

    // Cleanup on component unmount or when location changes
    return () => {
      if (!user?.userData?.isAdmin) {
        document.body.style.backgroundColor = "";
        document.body.style.backgroundImage = '/images/background2.jpg'; // Restore image
      }
    };
  }, [user, location]); // Trigger effect when `user` or `location` changes

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user?.userData?.isAdmin) {
    return <Navigate to="/" />;
  }

  console.log("Admin Status:", user?.userData?.isAdmin);

  return (
    <>
      <div className="admin-layout">
        <AdminNavbar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
