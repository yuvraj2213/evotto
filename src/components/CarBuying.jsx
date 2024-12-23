import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../App.css";
import "../styles/CarBuying.css";
import SecondHandCarCard from "./SecondHandCarCard";

const CarBuying = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };


  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-button">
          <FaSearch />
        </button>
      </div>

      <SecondHandCarCard searchQuery={searchQuery}/>
      
    </>
  );
};

export default CarBuying;
