import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Rental from "./pages/Rental";
import SecondHand from "./pages/SecondHand";
import Servicing from "./pages/Servicing";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";

import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";

const App = () => {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rental" element={<Rental />} />
            <Route path="/cars" element={<SecondHand />} />
            <Route path="/service" element={<Servicing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
