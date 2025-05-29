import { StrictMode } from "react";
import PullToRefresh from "pulltorefreshjs";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import "@styles/index.scss";

const standalone = window.matchMedia("(display-mode: standalone)").matches;
if (standalone && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  PullToRefresh.init({
    mainElement: "body",
    instructionsPullToRefresh: "Pull down to refresh",
    instructionsReleaseToRefresh: "Release to refresh",
    instructionsRefreshing: "Refreshing...",
    onRefresh() {
      window.location.reload();
    },
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
