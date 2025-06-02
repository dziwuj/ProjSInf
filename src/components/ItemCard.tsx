import { type FC } from "react";
import EditIcon from "@assets/icons/pencil-solid.svg?react";
import XIcon from "@assets/icons/xmark-solid.svg?react";
import { NavLink } from "react-router-dom";

import { useStore } from "@/store/Root.store";
import type { Clothes } from "@/types/store/ClothesStore";

import { Image } from "./Image";

import styles from "@styles/components/ItemCard.module.scss";

export const ItemCard: FC<Clothes> = ({ id, name, image }) => {
  const { removeClothes } = useStore().clothes;
  return (
    <div className={styles.card}>
      <span className={styles.cardTitle}>{name}</span>
      <Image src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardButtons}>
        <button className={styles.cardButton} onClick={() => removeClothes(id)}>
          <XIcon className={styles.cardButtonIcon} />
        </button>
        <NavLink
          to="/wardrobe/add-clothing"
          state={{ id: id }}
          className={styles.cardButton}>
          <EditIcon className={styles.cardButtonIcon} />
        </NavLink>
      </div>
    </div>
  );
};
