import { useStore } from "@/store/Root.store";
import { useState, type FC } from "react";
import HeartIcon from "@assets/icons/heart.svg?react";
import styles from "@styles/screens/Home.module.scss";
import { Image } from "@/components";
import dressImage from "@assets/images/blue-dress.png";

export const Home: FC = () => {
  const { count, inc } = useStore();
  const [isHeart, setIsHeart] = useState<boolean>(false);
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Home screen</h1>
      <div className={styles.homeContent}>
        <Image alt="dress" src={dressImage} />
        <div className={styles.homeInteractiveContent}>
          <span className={styles.homeCounter}>{count}</span>
          <div className={styles.homeButtonContainer}>
            <button className={styles.homeCounterButton} onClick={inc}>
              one up
            </button>
            <button
              className={`${styles.homeHeartButton} ${
                isHeart ? styles.homeHeartButtonActive : ""
              }`}
              onClick={() => setIsHeart(prev => !prev)}>
              <HeartIcon className={styles.homeHeartIcon} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
