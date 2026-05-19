import { useState, useEffect } from "react";
import { GetPromotions } from "../../../assets/js/api-auth";
import { CoffeeIcon, ForkKnifeIcon } from "@phosphor-icons/react";

import "../../../styles/feedviewcontainerstyles.css";
const FeedViewContainer = ({ myRef }) => {
  const [promotions, setPromotions] = useState([]);
  useEffect(() => {
    fetch(GetPromotions, {
      method: "Get",
    })
      .then((res) => res.json())
      .then((res) => {
        setPromotions(res.data);
      });
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "200px" }}>Feed View</h1>
      <div className="feed-view-container__wrapper" ref={myRef}>
        {promotions.map((item) => (
          <div className="feed-card__wrapper" key={item.id}>
            <h3 className="-display-flex-align-items-center -gap-10">
              {item.shopType === "Cafe" ? (
                <CoffeeIcon size={18} weight="fill" color="#FA6737" />
              ) : (
                <ForkKnifeIcon size={18} weight="fill" color="#FA6737" />
              )}
              {item.shopName}
            </h3>
            <label>{item.address}</label>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeedViewContainer;
