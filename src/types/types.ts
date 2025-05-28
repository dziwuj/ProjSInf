import type { FC, SVGProps } from "react";
import { type ToastOptions } from "react-toastify";

interface SWNotificationDataType {
  title: string;
  buttonText: string;
  onConfirm?: () => void;
}

interface SWNotificationType extends ToastOptions {
  data: SWNotificationDataType;
}

type WeatherTypes =
  | "Clear"
  | "Cloudy"
  | "Fog"
  | "Drizzle"
  | "Rain"
  | "Freezing Rain"
  | "Snow"
  | "Showers"
  | "Thunderstorm"
  | "Thunderstorm with Hail"
  | "Unknown";

type IconComponent = FC<SVGProps<SVGSVGElement>>;

export type {
  IconComponent,
  SWNotificationDataType,
  SWNotificationType,
  WeatherTypes,
};
