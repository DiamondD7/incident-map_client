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
const HomePageFilter = ({ filterShopType, setFilterShopType }) => {
  const handleFilterClicked = (e, type) => {
    e.preventDefault();
    setFilterShopType(type);
  };
  return (
    <div>
      <ul className="homepage-filter__ul">
        <li>
          <button
            className={`-btn-transparent ${filterShopType === "all" ? "activeFilter" : "unactiveFilter"}`}
            onClick={(e) => handleFilterClicked(e, "all")}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={`-btn-transparent ${filterShopType === "cafe" ? "activeFilter" : "unactiveFilter"}`}
            onClick={(e) => handleFilterClicked(e, "cafe")}
          >
            Cafe
          </button>
        </li>
        <li>
          <button
            className={`-btn-transparent ${filterShopType === "restaurant" ? "activeFilter" : "unactiveFilter"}`}
            onClick={(e) => handleFilterClicked(e, "restaurant")}
          >
            Restaurant
          </button>
        </li>
        <li>
          <button
            className={`-btn-transparent ${filterShopType === "bakery" ? "activeFilter" : "unactiveFilter"}`}
            onClick={(e) => handleFilterClicked(e, "bakery")}
          >
            Bakery
          </button>
        </li>
      </ul>
    </div>
  );
};

const DisplayPage = ({ filterShopType, searchText }) => {
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

  const AllDisplay = ({ promotions, searchText }) => {
    const [searchedItem, setSearchedItem] = useState(null);

    const cafes = promotions.filter((item) => item.shopType === "Cafe");
    const restaurants = promotions.filter(
      (item) => item.shopType === "Restaurant",
    );
    const bakery = promotions.filter((item) => item.shopType === "Bakery");

    useEffect(() => {
      if (searchText) {
        setSearchedItem(
          promotions.filter((item) => {
            const text = searchText.toLowerCase();

            return (
              item.shopName.toLowerCase().includes(text) ||
              item.shopType.toLowerCase().includes(text)
            );
          }),
        );
      }
    }, [searchText]);

    return (
      <>
        {searchedItem !== null ? (
          <>
            {searchedItem.length <= 0 ? (
              <>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    marginTop: "10px",
                    color: "#bebebe",
                  }}
                >
                  Cannot find anything that matches the keyword "{searchText}
                  "{" "}
                </p>
              </>
            ) : (
              <>
                {searchedItem.map((item) => (
                  <div className="bakery-content__wrapper" key={item.id}>
                    <h4 className="-display-flex-align-items-center">
                      {item.shopType === "Restaurant" ? (
                        <ForkKnifeIcon color="#FA6737" weight="fill" />
                      ) : item.shopType === "Cafe" ? (
                        <CoffeeIcon color="#FA6737" weight="fill" />
                      ) : (
                        <BreadIcon color="#FA6737" weight="fill" />
                      )}
                      {item.shopName}
                    </h4>
                    <p style={{ fontSize: "10px", color: "#bebebe" }}>
                      {item.address}
                    </p>
                    <p style={{ fontSize: "12px", marginTop: "10px" }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <div>
            <div>
              <h3 className="-display-flex-align-items-center -gap-5">
                <CoffeeIcon color="#FA6737" weight="fill" />
                All Cafes
              </h3>
              <div className="display-page-cards-container__wrapper">
                {cafes.map((item) => (
                  <div className="display-page-card__wrapper" key={item.id}>
                    <h6>
                      {item.shopName.length > 10
                        ? item.shopName.substring(0, 16)
                        : item.shopName}
                    </h6>

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
                  <div className="display-page-card__wrapper" key={item.id}>
                    <h6>
                      {item.shopName.length > 10
                        ? item.shopName.substring(0, 16)
                        : item.shopName}
                    </h6>

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
                  <div className="display-page-card__wrapper" key={item.id}>
                    <h6>
                      {item.shopName.length > 10
                        ? item.shopName.substring(0, 16)
                        : item.shopName}
                    </h6>

                    <p>{item.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const CafeDisplay = ({ promotions, searchText }) => {
    const [searchedItem, setSearchedItem] = useState(null);
    const [cafes, setCafes] = useState([]);
    const [filterCafe, setFilterCafe] = useState("all");

    useEffect(() => {
      if (searchText) {
        const cafe = promotions.filter((item) => item.shopType === "Cafe");
        setSearchedItem(
          cafe.filter((item) => {
            const text = searchText.toLowerCase();

            return item.shopName.toLowerCase().includes(text);
          }),
        );
      }
    }, [searchText]);

    useEffect(() => {
      if (filterCafe === "all") {
        setCafes(promotions.filter((item) => item.shopType === "Cafe"));
      } else {
        setCafes(
          promotions.filter(
            (item) =>
              item.shopType === "Cafe" && item.isAnAestheticShop === true,
          ),
        );
      }
    }, [filterCafe]);
    return (
      <div style={{ height: "335px", overflow: "auto" }}>
        <h1 style={{ textAlign: "center" }}>Cafes</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            className={`-btn-transparent ${filterCafe === "all" ? "activeCafeFilter" : "unactiveCafeFilter"}`}
            onClick={() => setFilterCafe("all")}
          >
            All Cafes
          </button>
          <button
            className={`-btn-transparent ${filterCafe === "aesthetic" ? "activeCafeFilter" : "unactiveCafeFilter"}`}
            onClick={() => setFilterCafe("aesthetic")}
          >
            Aesthetic Cafes
          </button>
        </div>
        {searchedItem !== null ? (
          <>
            {searchedItem.length <= 0 ? (
              <>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    marginTop: "10px",
                    color: "#bebebe",
                  }}
                >
                  Cannot find anything that matches the keyword "{searchText}
                  "{" "}
                </p>
              </>
            ) : (
              <>
                {searchedItem.map((item) => (
                  <div className="cafes-content__wrapper" key={item.id}>
                    {item.isAnAestheticShop === true ? (
                      <label className="-aesthetic-label">aesthetic</label>
                    ) : (
                      ""
                    )}
                    <h4>{item.shopName}</h4>
                    <p style={{ fontSize: "10px", color: "#bebebe" }}>
                      {item.address}
                    </p>
                    <p style={{ fontSize: "12px", marginTop: "10px" }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {cafes.map((item) => (
              <div className="cafes-content__wrapper" key={item.id}>
                {item.isAnAestheticShop === true ? (
                  <label className="-aesthetic-label">aesthetic</label>
                ) : (
                  ""
                )}
                <h4>{item.shopName}</h4>
                <p style={{ fontSize: "10px", color: "#bebebe" }}>
                  {item.address}
                </p>
                <p style={{ fontSize: "12px", marginTop: "10px" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  const RestaurantDisplay = ({ promotions, searchText }) => {
    const [searchedItem, setSearchedItem] = useState(null);
    const restaurants = promotions.filter(
      (item) => item.shopType === "Restaurant",
    );

    useEffect(() => {
      if (searchText) {
        setSearchedItem(
          restaurants.filter((item) => {
            const text = searchText.toLowerCase();

            return item.shopName.toLowerCase().includes(text);
          }),
        );
      }
    }, [searchText]);

    return (
      <div style={{ height: "335px", overflow: "auto" }}>
        <h1 style={{ textAlign: "center" }}>Restaurants</h1>
        {searchedItem !== null ? (
          <>
            {searchedItem.length <= 0 ? (
              <>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    marginTop: "10px",
                    color: "#bebebe",
                  }}
                >
                  Cannot find anything that matches the keyword "{searchText}
                  "{" "}
                </p>
              </>
            ) : (
              <>
                {searchedItem.map((item) => (
                  <div className="restaurant-content__wrapper" key={item.id}>
                    <h4>{item.shopName}</h4>
                    <p style={{ fontSize: "10px", color: "#bebebe" }}>
                      {item.address}
                    </p>
                    <p style={{ fontSize: "12px", marginTop: "10px" }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {restaurants.map((item) => (
              <div className="restaurant-content__wrapper" key={item.id}>
                <h4>{item.shopName}</h4>
                <p style={{ fontSize: "10px", color: "#bebebe" }}>
                  {item.address}
                </p>
                <p style={{ fontSize: "12px", marginTop: "10px" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  const BakeryDisplay = ({ promotions, searchText }) => {
    const [searchedItem, setSearchedItem] = useState(null);
    const bakery = promotions.filter((item) => item.shopType === "Bakery");

    useEffect(() => {
      if (searchText) {
        setSearchedItem(
          bakery.filter((item) => {
            const text = searchText.toLowerCase();

            return item.shopName.toLowerCase().includes(text);
          }),
        );
      }
    }, [searchText]);

    return (
      <div style={{ height: "335px", overflow: "auto" }}>
        <h1 style={{ textAlign: "center" }}>Bakery</h1>

        {searchedItem !== null ? (
          <>
            {searchedItem.length <= 0 ? (
              <>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "12px",
                    marginTop: "10px",
                    color: "#bebebe",
                  }}
                >
                  Cannot find anything that matches the keyword "{searchText}
                  "{" "}
                </p>
              </>
            ) : (
              <>
                {searchedItem.map((item) => (
                  <div className="bakery-content__wrapper" key={item.id}>
                    <h4>{item.shopName}</h4>
                    <p style={{ fontSize: "10px", color: "#bebebe" }}>
                      {item.address}
                    </p>
                    <p style={{ fontSize: "12px", marginTop: "10px" }}>
                      {item.description}
                    </p>
                  </div>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {bakery.map((item) => (
              <div className="bakery-content__wrapper" key={item.id}>
                <h4>{item.shopName}</h4>
                <p style={{ fontSize: "10px", color: "#bebebe" }}>
                  {item.address}
                </p>
                <p style={{ fontSize: "12px", marginTop: "10px" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="display-page__wrapper">
      {filterShopType === "all" && (
        <AllDisplay promotions={promotions} searchText={searchText} />
      )}

      {filterShopType === "cafe" && (
        <CafeDisplay promotions={promotions} searchText={searchText} />
      )}
      {filterShopType === "restaurant" && (
        <RestaurantDisplay promotions={promotions} searchText={searchText} />
      )}
      {filterShopType === "bakery" && (
        <BakeryDisplay promotions={promotions} searchText={searchText} />
      )}
    </div>
  );
};

const HomePage = () => {
  const [filterShopType, setFilterShopType] = useState("all");
  const [searchText, setSearchText] = useState("");
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
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="homepage-search-icon__btn">
          <MagnifyingGlassIcon />
        </button>
      </div>

      <HomePageFilter
        filterShopType={filterShopType}
        setFilterShopType={setFilterShopType}
      />
      <DisplayPage filterShopType={filterShopType} searchText={searchText} />
    </div>
  );
};

export default HomePage;
