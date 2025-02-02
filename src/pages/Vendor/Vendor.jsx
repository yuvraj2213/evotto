import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import { useAuth } from "../../store/auth";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import VendorHome from "../../components/Vendor/VendorHome";
import VendorNavbar from "../../components/Vendor/VendorNavbar";

const Vendor = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  const isHome = location.pathname === "/vendor";

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user?.userData?.role == "vendor") {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Link to="/" className="back-to-home-btn">
        <FaArrowAltCircleLeft /> Back To Home Page
      </Link>
      <VendorNavbar />

      {isHome ? <VendorHome /> : <Outlet />}

      {/* <div className="admin-layout">
        <VendorNavbar />
        <div className="admin-content">

          {isHome ? <VendorHome /> : <Outlet />}
        </div>
      </div> */}
      {/* <Footer /> */}
    </>
  );
};

export default Vendor;
