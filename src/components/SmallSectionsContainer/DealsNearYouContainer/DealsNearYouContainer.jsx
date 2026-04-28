import { useEffect, useState } from "react";
import { GpsSlashIcon, SmileySadIcon } from "@phosphor-icons/react";
import { GetPromotionsByLocation } from "../../../assets/js/api-auth";
import "../../../styles/dealsnearyoustyles.css";
const DealsNearYouContainer = ({
  isLocationEnabled,
  currentLocation,
  setShopClicked,
  setFilteredLocation,
  setSelectedLocation,
  setClearFilters,
}) => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch(GetPromotionsByLocation, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Latitude: currentLocation ? currentLocation.lat : 0,
        Longitude: currentLocation ? currentLocation.lng : 0,
        ShopType: "",
        DaysUntilExpiry: 0,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log("Fetched promotions by location:", response);
        setPromotions(response.data);
      });
  }, [isLocationEnabled, currentLocation]);

  return (
    <div className="deals-near-you-container__wrapper">
      <h3>
        <strong style={{ color: "#ff3131" }}>{promotions.length}</strong> Deals
        near you
      </h3>

      {isLocationEnabled === false && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <GpsSlashIcon size={25} color="#4e4e4e65" />
          <p style={{ fontSize: "12px", color: "#353434fa" }}>
            You must enable location to see deals near you.
          </p>
        </div>
      )}

      {isLocationEnabled === true && promotions.length === 0 && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <SmileySadIcon size={25} color="#4e4e4e65" />
          <p style={{ fontSize: "12px", color: "#353434fa" }}>
            No deals found near you. Please check back later.
          </p>
        </div>
      )}

      {isLocationEnabled === true && promotions.length > 0 && (
        <ul className="deals-near-you__ul">
          {promotions.map((promo) => (
            <li key={promo.id}>
              <button
                onClick={() => {
                  setClearFilters(true);
                  setShopClicked({ lat: promo.latitude, lng: promo.longitude });
                }}
              >
                <h4>{promo.shopName}</h4>
                <p>{promo.title}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DealsNearYouContainer;
