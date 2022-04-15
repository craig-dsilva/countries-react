import React from "react";

const RegionDropdown = (props) => {
  return (
    <select onChange={props.handleSelect} className="region-dropdown">
      <option>Filter by Region</option>
      <option>Africa</option>
      <option>Americas</option>
      <option>Asia</option>
      <option>Europe</option>
      <option>Oceania</option>
    </select>
  );
};

export default RegionDropdown;
