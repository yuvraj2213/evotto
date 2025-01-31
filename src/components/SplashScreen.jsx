import React, { useState, useEffect } from "react";
import "../styles/SplashScreen.css";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // Keep logo visible for 2.5s

    const timeout2 = setTimeout(() => {
      onFinish(); // Call parent function to remove splash screen
    }, 3500); // Total time: 3.5s (fade-out duration included)

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <div className="logo-container">
        <img src="/images/logo.jpg" alt="Logo" className="logo" />
      </div>
    </div>
  );
};

export default SplashScreen;
