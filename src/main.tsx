import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@styles/index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import { type SWNotificationType } from "@/types/types.ts";

let SWNotification: SWNotificationType | undefined;

registerSW({
  onNeedRefresh() {
    SWNotification = {
      type: "info",
      data: {
        title: "Update available!",
        buttonText: "Update",

        onConfirm: () => {
          location.reload();
        },
      },
    };
  },
  onOfflineReady() {
    SWNotification = {
      type: "info",
      data: {
        title: "App is ready to work offline",
        buttonText: "Update",
      },
    };
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App SWNotification={SWNotification} />
    </BrowserRouter>
  </StrictMode>,
);
