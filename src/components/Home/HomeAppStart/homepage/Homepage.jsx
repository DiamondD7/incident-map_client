import { useEffect, useState } from "react";
import {
  ArrowBendLeftDownIcon,
  ArrowBendRightDownIcon,
  BowlFoodIcon,
  BreadIcon,
  CameraIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  CircleNotchIcon,
  CoffeeIcon,
  FireIcon,
  ForkKnifeIcon,
  HamburgerIcon,
  HourglassHighIcon,
  MagnifyingGlassIcon,
  PizzaIcon,
  SparkleIcon,
  TimerIcon,
  XIcon,
} from "@phosphor-icons/react";
import HotspotsLogo from "../../../../assets/hotspots-logo-transparent.png";
import {
  GetPromotions,
  API_URI,
  GetAvailablePromotions,
  GetDecideRequest,
} from "../../../../assets/js/api-auth";
import {
  TimeAgo,
  getTimeRemaining,
  getDealStatus,
} from "../../../../assets/js/timeAgo";
import ModalContainer from "../../../ModalContainer/ModalContainer";
import ModalDecisionContainer from "../../../ModalContainer/ModalDecisionContainer";
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
          setTimeout(() => {
            setLoading(false);
          }, 1000);
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
                                    src={image.imageUrl}
                                    alt="pic-one"
                                    style={{
                                      width: "100px",
                                      height: "50px",
                                      objectFit: "cover",
                                      borderRadius: "5px",
                                    }}
                                    loading="lazy"
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
      const [loading, setLoading] = useState(true);
      const [noDeals, setNoDeals] = useState(false);

      useEffect(() => {
        if (availblePromotionsNow.length > 0) {
          setTimeout(() => {
            setLoading(false);
            setNoDeals(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setLoading(false);
            setNoDeals(true);
          }, 1000);
        }
      }, [availblePromotionsNow]);

      return (
        <div style={{ borderBottom: "1px solid #ccc", marginTop: "20px" }}>
          <h4 className="-display-flex-align-items-center -gap-5">
            <TimerIcon color="#FA6737" weight="fill" />
            Deals on Now
          </h4>

          {loading ? (
            <div style={{ padding: "10px" }}>
              <div className="-display-flex">
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
              </div>
            </div>
          ) : noDeals ? (
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
                              src={image.imageUrl}
                              alt="pic-one"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                              loading="lazy"
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
                      <p
                        style={{
                          fontSize: "9px",
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {getTimeRemaining(deal.endTime) &&
                          `${getTimeRemaining(deal.endTime)}`}
                      </p>
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

    const LunchDeals = ({ handleClickModal, promotions }) => {
      const [loading, setLoading] = useState(true);
      const [noDeals, setNoDeals] = useState(false);

      const lunchDeals = promotions
        .map((item) => ({
          ...item,
          deals: item.deals.filter((deal) => deal.dealType === "Lunch"),
        }))
        .filter((item) => item.deals.length > 0);

      useEffect(() => {
        if (promotions.length > 0) {
          setTimeout(() => {
            setLoading(false);
            setNoDeals(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setLoading(false);
            setNoDeals(true);
          }, 1000);
        }
      }, [promotions]);

      return (
        <div style={{ borderBottom: "1px solid #ccc", marginTop: "20px" }}>
          <h4 className="-display-flex-align-items-center -gap-5">
            <HamburgerIcon color="#FA6737" weight="fill" />
            Cheap Lunch Deals
          </h4>

          {loading ? (
            <div style={{ padding: "10px" }}>
              <div className="-display-flex">
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
              </div>
            </div>
          ) : noDeals ? (
            <div style={{ padding: "10px" }}>
              <h6 style={{ color: "#8a8a8a" }}>
                No deals running at the moment
              </h6>
            </div>
          ) : (
            <div className="display-page-cards-container__wrapper">
              {lunchDeals.map((item) => (
                <div className="display-page-card__wrapper" key={item.id}>
                  {item.images.length > 0 ? (
                    <>
                      {item.images.map(
                        (image) =>
                          image.imageTitle === "thumbnail" && (
                            <img
                              key={image.id}
                              src={image.imageUrl}
                              alt="pic-one"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                              loading="lazy"
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
                      {item.deals.length > 1 ? (
                        <>
                          {(() => {
                            const deal = item.deals[currentDealIndex];

                            return (
                              <div>
                                <div>
                                  <p className="card-title__text">
                                    {deal.dealTitle}
                                  </p>

                                  <p className="card-description__text">
                                    {item.description.length > 80
                                      ? item.description.substring(0, 80) +
                                        "..."
                                      : item.description}
                                  </p>
                                </div>

                                <button
                                  className="next-deals__btn"
                                  onClick={() =>
                                    setCurrentDealIndex(
                                      (currentDealIndex + 1) %
                                        item.deals.length,
                                    )
                                  }
                                >
                                  Next deal
                                </button>
                              </div>
                            );
                          })()}
                        </>
                      ) : (
                        <>
                          <div key={deal.id}>
                            {/* <p
                            className={`${getDealStatus(deal.startTime, deal.endTime) === "Active" ? "active-deal" : "not-active-deal"}`}
                            >
                            {getDealStatus(deal.startTime, deal.endTime) &&
                            `${getDealStatus(deal.startTime, deal.endTime)}`}
                            </p> */}
                            <p className="card-title__text">{deal.dealTitle}</p>

                            <p className="card-description__text">
                              {item.description.length > 30
                                ? item.description.substring(0, 80) + "..."
                                : item.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    };

    const DinnerDeals = ({ handleClickModal, promotions }) => {
      const [loading, setLoading] = useState(true);
      const [noDeals, setNoDeals] = useState(false);
      const [dealIndexes, setDealIndexes] = useState({});

      const dinnerDeals = promotions
        .map((item) => ({
          ...item,
          deals: item.deals.filter((deal) => deal.dealType === "Dinner"),
        }))
        .filter((item) => item.deals.length > 0);

      useEffect(() => {
        if (promotions.length > 0) {
          setTimeout(() => {
            setLoading(false);
            setNoDeals(false);
          }, 1000);
        } else {
          setTimeout(() => {
            setLoading(false);
            setNoDeals(true);
          }, 1000);
        }
      }, [promotions]);

      return (
        <div style={{ borderBottom: "1px solid #ccc", marginTop: "20px" }}>
          <h4 className="-display-flex-align-items-center -gap-5">
            <BowlFoodIcon color="#FA6737" weight="fill" />
            Dinner Specials
          </h4>

          {loading ? (
            <div style={{ padding: "10px" }}>
              <div className="-display-flex">
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
              </div>
            </div>
          ) : noDeals ? (
            <div style={{ padding: "10px" }}>
              <h6 style={{ color: "#8a8a8a" }}>
                No deals running at the moment
              </h6>
            </div>
          ) : (
            <div className="display-page-cards-container__wrapper">
              {dinnerDeals.map((item) => (
                <div className="display-page-card__wrapper" key={item.id}>
                  {item.images.length > 0 ? (
                    <>
                      {item.images.map(
                        (image) =>
                          image.imageTitle === "thumbnail" && (
                            <img
                              key={image.id}
                              src={image.imageUrl}
                              alt="pic-one"
                              style={{
                                width: "100px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "5px",
                              }}
                              loading="lazy"
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

                  {item.deals.length > 1 ? (
                    <>
                      {(() => {
                        const currentDealIndex = dealIndexes[item.id] || 0;
                        const deal = item.deals[currentDealIndex];

                        return (
                          <div className="promotion-card-if-more-than-one__wrapper">
                            <div>
                              <p className="card-title__text">
                                {deal.dealTitle}
                              </p>

                              <p className="card-description__text">
                                {item.description.length > 80
                                  ? item.description.substring(0, 80) + "..."
                                  : item.description}
                              </p>
                            </div>

                            <button
                              className="next-deals__btn"
                              onClick={() =>
                                setDealIndexes((prev) => ({
                                  ...prev,
                                  [item.id]:
                                    (currentDealIndex + 1) % item.deals.length,
                                }))
                              }
                            >
                              click for next deals
                              <CaretRightIcon weight="fill" color="#FA6737" />
                            </button>
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    <>
                      {item.deals.map((deal) => (
                        <div key={deal.id}>
                          <div>
                            {/* <p
                            className={`${getDealStatus(deal.startTime, deal.endTime) === "Active" ? "active-deal" : "not-active-deal"}`}
                            >
                            {getDealStatus(deal.startTime, deal.endTime) &&
                            `${getDealStatus(deal.startTime, deal.endTime)}`}
                            </p> */}
                            <p className="card-title__text">{deal.dealTitle}</p>

                            <p className="card-description__text">
                              {item.description.length > 30
                                ? item.description.substring(0, 80) + "..."
                                : item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
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
            <LunchDeals
              handleClickModal={handleClickModal}
              promotions={promotions}
            />
            <DinnerDeals
              handleClickModal={handleClickModal}
              promotions={promotions}
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

const DecisionButtonModal = ({
  promotions,
  currentLocation,
  setActiveMenu,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModalClicked = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
    }, 2000);
  };

  // ---------------------------------------------------------
  const DecisionContainerModal = ({
    promotions,
    isModalOpen,
    setIsModalOpen,
    setActiveMenu,
  }) => {
    const [shopType, setShopType] = useState("");
    const [mostImportant, setMostImportant] = useState("");
    const [stageNumber, setStageNumber] = useState(1);
    const [isLoadingDecisionResult, setIsLoadingDecisionResult] =
      useState(false);
    const [decisionResults, setDecisionResults] = useState([]);

    const [openedAlternativeResult, setOpenedAlternativeResult] =
      useState(false);

    const [altResult, setAltResult] = useState([]);
    const filteredResult = promotions.filter(
      (item) => item.shopType === shopType,
    );

    const handleAlternativeResultOpen = (e, data) => {
      e.preventDefault();
      setAltResult(data);
      setOpenedAlternativeResult(true);
    };

    // -----------------------------------------------
    const StageOne = ({ shopType, setShopType }) => {
      const [isDropDownMenuOpened, setIsDropDownMenuOpened] = useState(false);

      const handleShopTypeChanged = (e) => {
        e.preventDefault();
        const { value } = e.target;

        setShopType(value);
      };

      return (
        <div>
          <h2 style={{ textAlign: "center" }}>Let us help you decide</h2>
          <br />
          <button
            className="decision-drop-down__btn"
            onClick={() => setIsDropDownMenuOpened(!isDropDownMenuOpened)}
          >
            {shopType !== "" ? (
              <>
                {shopType}{" "}
                {isDropDownMenuOpened ? <CaretUpIcon /> : <CaretDownIcon />}
              </>
            ) : (
              <>
                What are you after today?
                {isDropDownMenuOpened ? <CaretUpIcon /> : <CaretDownIcon />}
              </>
            )}
          </button>

          {isDropDownMenuOpened && (
            <div className="decision-drop-down-menu__wrapper">
              <button
                value="Cafe"
                className={`decision-drop-down-menu__btn ${shopType === "Cafe" ? "activedropdownmenu" : ""}`}
                onClick={(e) => handleShopTypeChanged(e)}
              >
                Cafe
              </button>
              <button
                value="Restaurant"
                className={`decision-drop-down-menu__btn ${shopType === "Restaurant" ? "activedropdownmenu" : ""}`}
                onClick={(e) => handleShopTypeChanged(e)}
              >
                Restaurant
              </button>
              <button
                value="Bakery"
                className={`decision-drop-down-menu__btn ${shopType === "Bakery" ? "activedropdownmenu" : ""}`}
                onClick={(e) => handleShopTypeChanged(e)}
              >
                Bakery
              </button>
            </div>
          )}

          {shopType !== "" && (
            <button
              className="decision-next__btn"
              onClick={() => setStageNumber(2)}
            >
              Next <CaretRightIcon />
            </button>
          )}
        </div>
      );
    };

    // -----------------------------------------------
    const StageTwo = ({
      shopType,
      mostImportant,
      setMostImportant,
      currentLocation,
      setDecisionResults,
      isLoadingDecisionResult,
      setIsLoadingDecisionResult,
    }) => {
      const [isDropDownMenuOpened, setIsDropDownMenuOpened] = useState(false);

      const handleShopTypeChanged = (e) => {
        e.preventDefault();
        const { value } = e.target;

        setMostImportant(value);
      };

      const handleGetResult = async (e) => {
        e.preventDefault();
        setIsLoadingDecisionResult(true);
        try {
          const response = await fetch(GetDecideRequest, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              Category: shopType,
              Preference: mostImportant,
              Latitude: currentLocation.lat,
              Longitude: currentLocation.lng,
            }),
          });

          if (!response.ok) {
            throw new Error("error in the response");
          }

          const res = await response.json();
          setDecisionResults(res);
          setTimeout(() => {
            setIsLoadingDecisionResult(false);
            setStageNumber(3);
          }, 2000);
          //console.log(res);
        } catch (err) {
          console.error(err);
          throw err;
        }
      };

      return (
        <div>
          <>
            <h2 style={{ textAlign: "center" }}>Mmm... good choice!</h2>
            <br />
            <button
              className="decision-drop-down__btn"
              onClick={() => setIsDropDownMenuOpened(!isDropDownMenuOpened)}
            >
              {mostImportant !== "" ? (
                <>
                  {mostImportant}{" "}
                  {isDropDownMenuOpened ? <CaretUpIcon /> : <CaretDownIcon />}
                </>
              ) : (
                <>
                  What is most important?
                  {isDropDownMenuOpened ? <CaretUpIcon /> : <CaretDownIcon />}
                </>
              )}
            </button>

            {isDropDownMenuOpened && (
              <div className="decision-drop-down-menu__wrapper">
                <button
                  value="Nearby"
                  className={`decision-drop-down-menu__btn ${mostImportant === "Nearby" ? "activedropdownmenu" : ""}`}
                  onClick={(e) => handleShopTypeChanged(e)}
                >
                  Nearby
                </button>
                <button
                  value="Deals"
                  className={`decision-drop-down-menu__btn ${mostImportant === "Deals" ? "activedropdownmenu" : ""}`}
                  onClick={(e) => handleShopTypeChanged(e)}
                >
                  Deals
                </button>
                <button
                  value="Aesthetic"
                  className={`decision-drop-down-menu__btn ${mostImportant === "Aesthetic" ? "activedropdownmenu" : ""}`}
                  onClick={(e) => handleShopTypeChanged(e)}
                >
                  Aesthetic
                </button>
              </div>
            )}

            {mostImportant !== "" && (
              <button
                className="decision-next__btn"
                onClick={(e) => handleGetResult(e)}
              >
                {isLoadingDecisionResult ? (
                  <CircleNotchIcon
                    className={"btn-loading__icon"}
                    color="#FA6737"
                  />
                ) : (
                  <>
                    Submit <CaretRightIcon />
                  </>
                )}
              </button>
            )}
          </>
        </div>
      );
    };

    return (
      <>
        {stageNumber === 3 ? (
          <div>
            {decisionResults.length === 0 ? (
              <>
                {openedAlternativeResult === false ? (
                  <div className="decision-result-empty-modal-container__wrapper">
                    <button
                      className="-btn-transparent"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <XIcon />
                    </button>
                    {isLoadingDecisionResult ? (
                      <div style={{ textAlign: "center" }}>
                        <CircleNotchIcon
                          className={"btn-loading__icon"}
                          color="#FA6737"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 style={{ textAlign: "center" }}>No results</h2>
                        <p style={{ textAlign: "center", fontSize: "12px" }}>
                          but here are some alternatives
                        </p>
                        {filteredResult.map((shop) => (
                          <button
                            key={shop.id}
                            className="decision-filtered-result__btn"
                            onClick={(e) =>
                              handleAlternativeResultOpen(e, shop)
                            }
                          >
                            {shop.shopName}
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                ) : (
                  <ModalContainer
                    modalData={altResult}
                    isModalOpen={isModalOpen}
                    setClickedModal={setIsModalOpen}
                    setActiveMenu={setActiveMenu}
                  />
                )}
              </>
            ) : (
              <ModalDecisionContainer
                modalData={decisionResults}
                isModalOpen={isModalOpen}
                setClickedModal={setIsModalOpen}
                setActiveMenu={setActiveMenu}
                shopType={shopType}
                mostImportant={mostImportant}
              />
            )}
          </div>
        ) : (
          <div className="decision-modal-container__wrapper">
            <button
              className="-btn-transparent"
              onClick={() => setIsModalOpen(false)}
            >
              <XIcon />
            </button>

            {stageNumber === 1 && (
              <StageOne shopType={shopType} setShopType={setShopType} />
            )}

            {stageNumber === 2 && (
              <StageTwo
                shopType={shopType}
                mostImportant={mostImportant}
                setMostImportant={setMostImportant}
                currentLocation={currentLocation}
                setDecisionResults={setDecisionResults}
                isLoadingDecisionResult={isLoadingDecisionResult}
                setIsLoadingDecisionResult={setIsLoadingDecisionResult}
              />
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {isModalOpen && <div className="overlay"></div>}
      {isModalOpen ? (
        <DecisionContainerModal
          promotions={promotions}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setActiveMenu={setActiveMenu}
        />
      ) : (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <p className="homepage-decision__text">
            <ArrowBendLeftDownIcon color="#FA6737" weight="fill" />
            not sure where to go?
            <ArrowBendRightDownIcon color="#FA6737" weight="fill" />
          </p>
          <button
            className="homepage-decision__btn"
            onClick={(e) => openModalClicked(e)}
          >
            {loading ? (
              <CircleNotchIcon className={"btn-loading__icon"} color="#fff" />
            ) : (
              "Let us help you decide"
            )}
          </button>
        </div>
      )}
    </>
  );
};

const HomePage = ({ activeMenu, setActiveMenu }) => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  const [loading, setLoading] = useState(true);
  const [filterShopType, setFilterShopType] = useState("all");
  const [searchText, setSearchText] = useState("");

  const [quickFilterData, setQuickFilterData] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [availblePromotionsNow, setAvailablePromotionsNow] = useState([]);

  //GEOLOCATION LOGIC
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      // setError("Geolocation is not supported by your browser");
      return;
    }

    const successHandler = (position) => {
      posthog.capture("location_permission", {
        status: "granted",
      });
      setIsLocationEnabled(true);
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorHandler = (err) => {
      setIsLocationEnabled(false);
      setCurrentLocation({
        lat: -36.8485,
        lng: 174.7633,
      });
      posthog.capture("location_permission", {
        status: "denied",
      });
      // setError(
      //   `Unable to retrieve your location: ${err.message}. Using default location (Auckland CBD).`,
      // );
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
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
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
      <img
        style={{ width: "50px", padding: "5px" }}
        src={HotspotsLogo}
        alt="hotspots-logo"
      />
      <br />
      <br />
      <h1 style={{ fontSize: "24px", textAlign: "center" }}>
        Welcome to Hotspots, want to spend less?
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

      {loading ? (
        <>
          <div className="main-display-page-card-loading__wrapper">
            <>
              <div className="page-card-small-loading__wrapper"></div>
            </>
            <>
              <div className="page-card-main-loading__wrapper"></div>
            </>
            <>
              <div className="page-card-main-loading__wrapper"></div>
            </>
            <>
              <div className="page-card-main-loading__wrapper"></div>
            </>
            <>
              <div className="page-card-main-loading__wrapper"></div>
            </>
          </div>
        </>
      ) : (
        <>
          <DecisionButtonModal
            promotions={promotions}
            currentLocation={currentLocation}
            setActiveMenu={setActiveMenu}
          />
          <DisplayPage
            availblePromotionsNow={availblePromotionsNow}
            promotions={promotions}
            filterShopType={filterShopType}
            searchText={searchText}
            setActiveMenu={setActiveMenu}
            quickFilterData={quickFilterData}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
