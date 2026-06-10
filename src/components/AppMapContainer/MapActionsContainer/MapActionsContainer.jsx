import React, { useState, useEffect } from "react";
import {
  CoffeeIcon,
  ForkKnifeIcon,
  HourglassHighIcon,
  HourglassIcon,
  HourglassLowIcon,
  HourglassMediumIcon,
  MapPinIcon,
  MapPinSimpleIcon,
  StorefrontIcon,
  BreadIcon,
} from "@phosphor-icons/react";

const MapActionsContainer = ({
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
  setSelectedLocation,
  setClearFilters,
  setIsSearchClicked,
}) => {
  const [filterOpen, setFilterOpen] = useState(null);

  const LocationFilter = ({
    setNoFilter,
    setSelectedLocation,
    setFilteredLocation,
    latitude,
    longitude,
    setIsSearchClicked,
  }) => {
    return (
      <div className="filter-open__wrapper locationFilter">
        <ul className="filter-open__ul">
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === null ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation(null);
                setSelectedLocation(null);
              }}
            >
              All Locations
            </button>
          </li>
          <br />
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Current Location" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: latitude, lng: longitude });
                setSelectedLocation("Current Location");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Current Location
            </button>
          </li>

          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Auckland CBD" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.8485, lng: 174.7633 });
                setSelectedLocation("Auckland CBD");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Auckland CBD
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Mount Wellington" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.9085, lng: 174.8388 });
                setSelectedLocation("Mount Wellington");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Mount Wellington
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Panmure" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.915, lng: 174.8709 });
                setSelectedLocation("Panmure");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Pakuranga
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Howick" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.893, lng: 174.9243 });
                setSelectedLocation("Howick");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Howick
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Onehunga" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.923, lng: 174.7854 });
                setSelectedLocation("Onehunga");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Onehunga
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Takanini" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -37.0391, lng: 174.9308 });
                setSelectedLocation("Takanini");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Takanini
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Ōtāhuhu" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.951, lng: 174.8451 });
                setSelectedLocation("Ōtāhuhu");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Ōtāhuhu
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Mission Bay" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.8517, lng: 174.831 });
                setSelectedLocation("Mission Bay");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Mission Bay
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Mount Eden" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.8871, lng: 174.7474 });
                setSelectedLocation("Mount Eden");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Mount Eden
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Māngere" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.9722, lng: 174.7867 });
                setSelectedLocation("Māngere");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Māngere
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Remuera" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.8807, lng: 174.7981 });
                setSelectedLocation("Remuera");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              Remuera
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "New Lynn" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredLocation({ lat: -36.909, lng: 174.6775 });
                setSelectedLocation("New Lynn");
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              New Lynn
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const ExpiryFilter = ({
    filteredExpiry,
    setFilteredExpiry,
    setNoFilter,
    setClearFilters,
    setIsSearchClicked,
  }) => {
    return (
      <div className="filter-open__wrapper expiryFilter">
        <ul className="filter-open__ul">
          <li>
            <button
              className={`filter-open__btn ${filteredExpiry === 0 ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredExpiry(0);
                setNoFilter(false);
              }}
            >
              <HourglassLowIcon
                size={17}
                color={`${filteredExpiry === 0 ? "#FA6737" : "#fff"}`}
                weight="fill"
              />
              Show all
            </button>
          </li>
          <br />
          <li>
            <button
              className={`filter-open__btn ${filteredExpiry === 12 ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredExpiry(12);
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              <HourglassLowIcon
                size={17}
                color={`${filteredExpiry === 12 ? "#FA6737" : "#fff"}`}
                weight="fill"
              />
              Exp in 12 days
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${filteredExpiry === 7 ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredExpiry(7);
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              <HourglassLowIcon
                size={17}
                color={`${filteredExpiry === 7 ? "#FA6737" : "#fff"}`}
                weight="fill"
              />
              Exp in 7 days
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${filteredExpiry === 3 ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setIsSearchClicked(false);
                setFilteredExpiry(3);
                setNoFilter(false);
                setClearFilters(false);
              }}
            >
              <HourglassLowIcon
                size={17}
                color={`${filteredExpiry === 3 ? "#FA6737" : "#fff"}`}
                weight="fill"
              />
              Exp in 3 days
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const ShopFilter = ({
    setNoFilter,
    setFilteredShopType,
    setClearFilters,
    setIsSearchClicked,
  }) => {
    return (
      <div className="filter-open__wrapper shopFilter">
        <ul className="filter-open__ul">
          <li>
            <button
              className={`filter-open__btn ${filteredShopType === null ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredShopType(null);
                setNoFilter(false);
                setIsSearchClicked(false);
              }}
            >
              <ForkKnifeIcon
                size={17}
                color={`${filteredShopType === null ? "#FA6737" : "#fff"}`}
                weight="fill"
              />{" "}
              All Shops
            </button>
          </li>
          <br />
          <li>
            <button
              className={`filter-open__btn ${filteredShopType === "Bakery" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredShopType("Bakery");
                setNoFilter(false);
                setClearFilters(false);
                setIsSearchClicked(false);
              }}
            >
              <BreadIcon
                size={17}
                color={`${filteredShopType === "Bakery" ? "#FA6737" : "#fff"}`}
                weight="fill"
              />{" "}
              Bakery
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${filteredShopType === "Cafe" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredShopType("Cafe");
                setNoFilter(false);
                setClearFilters(false);
                setIsSearchClicked(false);
              }}
            >
              <CoffeeIcon
                size={17}
                color={`${filteredShopType === "Cafe" ? "#FA6737" : "#fff"}`}
                weight="fill"
              />{" "}
              Cafe
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${filteredShopType === "Restaurant" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredShopType("Restaurant");
                setNoFilter(false);
                setClearFilters(false);
                setIsSearchClicked(false);
              }}
            >
              <ForkKnifeIcon
                size={17}
                color={`${filteredShopType === "Restaurant" ? "#FA6737" : "#fff"}`}
                weight="fill"
              />{" "}
              Restaurant
            </button>
          </li>
        </ul>
      </div>
    );
  };

  // -------------------------------------------------------------------------------

  const handleOpenFilter = (e, filterType) => {
    e.preventDefault();
    if (filterOpen === filterType) {
      setFilterOpen(null);
      return;
    }

    setFilterOpen(filterType);
  };
  return (
    <div className="map-actions-container__wrapper">
      {filterOpen === "shop" ? (
        <ShopFilter
          setNoFilter={setNoFilter}
          setFilteredShopType={setFilteredShopType}
          setClearFilters={setClearFilters}
          setIsSearchClicked={setIsSearchClicked}
        />
      ) : filterOpen === "expiry" ? (
        <ExpiryFilter
          filteredExpiry={filteredExpiry}
          setFilteredExpiry={setFilteredExpiry}
          setNoFilter={setNoFilter}
          setClearFilters={setClearFilters}
          setIsSearchClicked={setIsSearchClicked}
        />
      ) : filterOpen === "location" ? (
        <LocationFilter
          setNoFilter={setNoFilter}
          setSelectedLocation={setSelectedLocation}
          setFilteredLocation={setFilteredLocation}
          latitude={latitude}
          longitude={longitude}
          setClearFilters={setClearFilters}
          setIsSearchClicked={setIsSearchClicked}
        />
      ) : null}
      <div className="filter__wrapper">
        <button
          className="filter__btn"
          onClick={(e) => handleOpenFilter(e, "shop")}
        >
          <StorefrontIcon size={17} color="#FA6737" weight="fill" />{" "}
          {filteredShopType === null ? "All Shops" : filteredShopType}
        </button>
        <button
          className="filter__btn"
          onClick={(e) => handleOpenFilter(e, "expiry")}
        >
          <HourglassMediumIcon size={17} color="#FA6737" weight="fill" />{" "}
          {filteredExpiry === 0 ? "Show All" : `Exp in ${filteredExpiry} days`}
        </button>
        <button
          className="filter__btn"
          onClick={(e) => handleOpenFilter(e, "location")}
        >
          <MapPinIcon size={17} color="#FA6737" weight="fill" />{" "}
          {selectedLocation === null ? "All Locations" : selectedLocation}
        </button>
      </div>
    </div>
  );
};

export default MapActionsContainer;
