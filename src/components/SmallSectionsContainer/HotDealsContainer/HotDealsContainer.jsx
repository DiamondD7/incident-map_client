import "../../../styles/hotdealscontainerstyles.css";
const HotDealsContainer = ({ setClearFilters, setShopClicked }) => {
  return (
    <div className="new-deals-container__wrapper">
      <h3 className="small-section__header">🔥Auckland's hot deals</h3>
      <ul className="new-deals__ul">
        <li>
          <button
            onClick={() => {
              setClearFilters(true);
              setShopClicked({
                lat: -36.848389897518366,
                lng: 174.83226137840128,
              });
            }}
          >
            Mission Bay Cafe - 30% OFF all food
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setClearFilters(true);
              setShopClicked({
                lat: -36.894333906667605,
                lng: 174.93031112883548,
              });
            }}
          >
            Howick Village Cafe - 50% OFF all coffee/tea
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setClearFilters(true);
              setShopClicked({
                lat: -36.850011443929311,
                lng: 174.76599652944805,
              });
            }}
          >
            Cocomo - 30% OFF drinks
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setClearFilters(true);
              setShopClicked({
                lat: -36.879961681773082,
                lng: 174.74964320000092,
              });
            }}
          >
            Mr Hao - Bottomless dumplings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HotDealsContainer;
