import { useEffect, useState } from "react";
import {
  BreadIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CoffeeIcon,
  FireIcon,
  ForkKnifeIcon,
  ImagesIcon,
  MedalIcon,
  SmileySadIcon,
  TrophyIcon,
  XIcon,
} from "@phosphor-icons/react";
import { MapTrifoldIcon } from "@phosphor-icons/react/dist/ssr";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../assets/js/api-auth";
import { Helmet } from "react-helmet-async";

import "../../styles/modalcontainerstyles.css";
const ModalDecisionContainer = ({
  modalData,
  clickedModal,
  setClickedModal,
  setActiveMenu,
  shopType,
  mostImportant,
}) => {
  const navigate = useNavigate();
  //this is for the indexing so that i can keep changing the pics if there are more pic
  const [currentImage, setCurrentImage] = useState(0);
  const [currentDeal, setCurrentDeal] = useState(modalData[0]);

  const [topPick, setTopPick] = useState(modalData[0]);

  const handleImagesClicked = (e, current) => {
    e.preventDefault();

    if (current === -1) {
      if (currentImage === 0) {
        setCurrentImage(topPick.place.images.length - 1);
        return;
      }
      setCurrentImage(currentImage - 1);
    }

    if (current === +1) {
      if (currentImage === topPick.place.images.length - 1) {
        setCurrentImage(0);
        return;
      }

      setCurrentImage(currentImage + 1);
    }
  };

  const handleDealClicked = (e, nextDeal) => {
    e.preventDefault();
    setCurrentDeal(modalData[nextDeal + 1]);
  };

  //handles the location change when user clicks the show on map button
  const handleOpenMap = (e) => {
    e.preventDefault();
    setActiveMenu("map"); //this just shows the user the active menu on the nav bar
    navigate(
      `/map?lonParams=${currentDeal.place.longitude}&latParams=${currentDeal.place.latitude}`,
    );
  };

  return (
    <div>
      <Helmet>
        <title>Hotspots NZ - {currentDeal.place.shopName} </title>
        <meta name="description" content="Hotspots NZ food places" />
      </Helmet>

      <div className="overlay"></div>
      <div className="modal-decision-result-container__wrapper">
        <h3 style={{ textAlign: "center" }}>Top Pick(s)</h3>

        <div>
          <ul className="decision-ul-based__ul">
            <li>
              Category: <strong>{shopType}</strong>
            </li>
            <li>
              Preferred: <strong>{mostImportant}</strong>
            </li>
          </ul>
        </div>
        {currentDeal.place.images.length > 1 && (
          <div className="modal-image-decisions-carets__wrapper">
            <button
              className="modal-image-caretleft__btn"
              onClick={(e) => handleImagesClicked(e, -1)}
            >
              <CaretLeftIcon weight="fill" color="#FA6737" />
            </button>

            <button
              className="modal-image-caretRight__btn"
              onClick={(e) => handleImagesClicked(e, +1)}
            >
              <CaretRightIcon weight="fill" color="#FA6737" />
            </button>
          </div>
        )}

        {currentDeal.place.images.length > 0 ? (
          <img
            className="modal__img"
            src={currentDeal.place.images[currentImage].imageUrl}
            alt="Thumbnail"
          />
        ) : (
          <div className="modal-images-empty__wrapper">
            <div style={{ textAlign: "center" }}>
              <ImagesIcon size={30} weight="fill" />
              <p style={{ fontSize: "12px" }}>Images unavailable</p>
            </div>
          </div>
        )}

        <div>
          <div className="-display-flex-align-items-center -gap-5">
            {currentDeal.place.shopType === "Restaurant" ? (
              <ForkKnifeIcon color="#FA6737" weight="fill" />
            ) : currentDeal.place.shopType === "Cafe" ? (
              <CoffeeIcon color="#FA6737" weight="fill" />
            ) : (
              <BreadIcon color="#FA6737" weight="fill" />
            )}
            <h4 className="modal-shopname__h4">{currentDeal.place.shopName}</h4>
          </div>
          <p className="modal-address__p">{currentDeal.place.address}</p>
          <p className="modal-description__p">
            {currentDeal.place.description}
          </p>
        </div>
        <div className="modal-deals-container__wrapper">
          <div className="-display-flex-align-items-center -gap-5">
            <FireIcon weight="fill" color="#FA6737" />
            <h4>Current Deals</h4>
          </div>
          <div className="modal-deals__wrapper">
            {currentDeal.place.deals.length > 0 ? (
              <>
                {currentDeal.place.deals.map((deal) => (
                  <div className="modal-eachdeal__wrapper" key={deal.id}>
                    <h6 className="modal-deal-title__h6">{deal.dealTitle}</h6>
                    <p className="modal-deal-description__p">
                      {deal.dealDescription}
                    </p>

                    <div className="modal-deal-dates__wrapper">
                      <p>
                        {deal.dealStart !== null
                          ? `Start: ${new Date(deal.dealStart).toLocaleDateString("en-nz")}`
                          : ""}
                      </p>

                      <p>
                        {deal.dealEnd !== null
                          ? `End: ${new Date(deal.dealEnd).toLocaleDateString("en-nz")}`
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="deals-nothing__wrapper">
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <SmileySadIcon size={25} weight="fill" color="#fff" />
                  <p className="deals-nothing__text">
                    No deals yet, comeback later
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {modalData.length > 1 && (
          <>
            <div className="other-picks__wrapper">
              <h5 className="-display-flex-align-items-center -gap-5">
                <TrophyIcon weight="fill" color="#FA6737" /> Top Pick
              </h5>
              <div className="other-picks__btns">
                <button
                  className="-btn-transparent"
                  key={topPick.place.id}
                  onClick={() => setCurrentDeal(modalData[0])}
                >
                  {topPick.place.images.length > 0 ? (
                    <img
                      style={{
                        borderRadius: "5px",
                        height: "50px",
                        width: "100px",
                        objectFit: "cover",
                      }}
                      src={topPick.place.images[0].imageUrl}
                      alt="shopImage"
                    />
                  ) : (
                    <div className="modal-otherpicks-images-empty__wrapper">
                      <div>
                        <ImagesIcon weight="fill" />
                      </div>
                    </div>
                  )}
                  <p style={{ fontSize: "10px" }}>
                    {topPick.place.shopName.length > 10
                      ? `${topPick.place.shopName.slice(0, 17)}...`
                      : topPick.place.shopName}
                  </p>
                </button>
              </div>
            </div>
            <div className="other-picks__wrapper">
              <h5 className="-display-flex-align-items-center -gap-5">
                <MedalIcon weight="fill" color="#FA6737" /> Other Picks
              </h5>
              <div className="other-picks__btns">
                {modalData.slice(1).map((shop, index) => (
                  <button
                    className="-btn-transparent"
                    key={shop.place.id}
                    onClick={(e) => handleDealClicked(e, index)}
                  >
                    {shop.place.images.length > 0 ? (
                      <img
                        style={{
                          borderRadius: "5px",
                          height: "50px",
                          width: "100px",
                          objectFit: "cover",
                        }}
                        src={shop.place.images[0].imageUrl}
                        alt="shopImage"
                      />
                    ) : (
                      <div className="modal-otherpicks-images-empty__wrapper">
                        <div>
                          <ImagesIcon weight="fill" />
                        </div>
                      </div>
                    )}
                    <p style={{ fontSize: "10px" }}>
                      {shop.place.shopName.length > 10
                        ? `${shop.place.shopName.slice(0, 17)}...`
                        : shop.place.shopName}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="modal-cta__btns">
        <button
          className="modal-close__btn"
          onClick={() => setClickedModal(false)}
        >
          <XIcon color="#fff" />
          Close
        </button>
        <button
          onClick={(e) => handleOpenMap(e)}
          className="modal-showonMap__btn"
        >
          <MapTrifoldIcon weight="fill" color="#fff" />
          Show on Map
        </button>
      </div>
    </div>
  );
};

export default ModalDecisionContainer;
