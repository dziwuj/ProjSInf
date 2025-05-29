import { type FC } from "react";

import { MusicDisplay, OutfitDisplay, WeatherDisplay } from "@/components";
import { useStore } from "@/store/Root.store";
import { getSimplifiedWeatherDescription } from "@/utils/weatherUtils";

import styles from "@styles/screens/Home.module.scss";

export const Home: FC = () => {
  const { weather } = useStore().weather;
  const simplifiedWeatherCode = getSimplifiedWeatherDescription(
    weather.length ? weather[0].weatherCode : -1,
  );

  return (
    <div className={styles.homeContainer}>
      <WeatherDisplay />
      <MusicDisplay weatherType={simplifiedWeatherCode} />
      <OutfitDisplay weatherType={simplifiedWeatherCode} />
      <span className={styles.homeTitle}>Outfit suggestion</span>
    </div>
  );
};
