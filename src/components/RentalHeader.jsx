import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import "../styles/RentalHeader.css";

const RentalHeader = ({ handleSearchChange }) => {
  return (
    <div className="search-box">
      <button className="search-btn">
        <FaSearch />
      </button>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
      <button className="filter-btn">
        <HiOutlineAdjustmentsHorizontal />
      </button>
    </div>
  );
};

export default RentalHeader;
