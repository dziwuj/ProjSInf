import { type ToastOptions } from "react-toastify";

interface SWNotificationDataType {
  title: string;
  buttonText: string;
  onConfirm?: () => void;
}

interface SWNotificationType extends ToastOptions {
  data: SWNotificationDataType;
}

type RootStore = {
  count: number;
  inc: () => void;
};

export type { RootStore, SWNotificationDataType, SWNotificationType };
