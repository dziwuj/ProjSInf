import { create } from "zustand";

import type { DailyWeather, WeatherStore } from "@/types/store/WeatherStore";

export const useWeatherStore = create<WeatherStore>(set => ({
  weather: [],
  loading: false,
  errorMessage: null,

  fetchWeather: async (lat: number, lon: number) => {
    set({ loading: true, errorMessage: null });
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,windspeed_10m,weathercode&timezone=auto`,
      );
      const data = await res.json();

      // Take next 24 hours from now
      const now = new Date();
      const next24hData: DailyWeather[] = [];

      for (let i = 0; i < data.hourly.time.length; i++) {
        const entryTime = new Date(data.hourly.time[i]);
        const hoursDiff =
          (entryTime.getTime() - now.getTime()) / (1000 * 60 * 60);
        if (hoursDiff >= 0 && hoursDiff <= 24) {
          next24hData.push({
            time: data.hourly.time[i],
            temperature_2m: data.hourly.temperature_2m[i],
            precipitation: data.hourly.precipitation[i],
            windSpeed_10m: data.hourly.windspeed_10m[i],
            weatherCode: data.hourly.weathercode[i],
          });
        }
      }
      set({ weather: next24hData, loading: false });
    } catch (error) {
      set({
        errorMessage: `Failed to fetch weather. Error: ${error}`,
        loading: false,
      });
    }
  },
}));
