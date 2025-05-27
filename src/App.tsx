import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";

import { PWAToasts } from "@/components";
import { HomeScreen } from "@/screens";

import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="*" element={<h1>404 - Page not found</h1>} />
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
