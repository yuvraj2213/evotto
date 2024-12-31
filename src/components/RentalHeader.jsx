import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

import "../styles/RentalHeader.css";

const RentalHeader = ({ handleSearchChange }) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterClick = () => {
    setShowFilter(!showFilter);
  };

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default RentalHeader;
