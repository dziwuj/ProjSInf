import { type FC } from "react";

import styles from "@styles/components/OutfitDisplay.module.scss";

export const OutfitDisplay: FC = () => {
  return (
    <div className={styles.outfit}>
      <div className={styles.outfitSection}>
        <div className={styles.outfitColors}>
          <span className={styles.outfitTitle}>Colors</span>
        </div>
        <div className={styles.outfitAddons}>
          <span className={styles.outfitTitle}>Addons</span>
        </div>
      </div>
      <div className={styles.outfitSection}></div>
      <div className={styles.outfitSection}>
        <div className={styles.outfitTags}>
          <span className={styles.outfitTitle}>Tags</span>
        </div>
      </div>
    </div>
  );
};
