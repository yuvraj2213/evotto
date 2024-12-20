import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Correct import
import Home from "./pages/Home";
import Rental from "./pages/Rental";
import SecondHand from "./pages/SecondHand";
import Servicing from "./pages/Servicing";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/cars" element={<SecondHand />} />
          <Route path="/service" element={<Servicing />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
