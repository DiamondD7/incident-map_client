import { useEffect, useState } from "react";

import {
  BreadIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CoffeeIcon,
  FireIcon,
  ForkKnifeIcon,
  ImagesIcon,
  SmileySadIcon,
  XIcon,
} from "@phosphor-icons/react";
import { MapTrifoldIcon } from "@phosphor-icons/react/dist/ssr";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../assets/js/api-auth";

import "../../styles/modalcontainerstyles.css";
const ModalContainer = ({
  modalData,
  clickedModal,
  setClickedModal,
  setActiveMenu,
}) => {
  const navigate = useNavigate();
  //this is for the indexing so that i can keep changing the pics if there are more pic
  const [currentImage, setCurrentImage] = useState(0);

  const handleImagesClicked = (e, current) => {
    e.preventDefault();

    if (current === -1) {
      if (currentImage === 0) {
        setCurrentImage(modalData.images.length - 1);
        return;
      }
      setCurrentImage(currentImage - 1);
    }

    if (current === +1) {
      if (currentImage === modalData.images.length - 1) {
        setCurrentImage(0);
        return;
      }

      setCurrentImage(currentImage + 1);
    }
  };

  //handles the location change when user clicks the show on map button
  const handleOpenMap = (e) => {
    e.preventDefault();
    setActiveMenu("map"); //this just shows the user the active menu on the nav bar
    navigate(
      `/map?lonParams=${modalData.longitude}&latParams=${modalData.latitude}`,
    );
  };

  return (
    <div>
      <div className="overlay"></div>
      <div className="modal-container__wrapper">
        {modalData.images.length > 1 && (
          <div className="modal-image-carets__wrapper">
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

        {modalData.images.length > 0 ? (
          <img
            className="modal__img"
            src={`${API_URI}${modalData.images[currentImage].imageUrl}`}
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
            {modalData.shopType === "Restaurant" ? (
              <ForkKnifeIcon color="#FA6737" weight="fill" />
            ) : modalData.shopType === "Cafe" ? (
              <CoffeeIcon color="#FA6737" weight="fill" />
            ) : (
              <BreadIcon color="#FA6737" weight="fill" />
            )}
            <h4 className="modal-shopname__h4">{modalData.shopName}</h4>
          </div>
          <p className="modal-address__p">{modalData.address}</p>
          <p className="modal-description__p">{modalData.description}</p>
        </div>
        <div className="modal-deals-container__wrapper">
          <div className="-display-flex-align-items-center -gap-5">
            <FireIcon weight="fill" color="#FA6737" />
            <h4>Current Deals</h4>
          </div>
          <div className="modal-deals__wrapper">
            {modalData.deals.length > 0 ? (
              <>
                {modalData.deals.map((deal) => (
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
                  <SmileySadIcon size={35} weight="fill" color="#fff" />
                  <p className="deals-nothing__text">
                    No deals yet, comeback later
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
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

export default ModalContainer;
