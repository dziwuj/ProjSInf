import { type FC } from "react";
import HeartIcon from "@assets/icons/heart-solid.svg?react";
import XIcon from "@assets/icons/xmark-solid.svg?react";
import mockData from "@constants/mockData.json";

import type { SimpleWeatherTypes } from "@/types/types";

import { Image } from "./Image";

import styles from "@styles/components/OutfitDisplay.module.scss";

export const OutfitDisplay: FC<{ weatherType: SimpleWeatherTypes }> = ({
  weatherType,
}) => {
  const outfitData = mockData.find(
    item => item.weather === weatherType,
  )?.clothes;
  return (
    <div className={styles.outfit}>
      {outfitData ? (
        <>
          <div className={styles.outfitSection}>
            <div className={styles.outfitColors}>
              <span className={styles.outfitTitle}>Colors</span>
              {outfitData?.colors.map((color, index) => (
                <div
                  key={index}
                  className={styles.outfitColorsItem}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className={styles.outfitAddons}>
              <span className={styles.outfitTitle}>Addons</span>
              {Object.keys(outfitData.addons).length ? (
                Object.entries(outfitData.addons).map(
                  ([addon, value], index) => (
                    <Image
                      key={index}
                      src={value}
                      alt={addon}
                      className={styles.outfitAddonsItem}
                      title={addon}
                    />
                  ),
                )
              ) : (
                <span className={styles.outfitTitle}>No addons available</span>
              )}
            </div>
            <button className={styles.outfitActionButton}>
              <XIcon className={styles.outfitActionIcon} />
            </button>
          </div>
          <div className={styles.outfitSection}>
            <div className={styles.outfitImages}>
              {Object.keys(outfitData.outfit).length ? (
                <>
                  {Object.entries(outfitData.outfit).map(
                    ([key, value], index) => (
                      <Image
                        key={index}
                        src={value}
                        alt={key}
                        className={styles.outfitImagesItem}
                        title={key}
                      />
                    ),
                  )}
                  <span className={styles.outfitImagesText}>
                    Do you like this?
                  </span>
                </>
              ) : (
                <span className={styles.outfitTitle}>No images available</span>
              )}
            </div>
          </div>
          <div className={styles.outfitSection}>
            <div className={styles.outfitTags}>
              <span className={styles.outfitTitle}>Tags</span>
              {outfitData?.tags.map((tag, index) => (
                <span key={index} className={styles.outfitTagsItem}>
                  {tag}
                </span>
              ))}
            </div>
            <button className={styles.outfitActionButton}>
              <HeartIcon className={styles.outfitActionIcon} />
            </button>
          </div>
        </>
      ) : (
        <h1>No outfit data available</h1>
      )}
    </div>
  );
};
