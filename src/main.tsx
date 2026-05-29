import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import ComingSoonPage from "./pages/ComingSoonPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ComingSoonPage />
      {/* <App /> */}
    </HelmetProvider>
  </StrictMode>
);
