import type { ClothesStore } from "./ClothesStore";
import type { WeatherStore } from "./WeatherStore";

type RootStore = {
  weather: WeatherStore;
  clothes: ClothesStore;
};

export type { RootStore };
