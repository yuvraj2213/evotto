import React, { useEffect, useState } from "react";
import "../styles/AdminHome.css";
import { useAuth } from "../store/auth";
import { useContext } from "react";
const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const DriverHome = () => {
  const { authorizationToken } = useAuth();


  return (
    <>
      <h1>Hey There, Welcome to Driver panel</h1>

    </>
  );
};

export default DriverHome;
