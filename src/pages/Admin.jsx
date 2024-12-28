import React, { useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "../styles/Admin.css";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";

const Admin = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation(); // Track current route

  useEffect(() => {
    const setBackgroundForRoute = () => {
      if (location.pathname.startsWith("/admin") && user?.userData?.isAdmin) {
        // Set background for admin page
        document.body.style.backgroundColor = "black";
        document.body.style.backgroundImage = "none";
      } else {
        // Restore background for other pages
        document.body.style.backgroundColor = "";
        document.body.style.backgroundImage = '/images/background2.jpg';
      }
    };

    setBackgroundForRoute(); // Apply the correct background on route change

    // Optional cleanup to ensure no lingering side effects
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = '/images/background2.jpg';
    };
  }, [location, user]); // Trigger effect when route or user changes

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
