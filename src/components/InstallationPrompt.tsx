import { type FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "@styles/components/InstallationPrompt.module.scss";

interface InstallPromptProps {
  onInstall: () => void;
}

export const InstallationPrompt: FC<InstallPromptProps> = ({ onInstall }) => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log("Install prompt triggered");
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      console.log("App installed successfully");
      setIsVisible(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
        onInstall();
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const ToastElements = () => {
      return (
        <div className={styles.installPrompt}>
          <p className={styles.installPromptText}>
            Install the app for a better experience!
          </p>
          <div className={styles.installPromptButtons}>
            <button type="button" onClick={handleInstallClick}>
              Install
            </button>
            <button type="button" onClick={handleDismiss}>
              Dismiss
            </button>
          </div>
        </div>
      );
    };

    if (isVisible) {
      toast(ToastElements, {
        type: "info",
        autoClose: false,
        closeButton: false,
        onClose: () => {
          setIsVisible(false);
        },
      });
    } else {
      toast.dismiss();
    }
    return () => {
      toast.dismiss();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return null;
};
