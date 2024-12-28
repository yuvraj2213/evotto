import React, { useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Navigate, Outlet } from "react-router-dom";
import "../styles/Admin.css";
import Footer from "../components/Footer";
import { useAuth } from "../store/auth";

const Admin = () => {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user?.userData?.isAdmin) {
      document.body.style.backgroundColor = "black";
      document.body.style.backgroundImage = "none";
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [user]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user?.userData?.isAdmin) {
    return (
    <Navigate to="/" />);
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
