import { memo } from "react";
import styles from "./Icon.module.css";

const IconComponent = ({
  name,
  size = 24,
  color = "currentColor",
  fill = "none",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      {...props}
      color={color}
      fill={fill}
      className={styles.icon}
    >
      <use xlinkHref={`/assets/images/icons.svg#${name}`} />
    </svg>
  );
};

export const Icon = memo(IconComponent);
