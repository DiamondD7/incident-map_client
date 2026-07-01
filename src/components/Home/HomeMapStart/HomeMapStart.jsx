import { useState, useEffect } from "react";
import HotspotsLogo from "../../../assets/hotspots-logo-transparent.png";
import AppMapContainer from "../../AppMapContainer/AppMapContainer";
import SmallSectionsContainer from "../../SmallSectionsContainer/SmallSectionsContainer";
import {
  ArrowCircleLeftIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import MobileSearchContainer from "../../MobileSearchContainer/MobileSearchContainer";

const HomeMapStart = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [isLocationEnabled, setIsLocationEnabled] = useState(null);

  const [clearFilters, setClearFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [shopClicked, setShopClicked] = useState(null); //when user clicks one of the shops in the list. to center the map on that shop.
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchClick = () => {
    setIsSearchClicked(true);
  };

  return (
    <>
      <div>
        {isMobile === false ? (
          <SmallSectionsContainer
            isLocationEnabled={isLocationEnabled}
            currentLocation={currentLocation}
            setShopClicked={setShopClicked}
            setSelectedLocation={setSelectedLocation}
            setClearFilters={setClearFilters}
          />
        ) : (
          <div className="hotspots-map-mobile-header__wrapper">
            <>
              <img
                className="hotspots-map-logo__img"
                src={HotspotsLogo}
                alt="Hotspots Logo"
              />
            </>

            <div className="map-search__wrapper -display-flex-justify-content-space-between">
              <input
                className="map-search__text"
                readOnly
                onFocus={(e) => e.target.blur()}
                placeholder="Need help?"
                onClick={handleSearchClick}
              />
              <MagnifyingGlassIcon size={16} color="#202020" />
            </div>
          </div>
        )}
        <AppMapContainer
          setIsLocationEnabled={setIsLocationEnabled}
          setCurrentLocation={setCurrentLocation}
          shopClicked={shopClicked}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          clearFilters={clearFilters}
          setClearFilters={setClearFilters}
          isLocationEnabled={isLocationEnabled}
          currentLocation={currentLocation}
          setShopClicked={setShopClicked}
          isSearchClicked={isSearchClicked}
          setIsSearchClicked={setIsSearchClicked}
        />
      </div>
    </>
  );
};

export default HomeMapStart;
