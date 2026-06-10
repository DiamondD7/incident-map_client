import { useState, useEffect } from "react";
import { GetPromotionsByLocation } from "../../../assets/js/api-auth";

import "../../../styles/aestheticcontainerstyles.css";
const AestheticContainer = ({
  setClearFilters,
  setShopClicked,
  setIsSearchClicked,
}) => {
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    fetch(GetPromotionsByLocation, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Latitude: 0,
        Longitude: 0,
        ShopType: "",
        IsAnAestheticShop: true,
        DaysUntilExpiry: 0,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        //console.log("Fetched promotions by location:", response);
        setPromotions(response.data);
      });
  }, []);
  return (
    <div className="aesthetic-container__wrapper">
      <h3 className="small-section__header">Aesthetic Shops</h3>
      <ul className="aesthetic__ul">
        {promotions.map((promotion) => (
          <li key={promotion.id}>
            <h4 className="hotdeals-shopName__h4">{promotion.shopName}</h4>

            <button
              onClick={() => {
                setIsSearchClicked(false);
                setClearFilters(true);
                setShopClicked({
                  lat: promotion.latitude,
                  lng: promotion.longitude,
                });
              }}
            >
              {promotion.description}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AestheticContainer;
