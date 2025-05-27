import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { Navigation } from "@/components/Navigation";

export const ScreenWrapper: FC = () => {
  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
};
