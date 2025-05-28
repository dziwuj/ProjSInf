import { type FC } from "react";
import SettingsIcon from "@assets/icons/gear-solid.svg?react";
import HomeIcon from "@assets/icons/house-solid.svg?react";
import WardrobeIcon from "@assets/icons/shirt-solid.svg?react";
import PreferencesIcon from "@assets/icons/user-pen-solid.svg?react";
import { NavLink } from "react-router-dom";

import styles from "@styles/components/Navigation.module.scss";

export const Navigation: FC = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        aria-label="Home"
        to="/"
        className={({ isActive }) =>
          isActive
            ? `${styles.navIcon} ${styles.navIconActive}`
            : styles.navIcon
        }>
        <HomeIcon className={styles.navIconSvg} />
      </NavLink>
      <NavLink
        aria-label="Wardrobe"
        to="/wardrobe"
        className={({ isActive }) =>
          isActive
            ? `${styles.navIcon} ${styles.navIconActive}`
            : styles.navIcon
        }>
        <WardrobeIcon className={styles.navIconSvg} />
      </NavLink>

      <NavLink
        aria-label="Preferences"
        to="/preferences"
        className={({ isActive }) =>
          isActive
            ? `${styles.navIcon} ${styles.navIconActive}`
            : styles.navIcon
        }>
        <PreferencesIcon className={styles.navIconSvg} />
      </NavLink>
      <NavLink
        aria-label="Settings"
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? `${styles.navIcon} ${styles.navIconActive}`
            : styles.navIcon
        }>
        <SettingsIcon className={styles.navIconSvg} />
      </NavLink>
    </nav>
  );
};
