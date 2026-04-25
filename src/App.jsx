import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppMapContainer from "./components/AppMapContainer/AppMapContainer";
import Home from "./components/Home/Home";
import PrivacyPolicyContainer from "./components/PrivacyPolicyContainer/PrivacyPolicyContainer";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";

import "./App.css";
function App() {
  posthog.capture("app_open");
  return (
    <div className="app-container__wrapper">
      <Routes>
        <Route path="/" element={<AppMapContainer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyContainer />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </div>
  );
}

export default App;
