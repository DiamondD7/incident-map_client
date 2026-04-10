import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppMapContainer from "./components/AppMapContainer/AppMapContainer";
import Home from "./components/Home/Home";

import "./App.css";
function App() {
  return (
    <div className="app-container__wrapper">
      <Routes>
        <Route path="/" element={<AppMapContainer />} />
      </Routes>
    </div>
  );
}

export default App;
