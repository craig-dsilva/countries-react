import React from "react";

const Info = ({ infoType, value }) => {
  return (
    <p>
      <b>{infoType}</b>: {value}
    </p>
  );
};

const CountryDetails = (props) => {
  return (
    <div className="country-details">
      <img className="flag" src={props.flag} alt={props.name} />
      <div className="info-container">
        <h3>{props.name}</h3>
        <br />
        <Info
          infoType="Population"
          value={props.population.toLocaleString("en-GB")}
        />
        <Info infoType="Region" value={props.region} />
        <Info infoType="Sub Region" value={props.subRegion} />
        <Info infoType="Capital" value={props.capital} />
        <Info infoType="Top Level Domain" value={props.domain} />
        {/* <Info infoType="Currencies" value={props.currencies} />
      <Info infoType="Languages" value={props.languages} /> */}
      </div>
    </div>
  );
};

export default CountryDetails;
