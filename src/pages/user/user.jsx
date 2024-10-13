import { Icon } from "@/components/ui";
import { dayjs } from "@/utils/dates";
import { OffersListWidget } from "@/widgets/offers/list";
import { OrdersListWidget } from "@/widgets/orders/list";
import { ReviewsListWidget } from "@/widgets/reviews/list";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Button,
  Caption,
  Cell,
  IconButton,
  List,
  Placeholder,
  Section,
  TabsList,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./user.module.css";

export const UserPage = () => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const { t } = useTranslation();
  const [tabActive, setTabActive] = useState("offers");

  return (
    <List>
      {/* <Section>
        <Cell
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
          subtitle={"@" + initData?.initData?.user?.username}
          description={
            <Button size="s" before={<Icon name="messages" size={18} />}>
              Написать
            </Button>
          }
        >
          {initData?.initData?.user?.firstName}{" "}
          {initData?.initData?.user?.lastName}
        </Cell>
      </Section> */}
      <Placeholder
        action={
          <>
            <Button size="m" before={<Icon name="messages" size={18} />}>
              Написать
            </Button>
          </>
        }
        description={<>{"@" + initData?.initData?.user?.username}</>}
        header={
          initData?.initData?.user?.firstName +
          " " +
          initData?.initData?.user?.lastName
        }
      >
        <Avatar
          size={96}
          acronym={
            initData?.initData?.user?.lastName
              ? initData?.initData?.user?.firstName[0] +
                initData?.initData?.user?.lastName[0]
              : initData?.initData?.user?.firstName[0]
          }
        />
        <div className={styles.settingsButton}>
          <IconButton mode="bezeled" size="s">
            <Icon name="settings" size={18} />
          </IconButton>
        </div>
      </Placeholder>
      <Section header="Информация">
        <Cell subtitle={dayjs().format("d MMM YYYY")}>Зарегистрирован</Cell>
        <Cell
          subtitle="20 заказов"
          after={
            <div className={styles.rating}>
              <Icon name="star" size={16} />
              <Caption level={1} weight={2}>
                4.0
              </Caption>
            </div>
          }
        >
          Заказчик
        </Cell>
        <Cell
          subtitle="25 работ"
          after={
            <div className={styles.rating}>
              <Icon name="star" size={16} />
              <Caption level={1} weight={2}>
                4.0
              </Caption>
            </div>
          }
        >
          Исполнитель
        </Cell>
      </Section>
      <div className={styles.tabsWrapper}>
        <TabsList className={styles.tabs}>
          <TabsList.Item
            onClick={() => setTabActive("offers")}
            selected={tabActive == "offers"}
            className={styles.tab}
          >
            Объявления
          </TabsList.Item>
          <TabsList.Item
            onClick={() => setTabActive("orders")}
            selected={tabActive == "orders"}
            className={styles.tab}
          >
            Работы
          </TabsList.Item>
          <TabsList.Item
            onClick={() => setTabActive("reviews")}
            selected={tabActive == "reviews"}
            className={styles.tab}
          >
            Отзывы
          </TabsList.Item>
        </TabsList>
      </div>
      {tabActive == "offers" && <OffersListWidget />}
      {tabActive == "orders" && <OrdersListWidget />}
      {tabActive == "reviews" && <ReviewsListWidget />}
    </List>
  );
};