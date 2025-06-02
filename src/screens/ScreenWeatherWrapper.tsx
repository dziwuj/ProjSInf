import { type FC } from "react";
import { Outlet } from "react-router-dom";

import { useStore } from "@/store/Root.store";
import { getWeatherDescription } from "@/utils/weatherUtils";

import styles from "@styles/screens/ScreenWeatherWrapper.module.scss";

export const ScreenWeatherWrapper: FC = () => {
  const { weather } = useStore().weather;
  const weatherType = getWeatherDescription(
    weather.length ? weather[0].weatherCode : -1,
  );
  const currentTemperature = weather.length
    ? `${weather[0].temperature_2m}\u00b0`
    : "";
  return (
    <>
      <div className={styles.weatherWrapper}>
        {weather.length !== 0 && (
          <>
            <span className={styles.weatherWrapperTag}>{weatherType}</span>
            <span className={styles.weatherWrapperTag}>
              {currentTemperature}
            </span>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};
