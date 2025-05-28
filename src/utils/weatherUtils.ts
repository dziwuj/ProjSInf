import StormIcon from "@assets/icons/cloud-bolt-solid.svg?react";
import DrizzleIcon from "@assets/icons/cloud-rain-solid.svg?react";
import RainIcon from "@assets/icons/cloud-showers-heavy-solid.svg?react";
import HeavyRainIcon from "@assets/icons/cloud-showers-water-solid.svg?react"; // Assuming a heavy rain icon is used for showers
import CloudIcon from "@assets/icons/cloud-solid.svg?react";
import UnknownIcon from "@assets/icons/question-solid.svg?react";
import FogIcon from "@assets/icons/smog-solid.svg?react";
import SnowIcon from "@assets/icons/snowflake-solid.svg?react";
import SunIcon from "@assets/icons/sun-solid.svg?react";

import type { IconComponent, WeatherTypes } from "@/types/types";

const getWeatherDescription = (code: number): WeatherTypes => {
  switch (code) {
    case 0:
      return "Clear";
    case 1:
    case 2:
    case 3:
      return "Cloudy";
    case 45:
    case 48:
      return "Fog";
    case 51:
    case 53:
    case 55:
      return "Drizzle";
    case 61:
    case 63:
    case 65:
      return "Rain";
    case 66:
    case 67:
      return "Freezing Rain";
    case 71:
    case 73:
    case 75:
    case 77:
      return "Snow";
    case 80:
    case 81:
    case 82:
      return "Showers";
    case 95:
      return "Thunderstorm";
    case 96:
    case 99:
      return "Thunderstorm with Hail";
    default:
      return "Unknown";
  }
};
type SimpleWeatherTypes = "Clear" | "Cloudy" | "Rain" | "Unknown";

const getSimplifiedWeatherDescription = (code: number): SimpleWeatherTypes => {
  switch (code) {
    case 0:
      return "Clear";
    case 1:
    case 2:
    case 3:
    case 45:
    case 48:
      return "Cloudy";
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 71:
    case 73:
    case 75:
    case 77:
    case 80:
    case 81:
    case 82:
    case 95:
    case 96:
    case 99:
      return "Rain";
    default:
      return "Unknown";
  }
};

const getWeatherIcon = (code: number | undefined): IconComponent => {
  switch (code) {
    case 0:
      return SunIcon;
    case 1:
    case 2:
    case 3:
      return CloudIcon;
    case 45:
    case 48:
      return FogIcon;
    case 51:
    case 53:
    case 55:
      return DrizzleIcon;
    case 61:
    case 63:
    case 65:
      return RainIcon;
    case 66:
    case 67:
      return RainIcon; // Freezing rain is often represented similarly to rain
    case 71:
    case 73:
    case 75:
    case 77:
      return SnowIcon;
    case 80:
    case 81:
    case 82:
      return HeavyRainIcon; // Assuming a heavy rain icon is used for showers
    case 95:
      return StormIcon;
    case 96:
    case 99:
      return StormIcon;
    default:
      return UnknownIcon; // Default icon for unknown weather
  }
};

export {
  getSimplifiedWeatherDescription,
  getWeatherDescription,
  getWeatherIcon,
};
