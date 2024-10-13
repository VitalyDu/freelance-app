import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { Caption } from "@telegram-apps/telegram-ui";
import { useTranslation } from "react-i18next";
import styles from "./state.module.css";
import { cx } from "class-variance-authority";

export const OfferState = ({ state = "inWork" }) => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const { t } = useTranslation();

  return (
    <div className={cx(styles.state, styles[`${state}`])}>
      <Caption>{state}</Caption>
    </div>
  );
};
