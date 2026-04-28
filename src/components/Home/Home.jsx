import { useEffect, useState } from "react";
import AppMapContainer from "../AppMapContainer/AppMapContainer";

import SmallSectionsContainer from "../SmallSectionsContainer/SmallSectionsContainer";

import "../../styles/homestyles.css";
const Home = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [isLocationEnabled, setIsLocationEnabled] = useState(null);

  const [clearFilters, setClearFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [shopClicked, setShopClicked] = useState(null); //when user clicks one of the shops in the list. to center the map on that shop.
  return (
    <div>
      <div className="home__wrapper">
        <SmallSectionsContainer
          isLocationEnabled={isLocationEnabled}
          currentLocation={currentLocation}
          setShopClicked={setShopClicked}
          setSelectedLocation={setSelectedLocation}
          setClearFilters={setClearFilters}
        />
        <AppMapContainer
          setIsLocationEnabled={setIsLocationEnabled}
          setCurrentLocation={setCurrentLocation}
          shopClicked={shopClicked}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          clearFilters={clearFilters}
          setClearFilters={setClearFilters}
        />
      </div>
    </div>
  );
};

export default Home;
