import { useEffect, useState } from "react";

import "../../styles/homestyles.css";
const NavigationContainer = () => {
  return (
    <div className="navigation-bar-container__wrapper">
      <input
        className="search-bar__input"
        type="text"
        placeholder="Search location...."
      />
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container__wrapper">
      <NavigationContainer />
      <h1>Home</h1>
    </div>
  );
};

export default Home;
