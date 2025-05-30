import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { Navigation } from "@/components/Navigation";

export const ScreenNavigationWrapper: FC = () => {
  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
};
