import { useClothesStore } from "@store/Clothes.store";
import { useWeatherStore } from "@store/Weather.store";

import { type RootStore } from "@/types/store/RootStore";

export const useStore = (): RootStore => {
  return {
    weather: useWeatherStore(),
    clothes: useClothesStore(),
  };
};
