import { useWeatherStore } from "@store/Weather.store"; // adjust path as needed

import { type RootStore } from "@/types/store/RootStore";

export const useStore = (): RootStore => {
  return {
    weather: useWeatherStore(),
  };
};
