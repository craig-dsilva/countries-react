import React from "react";

import Country from "./Country/Country";

const Countries = (props) => {
  // Sorts the country list in alphabetical order
  props.countryList.sort((a, b) => a.name.common.localeCompare(b.name.common));

  return (
    <div className="countries">
      {props.countryList.map((country, index) => {
        return (
          <Country
            key={index}
            flag={country.flags.png}
            name={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital}
            showCountryDetail={() => props.handleCountryDetails(index)}
          />
        );
      })}
    </div>
  );
};

export default Countries;
