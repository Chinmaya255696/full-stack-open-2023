

import React from "react";

const Filter = ({ searchQuery, handleSearchChange }) => {
  return (
    <div>
      filter Shown With{" "}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Filter;
