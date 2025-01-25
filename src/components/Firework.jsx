import React, { useState, useEffect } from "react";
import ReactFireworks from 'react-fireworks';
 // Importing the Fireworks library correctly

const Firework = () => {
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    setShowFireworks(true);

    // Optional: turn off fireworks after a specific time (e.g., 5 seconds)
    setTimeout(() => {
      setShowFireworks(false);
    }, 5000); // Fireworks will stop after 5 seconds
  }, []);

  return (
    <>
      {showFireworks && (
        <ReactFireworks
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};

export default Firework;
