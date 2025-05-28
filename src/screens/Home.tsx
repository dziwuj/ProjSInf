import { type FC, useEffect } from "react";

import { MusicDisplay, OutfitDisplay, WeatherDisplay } from "@/components";
import { useStore } from "@/store/Root.store";
import { getWeatherDescription } from "@/utils/weatherUtils";

import styles from "@styles/screens/Home.module.scss";

export const Home: FC = () => {
  // const { count, inc } = useStore();
  const { weather } = useStore().weather;

  useEffect(() => {
    if (!weather.length) return;
    console.log("Weather data:", weather);
    console.log(getWeatherDescription(weather[0].weatherCode));
  }, [weather]);
  return (
    <div className={styles.homeContainer}>
      <WeatherDisplay />
      <MusicDisplay />
      <OutfitDisplay />
    </div>
  );
};
