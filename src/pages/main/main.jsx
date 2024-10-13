import { Icon } from "@/components/ui";
import { dayjs } from "@/utils/dates";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Badge,
  ButtonCell,
  Cell,
  IconContainer,
  List,
  Section,
  Text,
  Title,
  Headline,
  Subheadline,
  Placeholder,
  SegmentedControl,
  Caption,
  Info,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./main.module.css";

export const MainPage = () => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const { t } = useTranslation();
  const [userType, setUserType] = useState("owner");

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
          // after={
          //   <div className={styles.rating}>
          //     <Icon name="star" size={18} />
          //     <Caption level={1} weight={2}>
          //       5.0
          //     </Caption>
          //   </div>
          // }
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
          // titleBadge={<Badge type="dot" />}
          // titleBadge={
          //   <div className={styles.rating}>
          //     <Icon name="star" size={14} />
          //     <Caption level={1} weight={2}>
          //       5.0
          //     </Caption>
          //   </div>
          // }
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
          to="/my-cards"
          before={<Icon name="wallet" size={24} />}
          subtitle={"Управляйте своими объявлениями"}
          after={
            <Badge type="number" mode="primary">
              24
            </Badge>
          }
        >
          Мои объявления
        </Cell>
        <ButtonCell before={<Icon name="plus" size={24} />}>
          Создать новое
        </ButtonCell>
      </Section>
      <Section
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          before={
            <IconContainer>
              <Icon name="arrows-exchange" size={24} />
            </IconContainer>
          }
          after={
            <Badge type="number" mode="primary">
              24
            </Badge>
          }
        >
          Работы
        </Cell>
        <Cell
          before={
            <IconContainer>
              <Icon name="arrows-exchange" size={24} />
            </IconContainer>
          }
          after={
            <Badge type="number" mode="primary">
              24
            </Badge>
          }
        >
          Отзывы
        </Cell>
        <Cell
          before={
            <IconContainer>
              <Icon name="settings" size={24} />
            </IconContainer>
          }
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
          // after={<Info type="text">100 TON</Info>}
          before={<Icon name="settings" size={48} />}
          subtitle="Название объявления"
        >
          Отзыв
        </Cell>
        <Cell
          // after={<Info type="text">100 TON</Info>}
          before={<Icon name="settings" size={48} />}
          subtitle="Название объявления"
        >
          Новый отклик
        </Cell>
        <Cell
          after={<Info type="text">100 TON</Info>}
          before={<Icon name="settings" size={48} />}
          subtitle="Название объявления"
        >
          Создано объявление
        </Cell>
      </Section>
      {/* <Section
        footer="Свобода выбора, крипто возможности: творчество без границ!"
        style={{
          background: "none",
        }}
      >
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
      </Section> */}
      {/* <Section>
        <Cell
          after={<Text>99 $</Text>}
          before={
            <Avatar
              size={48}
              acronym={
                initData?.initData?.user?.lastName
                  ? initData?.initData?.user?.lastName[0] +
                    initData?.initData?.user?.firstName[0]
                  : initData?.initData?.user?.firstName[0]
              }
            />
          }
          description={dayjs().format("d MMM YYYY")}
          titleBadge={<Badge type="dot" />}
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
          to="/my-cards"
          before={<Icon name="wallet" size={24} />}
          subtitle={t("main.cards_desc")}
        >
          {t("main.cards_label")}
        </Cell>
        <ButtonCell before={<Icon name="plus" size={24} />}>
          {t("main.add_card")}
        </ButtonCell>
      </Section>
      <Section
        footer={t("main.description")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          before={
            <IconContainer>
              <Icon name="arrows-exchange" size={24} />
            </IconContainer>
          }
        >
          {t("main.transfer")}
        </Cell>
        <Cell
          before={
            <IconContainer>
              <Icon name="recharge" size={24} />
            </IconContainer>
          }
        >
          {t("main.recharge")}
        </Cell>
        <Cell
          Component={Link}
          to="/transactions"
          before={
            <IconContainer>
              <Icon name="history" size={24} />
            </IconContainer>
          }
        >
          {t("main.transactions")}
        </Cell>
        <Cell
          Component={Link}
          to="/settings"
          before={
            <IconContainer>
              <Icon name="user" size={24} />
            </IconContainer>
          }
        >
          {t("main.personal_data")}
        </Cell>
      </Section> */}
    </List>
  );
};
