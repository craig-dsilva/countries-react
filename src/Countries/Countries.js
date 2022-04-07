import React from "react";

import Country from "./Country/Country";

const Countries = (props) => {
  return (
    <div className="countries">
      {props.countryList
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .map((country, index) => {
          return (
            <Country
              key={index}
              flag={country.flags.png}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          );
        })}
    </div>
  );
};

export default Countries;
