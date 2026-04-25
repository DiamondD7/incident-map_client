import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import posthog from "./assets/posthog/posthog.js";
import App from "./App.jsx";

import "./styles/responsiveness.css";
import "./index.css";
window.posthog = posthog;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
