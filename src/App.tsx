import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { PWAToasts } from "@/components";
import {
  HomeScreen,
  NotFoundScreen,
  PreferencesScreen,
  ScreenWrapper,
  SettingsScreen,
  WardrobeScreen,
} from "@/screens";

import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ScreenWrapper />}>
          <Route index element={<HomeScreen />} />
          <Route path="/wardrobe" element={<WardrobeScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/preferences" element={<PreferencesScreen />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
      <PWAToasts />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
