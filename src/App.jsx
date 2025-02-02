import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
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
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import BlogDetailPage from "./pages/BlogDetailPage";
import ConsumerPolicy from "./pages/ConsumerPolicy";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import AdminBlogs from "./pages/AdminBlogs";
import Express from "./pages/Express";
import AdminDrivers from "./pages/AdminDrivers";
import DriverBooking from "./pages/DriverBooking";
import AdminDriverOrders from "./pages/AdminDriverOrders";
import DriverBookings from "./pages/DriverBookings";
import DriverMyBookings from "./pages/DriverMyBookings";
import AdminCoupons from "./pages/AdminCoupons";
import Vendor from "./pages/Vendor/Vendor";
import VendorManagement from "./pages/Vendor/VendorManagement";

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
            <Route path="/drivers" element={<DriverBooking />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rentalBooking" element={<RentalBooking />} />
            <Route path="/gears" element={<Gears />} />
            <Route path="/express" element={<Express />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog-detail" element={<BlogDetailPage />} />
            <Route path="/consumer-policy" element={<ConsumerPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Error />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id/edit" element={<AdminUpdate />} />
              <Route path="feedbacks" element={<AdminFeedbacks />} />
              <Route path="slideshow" element={<AdminSlideshow />} />
              <Route
                path="rentalLocations"
                element={<AdminRentalLocations />}
              />
              <Route path="rentalVehicles" element={<AdminRentalVehicles />} />
              <Route path="drivers" element={<AdminDrivers />} />
              <Route path="driverOrders" element={<AdminDriverOrders />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="coupons" element={<AdminCoupons />} />
            </Route>
            <Route path="/driver" element={<Driver />}>
              <Route path="bookings" element={<DriverBookings />} />
              <Route path="myBookings" element={<DriverMyBookings />} />
            </Route>
            <Route path="/vendor" element={<Vendor />}>
              <Route path="vendorManagement" element={<VendorManagement />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
