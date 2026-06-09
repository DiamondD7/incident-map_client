import { useState, useEffect } from "react";
import HotspotsLogo from "../../../assets/hotspots-logo-transparent.png";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import SmallSectionsContainer from "../../SmallSectionsContainer/SmallSectionsContainer";
import MapActionsContainer from "../../AppMapContainer/MapActionsContainer/MapActionsContainer";

import "../../../styles/mobilesearchcontainerstyles.css";
const MobileSearchContainer = ({
  setIsSearchClicked,
  isLocationEnabled,
  currentLocation,
  setShopClicked,
  setSelectedLocation,
  setClearFilters,
  filteredShopType,
  setNoFilter,
  setFilteredShopType,
  filteredLocation,
  setFilteredLocation,
  filteredExpiry,
  setFilteredExpiry,
  latitude,
  longitude,
  selectedLocation,
}) => {
  return (
    <div className="mobile-search-container__wrapper">
      <div className="hotspots-map-mobile-header__wrapper">
        <button
          onClick={() => setIsSearchClicked(false)}
          className="-btn-transparent"
        >
          <XIcon size={60} weight="thin" />
        </button>
        <div className="map-search__wrapper -display-flex-justify-content-space-between">
          <input
            className="map-search__text"
            type="text"
            placeholder="What do you want to find?"
          />
          <MagnifyingGlassIcon size={16} color="#202020" />
        </div>
      </div>

      <div>
        <MapActionsContainer
          filteredShopType={filteredShopType}
          setNoFilter={setNoFilter}
          setFilteredShopType={setFilteredShopType}
          filteredLocation={filteredLocation}
          setFilteredLocation={setFilteredLocation}
          filteredExpiry={filteredExpiry}
          setFilteredExpiry={setFilteredExpiry}
          latitude={latitude}
          longitude={longitude}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          setClearFilters={setClearFilters}
          setIsSearchClicked={setIsSearchClicked}
        />

        <SmallSectionsContainer
          isLocationEnabled={isLocationEnabled}
          currentLocation={currentLocation}
          setShopClicked={setShopClicked}
          setSelectedLocation={setSelectedLocation}
          setClearFilters={setClearFilters}
          setIsSearchClicked={setIsSearchClicked}
        />
      </div>
    </div>
  );
};

export default MobileSearchContainer;
