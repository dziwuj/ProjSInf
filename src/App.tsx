import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { PWAToasts, WeatherLoader } from "@/components";
import {
  HomeScreen,
  NotFoundScreen,
  PreferencesScreen,
  ScreenNavigationWrapper,
  ScreenWeatherWrapper,
  SettingsScreen,
  WardrobeScreen,
} from "@/screens";

import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ScreenNavigationWrapper />}>
          <Route index element={<HomeScreen />} />
          <Route element={<ScreenWeatherWrapper />}>
            <Route path="/wardrobe" element={<WardrobeScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/preferences" element={<PreferencesScreen />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
      <PWAToasts />
      <WeatherLoader />
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
