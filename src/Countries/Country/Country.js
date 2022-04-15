import React from "react";

const Country = (props) => {
  return (
    <div className="country" onClick={props.showCountryDetail}>
      <img className="flag" src={props.flag} alt={props.name} />
      <div className="info-container">
        <h3>{props.name}</h3>
        <br />
        <p>
          <b>Population:</b> {props.population.toLocaleString("en-GB")}
        </p>
        <p>
          <b>Region:</b> {props.region}
        </p>
        <p>
          <b>Capital:</b> {props.capital}
        </p>
      </div>
    </div>
  );
};

export default Country;
