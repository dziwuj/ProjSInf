import { create } from "zustand";

import type { WeatherStore } from "@/types/store/WeatherStore";

export const useWeatherStore = create<WeatherStore>(set => ({
  weather: null,
  loading: false,
  errorMessage: null,

  fetchWeather: async (lat, lon) => {
    set({ loading: true, errorMessage: null });
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto`,
      );
      const data = await res.json();
      set({ weather: data.daily, loading: false });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch weather. Error: ${error}`,
        loading: false,
      });
    }
  },
}));
