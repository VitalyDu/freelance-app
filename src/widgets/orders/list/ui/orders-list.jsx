import { OfferState } from "@/entities/offer/state";
import { Caption, Cell, Section } from "@telegram-apps/telegram-ui";
import styles from "./orders-list.module.css";
import { dayjs } from "@/utils/dates";

const orders = [
  {
    id: 0,
    title: "Сделать админку",
    description:
      "Написать админку для сервиса, на react. Использовать стейт-менеджер mobx. Необходимо для защиты использовать bff. Методология FSD. Ссылка на фигму - ",
    category: "Веб-разработка",
    subcategory: "frontend",
    status: "in_work",
    created_date: "2024-10-13T18:59:40.503220Z",
  },
  {
    id: 1,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    status: "complete",
    created_date: "2024-10-13T18:59:40.503220Z",
  },
  {
    id: 1,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    status: "cancelled",
    created_date: "2024-10-13T18:59:40.503220Z",
  },
];

export const OrdersListWidget = () => {
  return (
    <Section>
      {orders.map((order) => {
        return (
          <Cell
            key={order.id}
            subtitle={order.description}
            subhead={
              <div className={styles.tags}>
                <div className={styles.tag}>
                  <Caption level={2} weight={2}>
                    {order.category}
                  </Caption>
                </div>
                <div className={styles.tag}>
                  <Caption level={2} weight={2}>
                    {order.subcategory}
                  </Caption>
                </div>
              </div>
            }
            after={<OfferState state={order.status} />}
            description={dayjs(order.created_date).format("DD MMM YYYY")}
          >
            {order.title}
          </Cell>
        );
      })}
    </Section>
  );
};
