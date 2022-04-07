import React from "react";

const Country = (props) => {
  return (
    <div className="country">
      <img className="flag" src={props.flag} alt={props.name} />
      <h3>{props.name}</h3>
      <p>
        <b>Population:</b> {props.population}
      </p>
      <p>
        <b>Region:</b> {props.region}
      </p>
      <p>
        <b>Capital:</b> {props.capital}
      </p>
    </div>
  );
};

export default Country;
