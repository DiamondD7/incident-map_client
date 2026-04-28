import DealsNearYouContainer from "./DealsNearYouContainer/DealsNearYouContainer";
import NewDealsContainer from "./NewDealsContainer/NewDealsContainer";

import "../../styles/smallsectionstyles.css";
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
      <DealsNearYouContainer
        isLocationEnabled={isLocationEnabled}
        currentLocation={currentLocation}
        setShopClicked={setShopClicked}
        setFilteredLocation={setFilteredLocation}
        setSelectedLocation={setSelectedLocation}
        setClearFilters={setClearFilters}
      />
      <NewDealsContainer
        setClearFilters={setClearFilters}
        setShopClicked={setShopClicked}
      />
    </div>
  );
};

export default SmallSectionsContainer;
