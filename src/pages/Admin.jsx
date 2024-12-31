import React, { useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "../styles/Admin.css";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";

const Admin = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Add the admin-body class if the user is an admin
    if (user?.userData?.isAdmin) {
      document.body.classList.add("admin-body");
    } else {
      document.body.classList.remove("admin-body");
    }

    return () => {
      // Clean up the class on component unmount
      document.body.classList.remove("admin-body");
    };
  }, [user]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user?.userData?.isAdmin) {
    return <Navigate to="/" />;
  }

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
