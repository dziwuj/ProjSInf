import { useEffect } from "react";
import { useStore } from "@store/Root.store";

export const WeatherLoader = () => {
  const fetchWeather = useStore().weather.fetchWeather;
  const errorMessage = useStore().weather.errorMessage;

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      err => {
        console.error("Geolocation error:", err);
      },
    );
  }, [fetchWeather]);

  useEffect(() => {
    if (errorMessage) {
      console.error(errorMessage);
    }
  }, [errorMessage]);

  return null;
};
