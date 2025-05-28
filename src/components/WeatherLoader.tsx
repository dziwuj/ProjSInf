import { useEffect } from "react";
import { useStore } from "@store/Root.store";

export const WeatherLoader = () => {
  const fetchWeather = useStore().weather.fetchWeather;
  const errorMessage = useStore().weather.errorMessage;

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error(
        "Geolocation not supported, fetching default weather data.",
      );
      fetchWeather(50.049683, 19.944544); // weather for Krakow, Poland
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
