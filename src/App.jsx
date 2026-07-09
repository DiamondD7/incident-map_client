import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppMapContainer from "./components/AppMapContainer/AppMapContainer";
import Home from "./components/Home/Home";
import PrivacyPolicyContainer from "./components/PrivacyPolicyContainer/PrivacyPolicyContainer";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import HomeMapStart from "./components/Home/HomeMapStart/HomeMapStart";

import HomePage from "./components/Home/HomeAppStart/homepage/Homepage";
import HomeAppStart from "./components/Home/HomeAppStart/HomeAppStart";
import DiscoverFeed from "./components/Home/HomeAppStart/discoverfeed/DiscoverFeed";

import SavedItems from "./components/Home/HomeAppStart/saveditems/SavedItems";
import "./App.css";
function App() {
  posthog.capture("app_open");

  // this is only for mobile screens
  const [activeMenu, setActiveMenu] = useState("/");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 450);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container__wrapper">
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}

        {isMobile ? (
          <Route
            path="/"
            element={
              <HomeAppStart
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            }
          >
            <Route
              index
              element={
                <HomePage
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />
              }
            />
            <Route path="discoverFeed" element={<DiscoverFeed />} />
            <Route path="map" element={<HomeMapStart />} />
            <Route path="savedItems" element={<SavedItems />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="map" element={<HomeMapStart />} />
          </>
        )}
        {/* <Route path="/app" element={<HomeAppStart />} /> */}
        <Route path="/privacy-policy" element={<PrivacyPolicyContainer />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </div>
  );
}

export default App;
