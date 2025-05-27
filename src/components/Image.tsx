import { type FC } from "react";
import style from "@styles/components/Image.module.scss";
import { type ImageProps } from "@/types/components/Image";

export const Image: FC<ImageProps> = ({
  imageClassName,
  containerClassName,
  ...props
}) => {
  return (
    <div
      className={
        containerClassName ? containerClassName : style.imageContainer
      }>
      <img className={imageClassName} {...props} />
    </div>
  );
};
