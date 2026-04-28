import DealsNearYouContainer from "./DealsNearYouContainer/DealsNearYouContainer";
import NewDealsContainer from "./NewDealsContainer/NewDealsContainer";

const SmallSectionsContainer = ({
  isLocationEnabled,
  currentLocation,
  setShopClicked,
  setFilteredLocation,
  setSelectedLocation,
  setClearFilters,
}) => {
  return (
    <div>
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
