import React from "react";

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="header">
      <h1>Where in the world?</h1>
      {/* Toggles between light and dark mode */}
      <p className="dark-button" onClick={toggleDarkMode}>
        {!isDarkMode ? "Dark" : "Light"} Mode
      </p>
    </header>
  );
};

export default Header;
