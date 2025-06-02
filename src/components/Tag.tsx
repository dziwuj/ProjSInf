import { type FC } from "react";

import { type TagProps } from "@/types/components/Tag";

import styles from "@/styles/components/Tag.module.scss";

export const Tag: FC<TagProps> = ({ text, onRemove }) => {
  return (
    <div className={styles.tag}>
      <span>{text}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className={styles.removeButton}
          type="button">
          &times;
        </button>
      )}
    </div>
  );
};
