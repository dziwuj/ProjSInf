import { useEffect, type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "@/screens";
import type { SWNotificationType } from "./types/types";
import { Bounce, toast, ToastContainer } from "react-toastify";
import PWABadge from "./PWABadge";
import { InstallationPrompt, ReloadToast } from "./components";

interface AppProps {
  SWNotification?: SWNotificationType;
}

const App: FC<AppProps> = ({ SWNotification }) => {
  const handleInstall = () => {
    console.log("App installation process completed.");
  };

  useEffect(() => {
    if (SWNotification) {
      if (!SWNotification.data.onConfirm)
        toast(SWNotification.data.title, SWNotification);
      else toast(<ReloadToast data={SWNotification.data} />, SWNotification);
    }
  }, [SWNotification]);

  useEffect(() => {
    const handleOnline = () => {
      const onlineToast: SWNotificationType = {
        type: "success",
        data: {
          title: "You are back online!",
          buttonText: "Reload",
          onConfirm: () => {
            location.reload();
          },
        },
      };
      toast(<ReloadToast data={onlineToast.data} />, onlineToast);
    };
    const handleOffline = () => {
      toast("You are now offline!", {
        type: "warning",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
      <PWABadge />
      <ToastContainer
        position="bottom-left"
        autoClose={false}
        newestOnTop
        theme="dark"
        transition={Bounce}
      />
      <InstallationPrompt onInstall={handleInstall} />
    </>
  );
};

export default App;
