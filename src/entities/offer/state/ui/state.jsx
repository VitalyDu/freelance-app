import { Caption } from "@telegram-apps/telegram-ui";
import { cx } from "class-variance-authority";
import { useTranslation } from "react-i18next";
import styles from "./state.module.css";

export const OfferState = ({ state = "in_work" }) => {
  const { t } = useTranslation();

  return (
    <div className={cx(styles.state, styles[`${state}`])}>
      <Caption>{t(`statuses.${state}`)}</Caption>
    </div>
  );
};
