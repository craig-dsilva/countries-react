import React from "react";

const Header = ({ toggleDarkMode }) => {
  return (
    <header className="header">
      <h1>Where in the world?</h1>
      <p className="dark-button" onClick={toggleDarkMode}>
        Dark Mode
      </p>
    </header>
  );
};

export default Header;
