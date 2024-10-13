import { Icon } from "@/components/ui";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Badge,
  ButtonCell,
  Cell,
  Info,
  List,
  Placeholder,
  Section,
  Text,
} from "@telegram-apps/telegram-ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./main.module.css";

export const MainPage = () => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const { t } = useTranslation();

  return (
    <List>
      <div className={styles.promoWrapper}>
        <div className={styles.promo}>
          <div className={styles.tonIcon}>
            <Icon name="ton" size={56} />
          </div>
          <div className={styles.logo}>
            <Text weight={1}>TF</Text>
          </div>
        </div>
      </div>
      <Placeholder
        description="Свобода выбора, крипто возможности: творчество без границ!"
        header="TonFreelance"
      />
      <Section>
        <Cell
          Component={Link}
          to={`/user/${initData?.initData?.user?.username}`}
          before={
            <Avatar
              size={48}
              acronym={
                initData?.initData?.user?.lastName
                  ? initData?.initData?.user?.firstName[0] +
                    initData?.initData?.user?.lastName[0]
                  : initData?.initData?.user?.firstName[0]
              }
            />
          }
          description={"@" + initData?.initData?.user?.username}
        >
          {initData?.initData?.user?.firstName}{" "}
          {initData?.initData?.user?.lastName}
        </Cell>
      </Section>
      <Section
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          Component={Link}
          to="/my-offers"
          before={<Icon name="reader" size={24} />}
          subtitle={"Управляйте своими объявлениями"}
          after={
            <Badge type="number" mode="primary">
              24
            </Badge>
          }
        >
          Мои объявления
        </Cell>
        <ButtonCell
          Component={Link}
          to={`/create-offer`}
          before={<Icon name="plus" size={24} />}
        >
          Создать новое
        </ButtonCell>
      </Section>
      <Section
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          before={<Icon name="backpack" size={20} />}
          after={
            <Badge type="number" mode="primary">
              24
            </Badge>
          }
        >
          Работы
        </Cell>
        <Cell
          before={<Icon name="star" size={20} />}
          after={
            <Badge type="number" mode="primary">
              24
            </Badge>
          }
        >
          Отзывы
        </Cell>
        <Cell
          Component={Link}
          to={`/settings`}
          before={<Icon name="gear" size={20} />}
        >
          Настройки
        </Cell>
      </Section>
      <Section
        header={"События"}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          before={<Icon name="star" size={24} />}
          subtitle="Название объявления"
        >
          Отзыв
        </Cell>
        <Cell
          // after={<Info type="text">100 TON</Info>}
          before={<Icon name="envelope-open" size={24} />}
          subtitle="Название объявления"
        >
          Новый отклик
        </Cell>
        <Cell
          after={<Info type="text">100 TON</Info>}
          before={<Icon name="reader" size={24} />}
          subtitle="Название объявления"
        >
          Создано объявление
        </Cell>
      </Section>
    </List>
  );
};
