import { useState, useEffect } from "react";
import {
  BinocularsIcon,
  CircleNotchIcon,
  MapTrifoldIcon,
} from "@phosphor-icons/react";
import HotspotsLogo from "../../../assets/hotspots-logo-transparent.png";
import StepOneImage from "../../../assets/step1-graphic.png";
import StepTwoImage from "../../../assets/step2-graphic.png";
import StepThreeImage from "../../../assets/step3-graphic.png";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import "../../../styles/herocontainerstyles.css";
const HeroContainer = ({ scrollToComponent }) => {
  const navigate = useNavigate();
  const [isMapClicked, setIsMapClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenMapClick = (e) => {
    e.preventDefault();
    setIsMapClicked(true);

    setTimeout(() => {
      isMobile ? navigate("/app") : navigate("/map");
    }, 2000);
  };
  return (
    <div className="hero-container__wrapper">
      <div className="hotspots-img__wrapper">
        <img
          className="hotspots-logo__img"
          src={HotspotsLogo}
          alt="Hotspots Logo"
        />
      </div>
      <div className="hero-message__wrapper">
        <div className="hero-container-title__wrapper">
          <h1>Find cafe or restaurant deals near you and save instantly.</h1>
        </div>
        <div className="hero-c2a__wrapper">
          <button
            className="hero-c2a-map__btn"
            onClick={(e) => handleOpenMapClick(e)}
          >
            {isMapClicked ? (
              <CircleNotchIcon
                weight="bold"
                color="#FA6737"
                className="btn-loading__icon"
              />
            ) : (
              <MapTrifoldIcon className={"hero-icon"} weight="fill" />
            )}
            Check out the map
          </button>
          <button
            className="hero-c2a-feed__btn"
            onClick={(e) => scrollToComponent(e)}
          >
            <BinocularsIcon className={"hero-icon"} weight="fill" />
            Check out feed view
          </button>
        </div>
      </div>

      <div className="stepbystep-graphics__wrapper">
        <div className="stepbystep-cards__wrapper">
          <img
            className="graphics__img"
            src={StepOneImage}
            alt="Step One Image"
          />
          <h3>Craving Something</h3>
          <p>When you're planning but can't decide where to go</p>
        </div>
        <div className="stepbystep-cards__wrapper">
          <img
            className="graphics__img"
            src={StepTwoImage}
            alt="Step Two Image"
          />
          <h3>Open Hotspots & Find Deals</h3>
          <p>Discover the best offers and discounts in your area</p>
        </div>
        <div className="stepbystep-cards__wrapper">
          <img
            className="graphics__img"
            src={StepThreeImage}
            alt="Step Three Image"
          />
          <h3>Enjoy Coffee While Saving</h3>
          <p>Enjoy the coffee deals with your friends</p>
        </div>
      </div>
    </div>
  );
};

export default HeroContainer;
