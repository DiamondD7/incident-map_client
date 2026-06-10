import { useState, useEffect } from "react";
import HotspotsLogo from "../../assets/hotspots-logo-transparent.png";
import {
  CoffeeIcon,
  ForkKnifeIcon,
  MagnifyingGlassIcon,
  XIcon,
} from "@phosphor-icons/react";
import SmallSectionsContainer from "../SmallSectionsContainer/SmallSectionsContainer";
import MapActionsContainer from "../AppMapContainer/MapActionsContainer/MapActionsContainer";

import "../../styles/mobilesearchcontainerstyles.css";
const SearchResultsContainer = ({
  promotions,
  searchTerm,
  setSearchTerm,
  setIsSearchClicked,
  setClearFilters,
  setShopClicked,
}) => {
  const handleClicked = (promo) => {
    setSearchTerm("");
    setIsSearchClicked(false);
    setClearFilters(true);
    setShopClicked({
      lat: promo.latitude,
      lng: promo.longitude,
    });
  };

  return (
    <div className="mobile-search-results-container__wrapper">
      {promotions
        .filter((promotion) => {
          return (
            promotion.shopName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            promotion.shopType.toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
        .map((promotion) => (
          <div
            className="mobile-search-result__wrapper"
            key={promotion.id}
            onClick={() => handleClicked(promotion)}
          >
            <div className="-display-flex-justify-content-space-between">
              <div className="-display-flex-align-items-center -gap-5">
                <h3>{promotion.shopName}</h3>
                <>
                  {promotion.shopType === "Cafe" ? (
                    <CoffeeIcon weight="fill" color="#FA6737" />
                  ) : (
                    <ForkKnifeIcon weight="fill" color="#FA6737" />
                  )}
                </>
              </div>
              {promotion.discountPercent !== null ? (
                <p
                  style={{
                    backgroundColor: "red",
                    padding: "2px 10px",
                    color: "#fff",
                    fontSize: "15px",
                  }}
                >
                  -{promotion.discountPercent} OFF
                </p>
              ) : (
                ""
              )}
            </div>
            <p>{promotion.description}</p>
          </div>
        ))}
    </div>
  );
};

const MobileSearchContainer = ({
  isSearchClicked,
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
  promotions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div
      className={`mobile-search-container__wrapper ${isSearchClicked ? "open" : ""}`}
    >
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
            value={searchTerm}
            placeholder="What do you want to find?"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon size={16} color="#202020" />
        </div>
      </div>

      {searchTerm !== "" ? (
        <SearchResultsContainer
          promotions={promotions}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsSearchClicked={setIsSearchClicked}
          setClearFilters={setClearFilters}
          setShopClicked={setShopClicked}
        />
      ) : (
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
      )}
    </div>
  );
};

export default MobileSearchContainer;
