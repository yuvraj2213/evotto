import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { useContext } from "react";
import '../../styles/Vendor/VendorHome.css'
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const VendorHome = () => {
  const { authorizationToken,user } = useAuth();
  
    const userData=user?.userData;

  return (
    <>
      <h1 className="vendor-home-heading">Welcome <span>{userData?.companyName}</span> To Your Dashboard</h1>

    </>
  );
};

export default VendorHome;
