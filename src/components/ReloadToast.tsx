import { type FC } from "react";

import { type SWNotificationDataType } from "@/types/types";

import styles from "@styles/components/ReloadToast.module.scss";

interface ReloadToastProps {
  data: SWNotificationDataType;
}

export const ReloadToast: FC<ReloadToastProps> = ({ data }) => {
  return (
    <div className={styles.reloadToast}>
      <div className={styles.reloadToastText}>
        <h2 className={styles.reloadToastTitle}>{data.title}</h2>
      </div>
      <button
        className={styles.reloadToastButton}
        title="Update"
        type="button"
        onClick={() => {
          if (data.onConfirm) {
            data.onConfirm();
          }
        }}>
        <span className={styles.reloadToastButtonText}>{data.buttonText}</span>
      </button>
    </div>
  );
};
