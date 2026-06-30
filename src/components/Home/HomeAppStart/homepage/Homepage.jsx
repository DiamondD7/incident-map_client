import { useEffect, useState } from "react";
import {
  BreadIcon,
  CoffeeIcon,
  ForkKnifeIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import HotspotsLogo from "../../../../assets/hotspots-logo-transparent.png";

import "../../../../styles/homepagestyles.css";
import { GetPromotions } from "../../../../assets/js/api-auth";
const HomePageFilter = () => {
  return (
    <div>
      <ul className="homepage-filter__ul">
        <li>
          <button className="-btn-transparent">All</button>
        </li>
        <li>
          <button className="-btn-transparent">Cafe</button>
        </li>
        <li>
          <button className="-btn-transparent"> Restaurant</button>
        </li>
        <li>
          <button className="-btn-transparent">Bakery</button>
        </li>
      </ul>
    </div>
  );
};

const DisplayPage = () => {
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    const GetAllPromotions = async () => {
      try {
        const response = await fetch(GetPromotions, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("response was not successful");
        }

        const data = await response.json();

        setPromotions(data.data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    GetAllPromotions();
  }, []);

  const AllDisplay = ({ promotions }) => {
    const cafes = promotions.filter((item) => item.shopType === "Cafe");
    const restaurants = promotions.filter(
      (item) => item.shopType === "Restaurant",
    );
    const bakery = promotions.filter((item) => item.shopType === "Bakery");

    return (
      <div>
        <div>
          <h3 className="-display-flex-align-items-center -gap-5">
            <CoffeeIcon color="#FA6737" weight="fill" />
            All Cafes
          </h3>
          <div className="display-page-cards-container__wrapper">
            {cafes.map((item) => (
              <div className="display-page-card__wrapper">
                <h6>{item.shopName}</h6>

                <p>{item.address}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <h3 className="-display-flex-align-items-center -gap-5">
            <ForkKnifeIcon color="#FA6737" weight="fill" />
            All Restaurants
          </h3>
          <div className="display-page-cards-container__wrapper">
            {restaurants.map((item) => (
              <div className="display-page-card__wrapper">
                <h6>{item.shopName}</h6>

                <p>{item.address}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <h3 className="-display-flex-align-items-center -gap-5">
            <BreadIcon color="#FA6737" weight="fill" />
            All Bakery
          </h3>
          <div className="display-page-cards-container__wrapper">
            {bakery.map((item) => (
              <div className="display-page-card__wrapper">
                <h6>{item.shopName}</h6>

                <p>{item.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="display-page__wrapper">
      <AllDisplay promotions={promotions} />
    </div>
  );
};

const HomePage = () => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <img style={{ width: "40px" }} src={HotspotsLogo} alt="hotspots-logo" />
      <br />
      <br />
      <h1 style={{ fontSize: "24px", textAlign: "center" }}>
        Welcome to Hotspots, craving something?
      </h1>

      <div className="homepage-search-bar__wrapper">
        <input
          className="homepage-search-bar__input"
          type="text"
          placeholder="Find your next spot..."
        />
        <button className="homepage-search-icon__btn">
          <MagnifyingGlassIcon />
        </button>
      </div>

      <HomePageFilter />
      <DisplayPage />
    </div>
  );
};

export default HomePage;
