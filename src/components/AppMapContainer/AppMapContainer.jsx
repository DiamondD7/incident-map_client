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
  GpsFixIcon,
  WarningIcon,
  PoliceCarIcon,
  CarProfileIcon,
  BarricadeIcon,
  MapPinIcon,
  XIcon,
} from "@phosphor-icons/react";
import { AddIncidentReport, GetIncidents } from "../../assets/js/api-auth";
import currentLocIcon from "../../assets/gps-fix.png";
import selectedLocIcon from "../../assets/map-pin-fill.png";
import accidentIcon from "../../assets/incidenticons/warning-fill.png";
import policeIcon from "../../assets/incidenticons/police-car-fill.png";
import trafficIcon from "../../assets/incidenticons/car-profile-fill.png";
import hazardIcon from "../../assets/incidenticons/barricade-fill.png";

import "leaflet/dist/leaflet.css";
import "../../styles/mapcontainerstyles.css";
const MapActionsContainer = ({
  position,
  setPosition,
  currentPos,
  setSubmitted,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded((prev) => !prev);
  };

  const handleAddIncident = async (e, incidentType) => {
    e.preventDefault();

    try {
      const response = await fetch(AddIncidentReport, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          IncidentType: incidentType,
          Latitude: position ? position.lat : currentPos.latitude,
          Longitude: position ? position.lng : currentPos.longitude,
        }),
      });

      if (response.status === 400) {
        console.log(response.status);
      }

      if (!response.ok) {
        throw new Error("Failed to add incident report");
      }

      const data = await response.json();
      console.log("Incident report added successfully:", data);
      setSubmitted(true);
      setPosition(null);
      setIsExpanded(false);
    } catch (err) {
      console.error("Error adding incident report:", err);
      throw err;
    }
  };

  return (
    <div className="map-actions-container__wrapper">
      <div className="actions__wrapper">
        <>
          <button
            className="incident-report__btn"
            onClick={(e) => toggleExpand(e)}
          >
            {position === null ? (
              <>
                Report Incident - Use the current{" "}
                <GpsFixIcon size={15} color="#fff" weight="fill" /> location
              </>
            ) : (
              <>
                Report Incident - Use the selected{" "}
                <MapPinIcon size={15} color="#5842ff" weight="fill" /> location
              </>
            )}
          </button>
        </>

        <>
          <button
            className={`traffic__btn ${isExpanded ? "expanded" : "not-expanded"}`}
            disabled={!isExpanded}
            onClick={(e) => handleAddIncident(e, "Traffic")}
          >
            <CarProfileIcon size={18} color="#fff" weight="fill" />
          </button>
          <button
            className={`accident__btn ${isExpanded ? "expanded" : "not-expanded"}`}
            disabled={!isExpanded}
            onClick={(e) => handleAddIncident(e, "Accident")}
          >
            <WarningIcon size={18} color="#fff" weight="fill" />
          </button>
          <button
            className={`hazard__btn ${isExpanded ? "expanded" : "not-expanded"}`}
            disabled={!isExpanded}
            onClick={(e) => handleAddIncident(e, "Hazard")}
          >
            {" "}
            <BarricadeIcon size={18} color="#fff" weight="fill" />
          </button>
          <button
            className={`police__btn ${isExpanded ? "expanded" : "not-expanded"}`}
            disabled={!isExpanded}
            onClick={(e) => handleAddIncident(e, "Police")}
          >
            {" "}
            <PoliceCarIcon size={18} color="#fff" weight="fill" />
          </button>

          <button
            className={`close__btn ${isExpanded ? "expanded" : "not-expanded"}`}
            disabled={!isExpanded}
            onClick={() => setIsExpanded(false)}
          >
            <XIcon size={18} color="#202020" />
          </button>
        </>
      </div>
    </div>
  );
};

const ClickHandler = ({ position, setPosition }) => {
  useMapEvents({
    click: (e) => {
      if (e.latlng.lat === position?.lat && e.latlng.lng === position?.lng) {
        setPosition(null);
        return;
      }
      setPosition(e.latlng);
    },
  });

  return null;
};

const AppMapContainer = () => {
  const [incidents, setIncidents] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [position, setPosition] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    //MAKE THIS BETTER
    fetch(GetIncidents, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Fetched incidents:", response);
        setIncidents(response.data);
        setSubmitted(false);
      });
  }, [submitted]);

  const currentLocationIcon = new Icon({
    iconUrl: currentLocIcon,
    iconSize: [25, 25],
  });

  const handleIncidentIcon = (type) => {
    // This function determines the appropriate icon based on the incident type
    return new Icon({
      iconUrl:
        type === "Accident"
          ? accidentIcon
          : type === "Police"
            ? policeIcon
            : type === "Traffic"
              ? trafficIcon
              : hazardIcon,
      iconSize: [30, 30],
    });
  };

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
            <MapContainer center={[latitude, longitude]} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker
                position={[latitude, longitude]}
                icon={currentLocationIcon}
              >
                <Popup>You are here</Popup>
              </Marker>

              <ClickHandler position={position} setPosition={setPosition} />

              {position && (
                <Marker
                  position={position}
                  icon={selectedLocationIcon}
                ></Marker>
              )}

              {incidents.map((incident) => (
                <Marker
                  key={incident.id}
                  position={[incident.latitude, incident.longitude]}
                  icon={handleIncidentIcon(incident.incidentType)}
                >
                  <Popup>
                    <div className="popup-content__wrapper">
                      <h3>{incident.incidentType}</h3>
                      <p>
                        Reported at:{" "}
                        {new Date(incident.createdAt).toLocaleString()}
                      </p>
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
        position={position}
        setPosition={setPosition}
        currentPos={{ latitude: latitude, longitude: longitude }}
        setSubmitted={setSubmitted}
      />
    </>
  );
};

export default AppMapContainer;
