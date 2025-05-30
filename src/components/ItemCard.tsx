import { type FC } from "react";
import EditIcon from "@assets/icons/pencil-solid.svg?react";
import XIcon from "@assets/icons/xmark-solid.svg?react";

import type { Clothes } from "@/types/store/ClothesStore";

import { Image } from "./Image";

import styles from "@styles/components/ItemCard.module.scss";

export const ItemCard: FC<Clothes> = ({ name, image }) => {
  return (
    <div className={styles.card}>
      <span className={styles.cardTitle}>{name}</span>
      <Image src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardButtons}>
        <button className={styles.cardButton}>
          <XIcon className={styles.cardButtonIcon} />
        </button>
        <button className={styles.cardButton}>
          <EditIcon className={styles.cardButtonIcon} />
        </button>
      </div>
    </div>
  );
};
