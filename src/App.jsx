import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppMapContainer from "./components/AppMapContainer/AppMapContainer";
import Home from "./components/Home/Home";
import PrivacyPolicyContainer from "./components/PrivacyPolicyContainer/PrivacyPolicyContainer";

import "./App.css";
function App() {
  posthog.capture("app_open");
  return (
    <div className="app-container__wrapper">
      <Routes>
        <Route path="/" element={<AppMapContainer />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyContainer />} />
      </Routes>
    </div>
  );
}

export default App;
