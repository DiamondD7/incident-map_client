import { useEffect, useState, useRef } from "react";
import HeroContainer from "./HeroContainer/HeroContainer";
import FeedViewContainer from "./FeedViewContainer/FeedViewContainer";

import "../../styles/homestyles.css";
import { Link } from "react-router-dom";
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

        <div className="home-footer__wrapper">
          <p
            style={{
              fontSize: "12px",
              letterSpacing: ".5px",
              color: "#20202075",
            }}
          >
            © 2026 Hotspots. All rights reserved. • Privacy Policy{" "}
            <Link to="/privacy-policy">click here</Link> • Terms and Conditions{" "}
            <Link to="/terms-and-conditions">click here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
