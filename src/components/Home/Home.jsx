import { useEffect, useState, useRef } from "react";
import HeroContainer from "./HeroContainer/HeroContainer";
import FeedViewContainer from "./FeedViewContainer/FeedViewContainer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
      <Helmet>
        <title>Hotspots - Discover what's happening around you</title>
        <meta
          name="description"
          content="Home page for Hotspots - Food deals everywhere in Auckland."
        />
      </Helmet>
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
