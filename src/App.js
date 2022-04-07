import React, { useState, useEffect } from "react";

import Header from "./Header/Header";
import Countries from "./Countries/Countries";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Header />
      <Countries countryList={countries} />
    </div>
  );
}

export default App;
