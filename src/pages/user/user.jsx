import { Icon } from "@/components/ui";
import { OffersListWidget } from "@/widgets/offers/list";
import { OrdersListWidget } from "@/widgets/orders/list";
import { ReviewsListWidget } from "@/widgets/reviews/list";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Button,
  Caption,
  IconButton,
  List,
  Placeholder,
  TabsList,
  Headline,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./user.module.css";
import { cx } from "class-variance-authority";

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
            <div className={styles.ratings}>
              <div className={styles.ratingWrapper}>
                <Headline weight={3}>Заказчик</Headline>
                <div className={cx(styles.rating, styles.accent)}>
                  <Icon name="star" size={16} />
                  <Caption level={1} weight={2}>
                    4.0
                  </Caption>
                </div>
              </div>
              <div className={styles.ratingWrapper}>
                <Headline weight={3}>Исполнитель</Headline>
                <div className={cx(styles.rating, styles.hint)}>
                  <Icon name="star" size={16} />
                  <Caption level={1} weight={2}>
                    4.0
                  </Caption>
                </div>
              </div>
            </div>
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
      <TabsList>
        <TabsList.Item
          onClick={() => setTabActive("offers")}
          selected={tabActive == "offers"}
        >
          Объявления
        </TabsList.Item>
        <TabsList.Item
          onClick={() => setTabActive("orders")}
          selected={tabActive == "orders"}
        >
          Работы
        </TabsList.Item>
        <TabsList.Item
          onClick={() => setTabActive("reviews")}
          selected={tabActive == "reviews"}
        >
          Отзывы
        </TabsList.Item>
      </TabsList>
      {tabActive == "offers" && <OffersListWidget />}
      {tabActive == "orders" && <OrdersListWidget />}
      {tabActive == "reviews" && <ReviewsListWidget />}
    </List>
  );
};
