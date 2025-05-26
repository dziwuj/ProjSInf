import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeScreen } from "@/screens";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
