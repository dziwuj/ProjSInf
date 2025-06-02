import { type FC } from "react";
import ArrowDownIcon from "@assets/icons/angle-down-solid.svg?react";
import ShirtIcon from "@assets/icons/shirt-solid.svg?react";
import { NavLink } from "react-router-dom";

import { ItemCard } from "@/components";
import { useStore } from "@/store/Root.store";

import styles from "@styles/screens/Wardrobe.module.scss";

export const Wardrobe: FC = () => {
  const { clothes } = useStore().clothes;
  return (
    <div className={styles.wardrobe}>
      <div className={styles.wardrobeHeader}>
        <ShirtIcon className={styles.wardrobeHeaderIcon} />
        <div className={styles.wardrobeHeaderText}>
          <h1 className={styles.wardrobeHeaderTitle}>T-shirts</h1>
          <div className={styles.wardrobeHeaderCategory}>
            <span className={styles.wardrobeHeaderSubtitle}>
              Change category
            </span>
            <ArrowDownIcon className={styles.wardrobeHeaderArrow} />
          </div>
        </div>
      </div>
      <div className={styles.wardrobeList}>
        {clothes.map(item => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>
      <div className={styles.wardrobeFooter}>
        <NavLink
          to="/wardrobe/add-clothing"
          className={styles.wardrobeFooterButton}>
          Add T-shirt
        </NavLink>
      </div>
    </div>
  );
};
