import React, { useState, useEffect } from "react";

import Header from "./Header/Header";
import RegionDropdown from "./Countries/RegionDropdown";
import Countries from "./Countries/Countries";

import "./App.css";
import CountryDetails from "./CountryDetails";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [regionalCountries, setRegionalCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState();

  const randomCountryId = Math.round(Math.random() * 250);

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

  const showCountryDetails = (countryId) => {
    setSelectedCountryId(countryId);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  filteredCountries.length > 0
    ? (countriesArr = filteredCountries)
    : (countriesArr = regionalCountries);

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      {selectedCountryId >= 0 && allCountries.length > 0 ? (
        <main className="main">
          <p onClick={() => showCountryDetails(undefined)}>Back</p>

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
          <p onClick={() => showCountryDetails(randomCountryId)}>Random</p>
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
