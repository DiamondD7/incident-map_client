import { useEffect, useState } from "react";
import {
  BookmarkSimpleIcon,
  CompassIcon,
  HouseIcon,
  MapTrifoldIcon,
} from "@phosphor-icons/react";
import HomeMapStart from "../HomeMapStart/HomeMapStart";
import { Outlet, useNavigate } from "react-router-dom";

import "../../../styles/homeappstyles.css";
const BottomNav = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("/");

  const handleMenuClicked = (e, name) => {
    e.preventDefault();
    setActiveMenu(name);
    navigate(`/${name}`);
  };

  return (
    <>
      <div className="bottom-navigation-menu__wrapper">
        <ul>
          <li>
            <button
              className={`bottom-navigation-menu__button ${activeMenu === "/" ? "activeBtnMenu" : ""}`}
              onClick={(e) => handleMenuClicked(e, "/")}
            >
              <HouseIcon
                size={27}
                weight="fill"
                className={`navigation-menu__icon ${activeMenu === "/" ? "activeIconMenu" : ""}`}
              />
            </button>
          </li>
          {/* <li>
            <button
              className={`bottom-navigation-menu__button ${activeMenu === "discoverFeed" ? "activeBtnMenu" : ""}`}
              onClick={(e) => handleMenuClicked(e, "discoverFeed")}
            >
              <CompassIcon
                size={27}
                weight="fill"
                className={`navigation-menu__icon ${activeMenu === "discoverFeed" ? "activeIconMenu" : ""}`}
              />
            </button>
          </li> */}

          <li>
            <button
              className={`bottom-navigation-menu__button ${activeMenu === "map" ? "activeBtnMenu" : ""}`}
              onClick={(e) => handleMenuClicked(e, "map")}
            >
              <MapTrifoldIcon
                size={27}
                weight="fill"
                className={`navigation-menu__icon ${activeMenu === "map" ? "activeIconMenu" : ""}`}
              />
            </button>
          </li>
          {/* <li>
            <button
              className={`bottom-navigation-menu__button ${activeMenu === "savedItems" ? "activeBtnMenu" : ""}`}
              onClick={(e) => handleMenuClicked(e, "savedItems")}
            >
              <BookmarkSimpleIcon
                size={27}
                weight="fill"
                className={`navigation-menu__icon ${activeMenu === "savedItems" ? "activeIconMenu" : ""}`}
              />
            </button>
          </li> */}
        </ul>
      </div>
    </>
  );
};

const HomeAppStart = () => {
  return (
    <div>
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default HomeAppStart;
