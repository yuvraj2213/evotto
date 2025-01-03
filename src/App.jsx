import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Rental from "./pages/Rental";
import SecondHand from "./pages/SecondHand";
import Servicing from "./pages/Servicing";
import Feedback from "./pages/Feedback";

import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminFeedbacks from "./pages/AdminFeedbacks";
import AdminUpdate from "./pages/AdminUpdate";
import AdminSlideshow from "./pages/AdminSlideshow";
import RentalBooking from "./pages/RentalBooking";
import Driver from "./pages/Driver";
import Gears from "./pages/Gears";
import AdminRentalLocations from "./pages/AdminRentalLocations";
import AboutUs from "./pages/AboutUs";
import AdminRentalVehicles from "./pages/AdminRentalVehicles";

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
            <Route path="/drivers" element={<Driver/>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="rentalBooking" element={<RentalBooking/>}/>
            <Route path="/gears" element={<Gears/>}/>
            <Route path="*" element={<Error/>}/>
            <Route path="/admin" element={<Admin/>}>
              <Route path="users" element={<AdminUsers/>}/>
              <Route path="users/:id/edit" element={<AdminUpdate/>}/>
              <Route path="feedbacks" element={<AdminFeedbacks/>}/>
              <Route path="slideshow" element={<AdminSlideshow/>}/>
              <Route path="rentalLocations" element={<AdminRentalLocations/>}/>
              <Route path="rentalVehicles" element={<AdminRentalVehicles/>}/>
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
