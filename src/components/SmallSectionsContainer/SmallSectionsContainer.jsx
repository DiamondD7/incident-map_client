import DealsNearYouContainer from "./DealsNearYouContainer/DealsNearYouContainer";
import HotDealsContainer from "./HotDealsContainer/HotDealsContainer";
import { ArrowCircleLeftIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import AestheticContainer from "./AestheticContainer/AestheticContainer";
import { Helmet } from "react-helmet-async";

import "../../styles/smallsectionstyles.css";
const SmallSectionsContainer = ({
  isLocationEnabled,
  currentLocation,
  setShopClicked,
  setFilteredLocation,
  setSelectedLocation,
  setClearFilters,
  setIsSearchClicked,
}) => {
  return (
    <div className="small-sections-container__wrapper">
      <Helmet>
        <meta
          name="description"
          content="Hotspots NZ Cheap Food Deals Near Me"
        />
      </Helmet>

      <DealsNearYouContainer
        isLocationEnabled={isLocationEnabled}
        currentLocation={currentLocation}
        setShopClicked={setShopClicked}
        setFilteredLocation={setFilteredLocation}
        setSelectedLocation={setSelectedLocation}
        setClearFilters={setClearFilters}
        setIsSearchClicked={setIsSearchClicked}
      />
      <HotDealsContainer
        setClearFilters={setClearFilters}
        setShopClicked={setShopClicked}
        setIsSearchClicked={setIsSearchClicked}
      />

      <AestheticContainer
        setClearFilters={setClearFilters}
        setShopClicked={setShopClicked}
        setIsSearchClicked={setIsSearchClicked}
      />
    </div>
  );
};

export default SmallSectionsContainer;
