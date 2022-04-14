import React, { useState, useEffect } from "react";

import Header from "./Header/Header";
import RegionDropdown from "./Countries/RegionDropdown";
import Countries from "./Countries/Countries";

import "./App.css";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [regionalCountries, setRegionalCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);
        setRegionalCountries(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSelect = (event) => {
    const value = event.target.value;
    setFilteredCountries([]);
    setRegionalCountries(
      allCountries.filter((country) =>
        value !== "Filter by Region" ? country.region === value : allCountries
      )
    );
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setFilteredCountries(
      regionalCountries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .startsWith(value.toLowerCase().trim());
      })
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <Header toggleDarkMode={toggleDarkMode} />
      <RegionDropdown handleSelect={handleSelect} />
      <input type="text" value={searchQuery} onChange={handleSearch} />
      <Countries
        countryList={
          filteredCountries.length > 0 ? filteredCountries : regionalCountries
        }
      />
    </div>
  );
}

export default App;
