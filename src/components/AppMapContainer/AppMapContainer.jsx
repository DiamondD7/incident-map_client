import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import {
  CoffeeIcon,
  ForkKnifeIcon,
  HourglassHighIcon,
  HourglassIcon,
  HourglassLowIcon,
  HourglassMediumIcon,
  MapPinIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import {
  GetPromotions,
  GetPromotionsByLocation,
} from "../../assets/js/api-auth";
import currentLocIcon from "../../assets/gps-fix.png";
import selectedLocIcon from "../../assets/map-pin-fill.png";
import accidentIcon from "../../assets/incidenticons/warning-fill.png";
import policeIcon from "../../assets/incidenticons/police-car-fill.png";
import trafficIcon from "../../assets/incidenticons/car-profile-fill.png";
import hazardIcon from "../../assets/incidenticons/barricade-fill.png";

import "leaflet/dist/leaflet.css";
import "../../styles/mapcontainerstyles.css";
import RecenterMap from "./RecenterMap/RecenterMap";
const MapActionsContainer = ({
  filteredShopType,
  setNoFilter,
  setFilteredShopType,
  setFilteredLocation,
  filteredExpiry,
  setFilteredExpiry,
  latitude,
  longitude,
}) => {
  const [filterOpen, setFilterOpen] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const LocationFilter = ({
    setNoFilter,
    setSelectedLocation,
    setFilteredLocation,
    latitude,
    longitude,
  }) => {
    return (
      <div className="filter-open__wrapper locationFilter">
        <ul className="filter-open__ul">
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Auckland CBD" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.8485, lng: 174.7633 });
                setSelectedLocation("Auckland CBD");
                setNoFilter(false);
              }}
            >
              Auckland CBD
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Mount Wellington" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.9085, lng: 174.8388 });
                setSelectedLocation("Mount Wellington");
                setNoFilter(false);
              }}
            >
              Mount Wellington
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Panmure" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.915, lng: 174.8709 });
                setSelectedLocation("Panmure");
                setNoFilter(false);
              }}
            >
              Pakuranga
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Howick" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.893, lng: 174.9243 });
                setSelectedLocation("Howick");
                setNoFilter(false);
              }}
            >
              Howick
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Onehunga" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.923, lng: 174.7854 });
                setSelectedLocation("Onehunga");
                setNoFilter(false);
              }}
            >
              Onehunga
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Takanini" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -37.0391, lng: 174.9308 });
                setSelectedLocation("Takanini");
                setNoFilter(false);
              }}
            >
              Takanini
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Ōtāhuhu" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.951, lng: 174.8451 });
                setSelectedLocation("Ōtāhuhu");
                setNoFilter(false);
              }}
            >
              Ōtāhuhu
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Mission Bay" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.8517, lng: 174.831 });
                setSelectedLocation("Mission Bay");
                setNoFilter(false);
              }}
            >
              Mission Bay
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Mount Eden" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.8871, lng: 174.7474 });
                setSelectedLocation("Mount Eden");
                setNoFilter(false);
              }}
            >
              Mount Eden
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Māngere" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.9722, lng: 174.7867 });
                setSelectedLocation("Māngere");
                setNoFilter(false);
              }}
            >
              Māngere
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Remuera" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.8807, lng: 174.7981 });
                setSelectedLocation("Remuera");
                setNoFilter(false);
              }}
            >
              Remuera
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "New Lynn" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: -36.909, lng: 174.6775 });
                setSelectedLocation("New Lynn");
                setNoFilter(false);
              }}
            >
              New Lynn
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === "Current Location" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation({ lat: latitude, lng: longitude });
                setSelectedLocation("Current Location");
                setNoFilter(false);
              }}
            >
              Current Location
            </button>
          </li>
          <br />
          <li>
            <button
              className={`filter-open__btn ${selectedLocation === null ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredLocation(null);
                setSelectedLocation(null);
              }}
            >
              All Locations
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const ExpiryFilter = ({ filteredExpiry, setFilteredExpiry, setNoFilter }) => {
    return (
      <div className="filter-open__wrapper expiryFilter">
        <ul
          className={`filter-open__ul ${filteredExpiry === 12 ? "filter-open-chosen__btn" : ""}`}
        >
          <li>
            <button
              className="filter-open__btn"
              onClick={() => {
                setFilteredExpiry(12);
                setNoFilter(false);
              }}
            >
              <HourglassLowIcon size={17} color="#202020b6" weight="fill" />
              Exp in 12 days
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${filteredExpiry === 7 ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredExpiry(7);
                setNoFilter(false);
              }}
            >
              <HourglassLowIcon size={17} color="#202020b6" weight="fill" />
              Exp in 7 days
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${filteredExpiry === 3 ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredExpiry(3);
                setNoFilter(false);
              }}
            >
              <HourglassLowIcon size={17} color="#202020b6" weight="fill" />
              Exp in 3 days
            </button>
          </li>
          <br />
          <li>
            <button
              className={`filter-open__btn ${filteredExpiry === 0 ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredExpiry(0);
                setNoFilter(false);
              }}
            >
              <HourglassLowIcon size={17} color="#202020b6" weight="fill" />
              Show all
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const ShopFilter = ({ setNoFilter, setFilteredShopType }) => {
    return (
      <div className="filter-open__wrapper shopFilter">
        <ul className="filter-open__ul">
          <li>
            <button
              className={`filter-open__btn ${filteredShopType === "Cafe" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredShopType("Cafe");
                setNoFilter(false);
              }}
            >
              <CoffeeIcon size={17} color="#202020b6" weight="fill" /> Cafe
            </button>
          </li>
          <li>
            <button
              className={`filter-open__btn ${filteredShopType === "Restaurant" ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredShopType("Restaurant");
                setNoFilter(false);
              }}
            >
              <ForkKnifeIcon size={17} color="#202020b6" weight="fill" />{" "}
              Restaurant
            </button>
          </li>
          <br />
          <li>
            <button
              className={`filter-open__btn ${filteredShopType === null ? "filter-open-chosen__btn" : ""}`}
              onClick={() => {
                setFilteredShopType(null);
                setNoFilter(false);
              }}
            >
              <ForkKnifeIcon size={17} color="#202020b6" weight="fill" /> All
              Shops
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
        />
      ) : filterOpen === "expiry" ? (
        <ExpiryFilter
          filteredExpiry={filteredExpiry}
          setFilteredExpiry={setFilteredExpiry}
          setNoFilter={setNoFilter}
        />
      ) : filterOpen === "location" ? (
        <LocationFilter
          setNoFilter={setNoFilter}
          setSelectedLocation={setSelectedLocation}
          setFilteredLocation={setFilteredLocation}
          latitude={latitude}
          longitude={longitude}
        />
      ) : null}
      <div className="filter__wrapper">
        <button
          className="filter__btn"
          onClick={(e) => handleOpenFilter(e, "shop")}
        >
          <StorefrontIcon size={17} color="#007000" weight="fill" />{" "}
          {filteredShopType === null ? "All Shops" : filteredShopType}
        </button>
        <button
          className="filter__btn"
          onClick={(e) => handleOpenFilter(e, "expiry")}
        >
          <HourglassMediumIcon size={17} color="#007000" weight="fill" />{" "}
          {filteredExpiry === 0 ? "Show All" : `Exp in ${filteredExpiry} days`}
        </button>
        <button
          className="filter__btn"
          onClick={(e) => handleOpenFilter(e, "location")}
        >
          <MapPinIcon size={17} color="#007000" weight="fill" />{" "}
          {selectedLocation === null ? "All Locations" : selectedLocation}
        </button>
      </div>
    </div>
  );
};

// const ClickHandler = ({ position, setPosition }) => {
//   useMapEvents({
//     click: (e) => {
//       if (e.latlng.lat === position?.lat && e.latlng.lng === position?.lng) {
//         setPosition(null);
//         return;
//       }
//       setPosition(e.latlng);
//     },
//   });

//   return null;
// };

const AppMapContainer = () => {
  const [promotions, setPromotions] = useState([]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [noFilter, setNoFilter] = useState(true);
  const [filteredLocation, setFilteredLocation] = useState(null);
  const [filteredShopType, setFilteredShopType] = useState(null);
  const [filteredExpiry, setFilteredExpiry] = useState(0);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    const successHandler = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setIsLoading(false);
    };

    const errorHandler = (err) => {
      setError(`Unable to retrieve your location: ${err.message}`);
      setIsLoading(false);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options,
    );
  }, []);

  useEffect(() => {
    if (noFilter === false) return;
    fetch(GetPromotions, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log("Fetched promotions:", response);
        setPromotions(response.data);
        setNoFilter(true);
      });
  }, [noFilter]);

  useEffect(() => {
    if (noFilter === true) return;
    fetch(GetPromotionsByLocation, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Latitude: filteredLocation ? filteredLocation.lat : 0,
        Longitude: filteredLocation ? filteredLocation.lng : 0,
        ShopType: filteredShopType,
        DaysUntilExpiry: filteredExpiry ? filteredExpiry : 0,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log("Fetched promotions by location:", response);
        setPromotions(response.data);
      });
  }, [filteredLocation, filteredShopType, filteredExpiry]);

  const currentLocationIcon = new Icon({
    iconUrl: currentLocIcon,
    iconSize: [25, 25],
  });

  // const handleIncidentIcon = (type) => {
  //   // This function determines the appropriate icon based on the incident type
  //   return new Icon({
  //     iconUrl:
  //       type === "Accident"
  //         ? accidentIcon
  //         : type === "Police"
  //           ? policeIcon
  //           : type === "Traffic"
  //             ? trafficIcon
  //             : hazardIcon,
  //     iconSize: [30, 30],
  //   });
  // };

  const selectedLocationIcon = new Icon({
    iconUrl: selectedLocIcon,
    iconSize: [25, 25],
  });

  return (
    <>
      <div className="map-container__wrapper">
        {error && <p className="map-error__message">{error}</p>}
        <>
          {isLoading === false ? (
            <MapContainer
              center={
                filteredLocation === null
                  ? [latitude, longitude]
                  : [filteredLocation.lat, filteredLocation.lng]
              }
              zoom={13}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* recenter map when position changes */}
              <RecenterMap position={filteredLocation} />

              <Marker
                position={
                  filteredLocation === null
                    ? [latitude, longitude]
                    : [filteredLocation?.lat, filteredLocation?.lng]
                }
                icon={currentLocationIcon}
              >
                <Popup>You are here</Popup>
              </Marker>

              {/* <ClickHandler position={position} setPosition={setPosition} /> */}

              {promotions.map((promotion) => (
                <Marker
                  key={promotion.id}
                  position={[promotion.latitude, promotion.longitude]}
                  icon={selectedLocationIcon}
                >
                  <Popup>
                    <div className="popup-content__wrapper">
                      <h2>{promotion.shopName}</h2>
                      <h4>{promotion.title}</h4>
                      <p>{promotion.description}</p>
                      {promotion.expiry !== null && (
                        <p>
                          Expiry:
                          {new Date(promotion.expiry).toLocaleDateString()}
                        </p>
                      )}

                      {promotion.link !== null && (
                        <p>
                          For more info.{" "}
                          <a
                            href={promotion.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click here
                          </a>
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <p className="map-loading__message">Loading map...</p>
          )}
        </>
      </div>
      <MapActionsContainer
        filteredShopType={filteredShopType}
        setNoFilter={setNoFilter}
        setFilteredShopType={setFilteredShopType}
        setFilteredLocation={setFilteredLocation}
        filteredExpiry={filteredExpiry}
        setFilteredExpiry={setFilteredExpiry}
        latitude={latitude}
        longitude={longitude}
      />
    </>
  );
};

export default AppMapContainer;
