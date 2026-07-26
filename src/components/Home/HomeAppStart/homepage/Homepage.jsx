import { useEffect, useState } from "react";
import {
  BreadIcon,
  CameraIcon,
  CircleNotchIcon,
  CoffeeIcon,
  FireIcon,
  ForkKnifeIcon,
  HourglassHighIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  TimerIcon,
} from "@phosphor-icons/react";
import HotspotsLogo from "../../../../assets/hotspots-logo-transparent.png";
import {
  GetPromotions,
  API_URI,
  GetAvailablePromotions,
} from "../../../../assets/js/api-auth";
import { TimeAgo } from "../../../../assets/js/timeAgo";
import ModalContainer from "../../../ModalContainer/ModalContainer";
import { Helmet } from "react-helmet-async";

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

const DisplayPage = ({
  availblePromotionsNow,
  promotions,
  filterShopType,
  searchText,
  setActiveMenu,
  quickFilterData,
}) => {
  const [clickedModal, setClickedModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const AllDisplay = ({
    availblePromotionsNow,
    promotions,
    searchText,
    setClickedModal,
    setModalData,
  }) => {
    const [loading, setLoading] = useState(true);
    const [searchedItem, setSearchedItem] = useState(null);

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

    const handleClickModal = (e, data) => {
      e.preventDefault();
      setClickedModal(true);
      setModalData(data);
    };

    const NewlyAdded = ({ handleClickModal, promotions }) => {
      const [loading, setLoading] = useState(true);
      const newAddedPromotions = promotions.filter((item) =>
        TimeAgo(item.createdAt),
      );

      useEffect(() => {
        if (promotions.length > 0) {
          setLoading(false);
        }
      }, [promotions]);
      return (
        <div>
          {newAddedPromotions.length <= 0 ? null : (
            <>
              <h4 className="-display-flex-align-items-center -gap-5">
                <SparkleIcon color="#FA6737" weight="fill" />
                Newly Added
              </h4>

              <div className="display-newAdded-page-cards-container__wrapper">
                {loading ? (
                  <>
                    <div className="display-page-card-loading__wrapper">
                      <>
                        <div className="page-card-picture-loading__wrapper"></div>
                        <div className="page-card-description-loading__wrapper"></div>
                      </>
                    </div>
                    <div className="display-page-card-loading__wrapper">
                      <>
                        <div className="page-card-picture-loading__wrapper"></div>
                        <div className="page-card-description-loading__wrapper"></div>
                      </>
                    </div>
                  </>
                ) : (
                  <>
                    {newAddedPromotions.map((item) => (
                      <div className="display-page-card__wrapper" key={item.id}>
                        {item.images.length > 0 ? (
                          <>
                            {item.images.map(
                              (image) =>
                                image.imageTitle === "thumbnail" && (
                                  <img
                                    key={image.id}
                                    src={`${API_URI}${image.imageUrl}`}
                                    alt="pic-one"
                                    style={{
                                      width: "100px",
                                      height: "50px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                  />
                                ),
                            )}
                          </>
                        ) : (
                          <div
                            style={{
                              width: "100px",
                              height: "50px",
                              backgroundColor: "#e2e1e1",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "5px",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              <CameraIcon size={20} />

                              <p style={{ fontSize: "9px" }}>
                                No Images Available
                              </p>
                            </div>
                          </div>
                        )}
                        <h6
                          className="newAdded-card-shopName__text"
                          onClick={(e) => handleClickModal(e, item)}
                        >
                          {item.shopName.length > 10
                            ? item.shopName.substring(0, 16)
                            : item.shopName}
                        </h6>

                        <p className="newAdded-card-title__text">
                          {item.title}
                        </p>
                        <p className="newAdded-card-description__text">
                          {item.description.length > 30
                            ? item.description.substring(0, 80) + "..."
                            : item.description}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      );
    };

    const DealsOnNow = ({ handleClickModal, availblePromotionsNow }) => {
      return (
        <div style={{ borderBottom: "1px solid #ccc", marginTop: "20px" }}>
          <h4 className="-display-flex-align-items-center -gap-5">
            <TimerIcon color="#FA6737" weight="fill" />
            Deals on Now
          </h4>

          {availblePromotionsNow.length <= 0 ? (
            <div style={{ padding: "10px" }}>
              <h6 style={{ color: "#8a8a8a" }}>
                No deals running at the moment
              </h6>
            </div>
          ) : (
            <div className="display-page-cards-container__wrapper">
              {availblePromotionsNow.map((item) => (
                <div className="display-page-card__wrapper" key={item.id}>
                  {item.images.length > 0 ? (
                    <>
                      {item.images.map(
                        (image) =>
                          image.imageTitle === "thumbnail" && (
                            <img
                              key={image.id}
                              src={`${API_URI}${image.imageUrl}`}
                              alt="pic-one"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                            />
                          ),
                      )}
                    </>
                  ) : (
                    <div
                      style={{
                        width: "100px",
                        height: "50px",
                        backgroundColor: "#e2e1e1",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "5px",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <CameraIcon size={20} />

                        <p style={{ fontSize: "9px" }}>No Images Available</p>
                      </div>
                    </div>
                  )}
                  <h6
                    className="link-card-shopName__text"
                    onClick={(e) => handleClickModal(e, item)}
                  >
                    {item.shopName}
                  </h6>
                  {item.deals.map((deal) => (
                    <div key={deal.id}>
                      <p className="card-title__text">{deal.dealTitle}</p>

                      <p className="card-description__text">
                        {item.description.length > 30
                          ? item.description.substring(0, 80) + "..."
                          : item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    const HotDeals = () => {
      return (
        <div style={{ borderBottom: "1px solid #ccc", marginTop: "20px" }}>
          <h4 className="-display-flex-align-items-center -gap-5">
            <FireIcon color="#FA6737" weight="fill" />
            Hot Deals
          </h4>

          <div className="display-default-page-cards-container__wrapper">
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
      );
    };

    const AestheticFoodSpots = () => {
      return (
        <div style={{ marginTop: "30px", borderBottom: "1px solid #ccc" }}>
          <h4 className="-display-flex-align-items-center -gap-5">
            <CoffeeIcon color="#FA6737" weight="fill" />
            Aesthetic Food Spots
          </h4>
          <div className="display-default-page-cards-container__wrapper">
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

              <p className="card-title__text">Aesthetic Looking Bakery Shop</p>
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
      );
    };

    const TrendingFoodSpots = () => {
      return (
        <div style={{ marginTop: "30px" }}>
          <h4 className="-display-flex-align-items-center -gap-5">
            <ForkKnifeIcon color="#FA6737" weight="fill" />
            Trending Food Spots
          </h4>
          <div className="display-default-page-cards-container__wrapper">
            <div className="display-page-card__wrapper">
              <h6 className="card-shopName__text">Seoul Night</h6>

              <p className="card-title__text">
                Exclusive Insider Reward 10% Discount
              </p>
              <p className="card-description__text">
                Book through the website below to get 10% OFF your next visit at
                Seoul Night.
              </p>
            </div>
            <div className="display-page-card__wrapper">
              <h6 className="card-shopName__text">Mr. Hao</h6>

              <p className="card-title__text">Bottomless Dumplings - $28pp</p>
              <p className="card-description__text">
                $28 per person all you can eat dumplings. You can choose from 11
                types of their own dumplings. Check their menu on their
                instagram or website.
              </p>
            </div>
            <div className="display-page-card__wrapper">
              <h6 className="card-shopName__text">Botany Commons</h6>

              <p className="card-title__text">Happy Hour</p>
              <p className="card-description__text">
                They are offering $10 on specific beers, wine and other spirits.
                Free pool all day Thursday. Happy Hour 3-6pm Weekdays and 2-5pm
                weekends
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
      );
    };

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
                    <div className="-display-flex">
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
                      <button
                        onClick={(e) => handleClickModal(e, item)}
                        style={{ color: "#FA6737" }}
                        className="-btn-transparent"
                      >
                        view
                      </button>
                    </div>

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
            <NewlyAdded
              handleClickModal={handleClickModal}
              promotions={promotions}
            />

            <DealsOnNow
              handleClickModal={handleClickModal}
              availblePromotionsNow={availblePromotionsNow}
            />

            <HotDeals />

            <AestheticFoodSpots />

            <TrendingFoodSpots />

            <br />
            <br />
            <br />
          </div>
        )}
      </>
    );
  };

  const CafeDisplay = ({
    promotions,
    searchText,
    setClickedModal,
    setModalData,
  }) => {
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

    const handleClickModal = (e, data) => {
      e.preventDefault();
      setClickedModal(true);
      setModalData(data);
    };
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
                    <div className="-display-flex">
                      <h4>{item.shopName}</h4>
                      <button
                        onClick={(e) => handleClickModal(e, item)}
                        style={{ color: "#FA6737" }}
                        className="-btn-transparent"
                      >
                        view
                      </button>
                    </div>
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
                <div className="-display-flex">
                  <h4>{item.shopName}</h4>
                  <button
                    onClick={(e) => handleClickModal(e, item)}
                    style={{ color: "#FA6737" }}
                    className="-btn-transparent"
                  >
                    view
                  </button>
                </div>
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

  const RestaurantDisplay = ({
    promotions,
    searchText,
    setClickedModal,
    setModalData,
  }) => {
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

    const handleClickModal = (e, data) => {
      e.preventDefault();
      setClickedModal(true);
      setModalData(data);
    };

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
                    <div className="-display-flex">
                      <h4>{item.shopName}</h4>
                      <button
                        onClick={(e) => handleClickModal(e, item)}
                        style={{ color: "#FA6737" }}
                        className="-btn-transparent"
                      >
                        view
                      </button>
                    </div>
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
                <div className="-display-flex">
                  <h4>{item.shopName}</h4>
                  <button
                    onClick={(e) => handleClickModal(e, item)}
                    style={{ color: "#FA6737" }}
                    className="-btn-transparent"
                  >
                    view
                  </button>
                </div>
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

  const BakeryDisplay = ({
    promotions,
    searchText,
    setClickedModal,
    setModalData,
  }) => {
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

    const handleClickModal = (e, data) => {
      e.preventDefault();
      setClickedModal(true);
      setModalData(data);
    };

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
                    <div className="-display-flex">
                      <h4>{item.shopName}</h4>
                      <button
                        onClick={(e) => handleClickModal(e, item)}
                        style={{ color: "#FA6737" }}
                        className="-btn-transparent"
                      >
                        view
                      </button>
                    </div>
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
                <div className="-display-flex">
                  <h4>{item.shopName}</h4>
                  <button
                    onClick={(e) => handleClickModal(e, item)}
                    style={{ color: "#FA6737" }}
                    className="-btn-transparent"
                  >
                    view
                  </button>
                </div>
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

  const QuickFilterDisplay = ({
    filterShopType,
    quickFilterData,
    searchText,
    setClickedModal,
    setModalData,
  }) => {
    const [searchedItem, setSearchedItem] = useState(null);

    useEffect(() => {
      if (searchText) {
        setSearchedItem(
          quickFilterData.filter((item) => {
            const text = searchText.toLowerCase();

            return item.shopName.toLowerCase().includes(text);
          }),
        );
      }
    }, [searchText]);

    const handleClickModal = (e, data) => {
      e.preventDefault();
      setClickedModal(true);
      setModalData(data);
    };

    return (
      <div style={{ height: "335px", overflow: "auto" }}>
        <h1 style={{ textAlign: "center" }}>{filterShopType}</h1>

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
                    <div className="-display-flex">
                      <h4>{item.shopName}</h4>
                      <button
                        onClick={(e) => handleClickModal(e, item)}
                        style={{ color: "#FA6737" }}
                        className="-btn-transparent"
                      >
                        view
                      </button>
                    </div>
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
            {quickFilterData.map((item) => (
              <div className="bakery-content__wrapper" key={item.id}>
                <div className="-display-flex">
                  <h4>{item.shopName}</h4>
                  <button
                    onClick={(e) => handleClickModal(e, item)}
                    style={{ color: "#FA6737" }}
                    className="-btn-transparent"
                  >
                    view
                  </button>
                </div>
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
      {clickedModal === true && (
        <ModalContainer
          modalData={modalData}
          clickedModal={clickedModal}
          setClickedModal={setClickedModal}
          setActiveMenu={setActiveMenu}
        />
      )}

      {filterShopType === "all" && (
        <AllDisplay
          availblePromotionsNow={availblePromotionsNow}
          promotions={promotions}
          searchText={searchText}
          setClickedModal={setClickedModal}
          setModalData={setModalData}
        />
      )}

      {filterShopType === "Added Today" ||
      filterShopType === "Deals Expiring Soon" ? (
        <QuickFilterDisplay
          filterShopType={filterShopType}
          quickFilterData={quickFilterData}
          searchText={searchText}
          setClickedModal={setClickedModal}
          setModalData={setModalData}
        />
      ) : null}

      {filterShopType === "cafe" && (
        <CafeDisplay
          promotions={promotions}
          searchText={searchText}
          setClickedModal={setClickedModal}
          setModalData={setModalData}
        />
      )}
      {filterShopType === "restaurant" && (
        <RestaurantDisplay
          promotions={promotions}
          searchText={searchText}
          setClickedModal={setClickedModal}
          setModalData={setModalData}
        />
      )}
      {filterShopType === "bakery" && (
        <BakeryDisplay
          promotions={promotions}
          searchText={searchText}
          setClickedModal={setClickedModal}
          setModalData={setModalData}
        />
      )}
    </div>
  );
};

const QuickFilter = ({ promotions, setQuickFilterData, setFilterShopType }) => {
  const newToday = promotions.filter((item) => {
    const createdDate = new Date(item.createdAt);
    const today = new Date();

    return (
      createdDate.getFullYear() === today.getFullYear() &&
      createdDate.getMonth() === today.getMonth() &&
      createdDate.getDate() === today.getDate()
    );
  });

  const dealExpiringSoon = promotions.filter((item) => {
    return item.deals.some((deal) => {
      const expiryDate = new Date(deal.dealEnd);
      const today = new Date();

      // Remove time so only dates are compared
      expiryDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const difference = expiryDate - today;

      const daysLeft = difference / (1000 * 60 * 60 * 24);

      return daysLeft >= 0 && daysLeft <= 5;
    });
  });

  const handleQuickFilterClicked = (e, data, type) => {
    e.preventDefault();
    setQuickFilterData(data);
    setFilterShopType(type);
  };

  return (
    <>
      {newToday.length > 0 || dealExpiringSoon.length > 0 ? (
        <div
          style={{
            padding: "10px",
            width: "97dvw",
          }}
        >
          <div className="quick-filter__wrapper">
            {dealExpiringSoon.length > 0 && (
              <button
                className="quick-filter__btns"
                onClick={(e) =>
                  handleQuickFilterClicked(
                    e,
                    dealExpiringSoon,
                    "Deals Expiring Soon",
                  )
                }
              >
                <HourglassHighIcon
                  className={"quick-filter__icon"}
                  weight="fill"
                />{" "}
                {dealExpiringSoon.length > 1
                  ? `${dealExpiringSoon.length} deals ending soon`
                  : `${dealExpiringSoon.length} deal ending soon`}
              </button>
            )}

            {newToday.length > 0 && (
              <button
                className="quick-filter__btns"
                onClick={(e) =>
                  handleQuickFilterClicked(e, newToday, "Added Today")
                }
              >
                <SparkleIcon className={"quick-filter__icon"} weight="fill" />{" "}
                {newToday.length} new added today
              </button>
            )}

            {/* <button className="quick-filter__btns">
              <FireIcon className={"quick-filter__icon"} weight="fill" /> 3
              popular spots this week
            </button> */}
          </div>
        </div>
      ) : null}
    </>
  );
};

const HomePage = ({ activeMenu, setActiveMenu }) => {
  const [filterShopType, setFilterShopType] = useState("all");
  const [searchText, setSearchText] = useState("");

  const [quickFilterData, setQuickFilterData] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [availblePromotionsNow, setAvailablePromotionsNow] = useState([]);

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

  useEffect(() => {
    const GetHandleAvailablePromotions = async () => {
      try {
        const response = await fetch(GetAvailablePromotions, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("response was not successful");
        }

        const data = await response.json();

        setAvailablePromotionsNow(data.data);
      } catch (err) {
        console.log(err);
        throw err;
      }
    };

    GetHandleAvailablePromotions();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "100dvw",
        height: "100dvh",
        overflow: "auto",
      }}
    >
      <Helmet>
        <title>
          Hotspots NZ - Home Page For Cheap Food Places In Auckland New Zealand
        </title>
        <meta
          name="description"
          content="Hotspots NZ - Home page for cheap food places in Auckland New Zealand."
        />
      </Helmet>

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

      <QuickFilter
        promotions={promotions}
        setQuickFilterData={setQuickFilterData}
        setFilterShopType={setFilterShopType}
      />
      <DisplayPage
        availblePromotionsNow={availblePromotionsNow}
        promotions={promotions}
        filterShopType={filterShopType}
        searchText={searchText}
        setActiveMenu={setActiveMenu}
        quickFilterData={quickFilterData}
      />
    </div>
  );
};

export default HomePage;
