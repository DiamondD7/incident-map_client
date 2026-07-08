import { useEffect, useState } from "react";

import {
  CaretLeftIcon,
  CaretRightIcon,
  CoffeeIcon,
  FireIcon,
  XIcon,
} from "@phosphor-icons/react";
import { MapTrifoldIcon } from "@phosphor-icons/react/dist/ssr";

import "../../styles/modalcontainerstyles.css";
const ModalContainer = ({ modalData, clickedModal, setClickedModal }) => {
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

        <img
          className="modal__img"
          src={`https://localhost:7207${modalData.images[currentImage].imageUrl}`}
          alt="Thumbnail"
        />

        <div>
          <div className="-display-flex-align-items-center -gap-5">
            <CoffeeIcon weight="fill" color="#FA6737" />
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
            <div className="modal-eachdeal__wrapper">
              <h6 className="modal-deal-title__h6">{modalData.title}</h6>
              <p className="modal-deal-description__p">
                {modalData.description}
              </p>

              <div className="modal-deal-dates__wrapper">
                <p>9th June - 15th June</p>
              </div>
            </div>
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
        <button className="modal-showonMap__btn">
          <MapTrifoldIcon weight="fill" color="#fff" />
          Show on Map
        </button>
      </div>
    </div>
  );
};

export default ModalContainer;
