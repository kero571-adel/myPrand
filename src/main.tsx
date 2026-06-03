import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { clarity } from "react-microsoft-clarity";
const CLARITY_PROJECT_ID = "t4xd2er7n6";

clarity.init(CLARITY_PROJECT_ID);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
