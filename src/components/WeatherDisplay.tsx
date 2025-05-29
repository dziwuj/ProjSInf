import { type FC, useMemo } from "react";

import { useStore } from "@/store/Root.store";
import { getWeatherDescription, getWeatherIcon } from "@/utils/weatherUtils";

import { WeatherLoader } from "./WeatherLoader";

import styles from "@styles/components/WeatherDisplay.module.scss";

export const WeatherDisplay: FC = () => {
  const { weather, loading } = useStore().weather;
  const weatherCode = weather.length ? weather[0].weatherCode : -1;

  const WeatherIcon = useMemo(() => {
    return getWeatherIcon(weatherCode);
  }, [weatherCode]);

  return (
    <div className={styles.weather}>
      <WeatherLoader />
      {loading ? (
        <h1>Loading weather data...</h1>
      ) : (
        <>
          {weather.length ? (
            <div className={styles.weatherContainer}>
              <div className={styles.weatherCurrent}>
                <div className={styles.weatherCurrentText}>
                  <span className={styles.weatherCurrentTemp}>
                    {`${weather[0].temperature_2m}\u00b0`}
                  </span>
                  <span className={styles.weatherCurrentState}>
                    {getWeatherDescription(weather[0].weatherCode)}
                  </span>
                </div>
                <WeatherIcon className={styles.weatherCurrentIcon} />
              </div>
              <div className={styles.weatherForecast} tabIndex={0}>
                {weather.map((item, index) => (
                  <div key={index} className={styles.weatherForecastItem}>
                    <span className={styles.weatherForecastItemTime}>
                      {`${item.time.slice(11, 16)}`}
                    </span>
                    <span className={styles.weatherForecastItemTemp}>
                      {`${item.temperature_2m}\u00b0`}
                    </span>
                    {(() => {
                      const Icon = getWeatherIcon(item.weatherCode);
                      return (
                        <Icon className={styles.weatherForecastItemIcon} />
                      );
                    })()}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1>No weather data available.</h1>
          )}
        </>
      )}
    </div>
  );
};
