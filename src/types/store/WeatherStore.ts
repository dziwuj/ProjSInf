interface DailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
  weathercode: number[];
}

interface WeatherStore {
  weather: DailyWeather | null;
  loading: boolean;
  errorMessage: string | null;
  fetchWeather: (lat: number, lon: number) => void;
}

export type { DailyWeather, WeatherStore };
