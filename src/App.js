import React, { useState, useEffect } from "react";

import Header from "./Header/Header";
import RegionDropdown from "./Countries/RegionDropdown";
import Countries from "./Countries/Countries";

import "./App.css";
import CountryDetails from "./CountryDetails";

function App() {
  const [allCountries, setAllCountries] = useState([]); // Stores all countries from API
  const [regionalCountries, setRegionalCountries] = useState([]); // Filters counties by region
  const [filteredCountries, setFilteredCountries] = useState([]); // Filters countries according to the name from allCountries or regionalCountries
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode
  const [selectedCountryId, setSelectedCountryId] = useState(); // Array index

  const randomCountryId = Math.round(Math.random() * 250); // Random country id

  let countriesArr;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setAllCountries(data);
        setRegionalCountries(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Handles the region dropdown
  const handleSelect = (event) => {
    const value = event.target.value;
    setFilteredCountries([]);
    setRegionalCountries(
      allCountries.filter((country) =>
        value !== "Filter by Region" ? country.region === value : allCountries
      )
    );
  };

  // Handles the search input
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

  // Display more info when a country is clicked
  const showCountryDetails = (countryId) => {
    setSelectedCountryId(countryId);
  };

  // Toggles dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // This decides which state should be used to pass data to JSX and it's children
  filteredCountries.length > 0
    ? (countriesArr = filteredCountries)
    : (countriesArr = regionalCountries);

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      {/* If the array is not empty and country id is specified a single country's details are rendered */}
      {selectedCountryId >= 0 && allCountries.length > 0 ? (
        <main className="main">
          <p onClick={() => showCountryDetails(undefined)}>Back</p>{" "}
          {/* This sets the country id to undefined which in turn renders all the countries */}
          <CountryDetails
            flag={countriesArr[selectedCountryId].flags.png}
            name={countriesArr[selectedCountryId].name.common}
            nativeName={countriesArr[selectedCountryId].name.nativeName}
            population={countriesArr[selectedCountryId].population}
            region={countriesArr[selectedCountryId].region}
            subRegion={countriesArr[selectedCountryId].subregion}
            capital={countriesArr[selectedCountryId].capital[0]}
            domain={countriesArr[selectedCountryId].tld}
          />
        </main>
      ) : (
        <main className="main">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder=" Search for a country"
            className="country-search"
          />
          <RegionDropdown handleSelect={handleSelect} />
          <p onClick={() => showCountryDetails(randomCountryId)}>Random</p>{" "}
          {/* Is used to show details for a random country */}
          <Countries
            countryList={countriesArr}
            handleCountryDetails={showCountryDetails}
          />
        </main>
      )}
    </div>
  );
}

export default App;
