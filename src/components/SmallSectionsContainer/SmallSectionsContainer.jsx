import DealsNearYouContainer from "./DealsNearYouContainer/DealsNearYouContainer";
import HotDealsContainer from "./HotDealsContainer/HotDealsContainer";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";

import "../../styles/smallsectionstyles.css";
import { Link } from "react-router-dom";
const SmallSectionsContainer = ({
  isLocationEnabled,
  currentLocation,
  setShopClicked,
  setFilteredLocation,
  setSelectedLocation,
  setClearFilters,
}) => {
  return (
    <div className="small-sections-container__wrapper">
      <Link to="/" className="map-back-icon">
        <ArrowCircleLeftIcon weight="fill" size={34} />
      </Link>
      <div className="small-sections__wrapper">
        <DealsNearYouContainer
          isLocationEnabled={isLocationEnabled}
          currentLocation={currentLocation}
          setShopClicked={setShopClicked}
          setFilteredLocation={setFilteredLocation}
          setSelectedLocation={setSelectedLocation}
          setClearFilters={setClearFilters}
        />
        <HotDealsContainer
          setClearFilters={setClearFilters}
          setShopClicked={setShopClicked}
        />
      </div>
    </div>
  );
};

export default SmallSectionsContainer;
