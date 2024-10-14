import { OffersListWidget } from "@/widgets/offers/list";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import { List } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const OffersPage = () => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const { t } = useTranslation();
  const [tabActive, setTabActive] = useState("offers");

  return (
    <List>
      <OffersListWidget />
    </List>
  );
};
