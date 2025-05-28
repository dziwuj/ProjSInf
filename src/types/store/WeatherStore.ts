interface DailyWeather {
  time: string;
  temperature_2m: number;
  precipitation: number;
  windSpeed_10m: number;
  weatherCode: number;
}

interface WeatherStore {
  weather: DailyWeather[] | [];
  loading: boolean;
  errorMessage: string | null;
  fetchWeather: (lat: number, lon: number) => void;
}

export type { DailyWeather, WeatherStore };
