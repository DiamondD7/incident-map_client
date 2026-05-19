import { useEffect, useState, useRef } from "react";
import HeroContainer from "./HeroContainer/HeroContainer";
import FeedViewContainer from "./FeedViewContainer/FeedViewContainer";

import "../../styles/homestyles.css";
const Home = () => {
  const myRef = useRef(null);

  const scrollToComponent = (e) => {
    e.preventDefault();
    myRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="home__wrapper">
        <HeroContainer scrollToComponent={scrollToComponent} />

        <FeedViewContainer myRef={myRef} />
      </div>
    </div>
  );
};

export default Home;
