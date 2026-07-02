import { useEffect, useState } from "react";
import {
  BreadIcon,
  CircleNotchIcon,
  CoffeeIcon,
  FireIcon,
  ForkKnifeIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import HotspotsLogo from "../../../../assets/hotspots-logo-transparent.png";
import { GetPromotions } from "../../../../assets/js/api-auth";
import { TimeAgo } from "../../../../assets/js/timeAgo";

import "../../../../styles/homepagestyles.css";
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
    const [loading, setLoading] = useState(true);
    const [searchedItem, setSearchedItem] = useState(null);

    const newAddedPromotions = promotions.filter((item) =>
      TimeAgo(item.createdAt),
    );
    const cafes = promotions.filter((item) => item.shopType === "Cafe");
    const restaurants = promotions.filter(
      (item) => item.shopType === "Restaurant",
    );
    const bakery = promotions.filter((item) => item.shopType === "Bakery");

    useEffect(() => {
      if (promotions.length > 0) {
        setLoading(false);
      }
    }, [promotions]);

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
                <SparkleIcon color="#FA6737" weight="fill" />
                Newly Added
              </h3>

              <div className="display-newAdded-page-cards-container__wrapper">
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "250px",
                    }}
                  >
                    <CircleNotchIcon
                      weight="bold"
                      className={"btn-loading__icon"}
                      color="#fff"
                    />
                  </div>
                ) : (
                  <>
                    {newAddedPromotions.map((item) => (
                      <div className="display-page-card__wrapper" key={item.id}>
                        <h6 className="newAdded-card-shopName__text">
                          {item.shopName.length > 10
                            ? item.shopName.substring(0, 16)
                            : item.shopName}
                        </h6>

                        <p className="newAdded-card-title__text">
                          {item.title}
                        </p>
                        <p className="newAdded-card-description__text">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div style={{ borderBottom: "1px solid #ccc", marginTop: "20px" }}>
              <h3 className="-display-flex-align-items-center -gap-5">
                <FireIcon color="#FA6737" weight="fill" />
                Hot Deals
              </h3>

              <div className="display-page-cards-container__wrapper">
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Mission Bay Cafe</h6>
                  <p className="card-title__text">30% OFF all food</p>
                  <p className="card-description__text">
                    This promotion is on until December 20th when you dine after
                    3:00pm you will get a 30% OFF excluded drinks
                  </p>
                </div>

                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Howick Village Cafe</h6>

                  <p className="card-title__text">$4.90 coffees. Mon-Fri</p>
                  <p className="card-description__text">
                    This promotion is only available on weekdays.
                  </p>
                </div>

                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Ronnies Cafe</h6>

                  <p className="card-title__text">
                    Free 250ml Can Drink For Meal Over $20
                  </p>
                  <p className="card-description__text">
                    This promotion is available Monday to Friday, you will get a
                    free can drink for every meal $20 above.
                  </p>
                </div>
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Uglyz Cafe & Bar</h6>

                  <p className="card-title__text">Happy Hour, 50% drinks</p>
                  <p className="card-description__text">
                    Every weekday from 3pm to 5pm
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "30px", borderBottom: "1px solid #ccc" }}>
              <h3 className="-display-flex-align-items-center -gap-5">
                <CoffeeIcon color="#FA6737" weight="fill" />
                Aesthetic Food Spots
              </h3>
              <div className="display-page-cards-container__wrapper">
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">&Black</h6>

                  <p className="card-title__text">
                    Aesthetic modern cafe in Newmarket
                  </p>
                  <p className="card-description__text">
                    A modern cafe look but very cosy.
                  </p>
                </div>
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Maru's House</h6>

                  <p className="card-title__text">Cute Aesthetic Cafe</p>
                  <p className="card-description__text">
                    This cafe is good for people that loves matcha and loves
                    aesthetic environment
                  </p>
                </div>
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Mixed 1981</h6>

                  <p className="card-title__text">Cute & Spacious Cafe</p>
                  <p className="card-description__text">
                    This cute cafe is popular for its coffee, matcha and its
                    aesthetic look.
                  </p>
                </div>
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Ronnies Cafe</h6>

                  <p className="card-title__text">
                    Free 250ml Can Drink For Meal Over $20
                  </p>
                  <p className="card-description__text">
                    This promotion is available Monday to Friday, you will get a
                    free can drink for every meal $20 above.
                  </p>
                </div>

                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Atelier Shu</h6>

                  <p className="card-title__text">
                    Aesthetic Looking Bakery Shop
                  </p>
                  <p className="card-description__text">
                    They serve mini gateau cakes and handcrafted pastries.
                  </p>
                </div>

                {/* {cafes.map((item) => (
                  <div className="display-page-card__wrapper" key={item.id}>
                    <h6>
                      {item.shopName.length > 10
                        ? item.shopName.substring(0, 16)
                        : item.shopName}
                    </h6>

                    <p>{item.address}</p>
                  </div>
                ))} */}
              </div>
            </div>
            <div style={{ marginTop: "30px" }}>
              <h3 className="-display-flex-align-items-center -gap-5">
                <ForkKnifeIcon color="#FA6737" weight="fill" />
                Trending Food Spots
              </h3>
              <div className="display-page-cards-container__wrapper">
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Seoul Night</h6>

                  <p className="card-title__text">
                    Exclusive Insider Reward 10% Discount
                  </p>
                  <p className="card-description__text">
                    Book through the website below to get 10% OFF your next
                    visit at Seoul Night.
                  </p>
                </div>
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Mr. Hao</h6>

                  <p className="card-title__text">
                    Bottomless Dumplings - $28pp
                  </p>
                  <p className="card-description__text">
                    $28 per person all you can eat dumplings. You can choose
                    from 11 types of their own dumplings. Check their menu on
                    their instagram or website.
                  </p>
                </div>
                <div className="display-page-card__wrapper">
                  <h6 className="card-shopName__text">Botany Commons</h6>

                  <p className="card-title__text">Happy Hour</p>
                  <p className="card-description__text">
                    They are offering $10 on specific beers, wine and other
                    spirits. Free pool all day Thursday. Happy Hour 3-6pm
                    Weekdays and 2-5pm weekends
                  </p>
                </div>

                {/* {restaurants.map((item) => (
                  <div className="display-page-card__wrapper" key={item.id}>
                    <h6>
                      {item.shopName.length > 10
                        ? item.shopName.substring(0, 16)
                        : item.shopName}
                    </h6>

                    <p>{item.address}</p>
                  </div>
                ))} */}
              </div>
            </div>
            <div style={{ marginTop: "50px" }}>
              {/* <h3 className="-display-flex-align-items-center -gap-5">
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
              </div> */}
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
