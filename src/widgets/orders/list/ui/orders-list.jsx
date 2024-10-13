import { Caption, Cell, Chip, Section } from "@telegram-apps/telegram-ui";
import { cx } from "class-variance-authority";
import styles from "./orders-list.module.css";

const orders = [
  {
    id: 0,
    title: "Сделать админку",
    description:
      "Написать админку для сервиса, на react. Использовать стейт-менеджер mobx. Необходимо для защиты использовать bff. Методология FSD. Ссылка на фигму - ",
    category: "Веб-разработка",
    subcategory: "frontend",
    status: "inWork",
  },
  {
    id: 1,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    status: "complete",
  },
  {
    id: 1,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    status: "cancelled",
  },
];

const statuses = {
  inWork: "В работе",
  complete: "Выполнено",
  cancelled: "Отменено",
};

export const OrdersListWidget = () => {
  return (
    <Section>
      {orders.map((order) => {
        return (
          <Cell
            key={order.id}
            subtitle={order.description}
            titleBadge={
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
            after={
              <Chip className={styles.statusWrapper}>
                <Caption
                  className={cx(styles.status, {
                    [styles.inWork]: order.status == "inWork",
                    [styles.cancelled]: order.status == "cancelled",
                    [styles.complete]: order.status == "complete",
                  })}
                  weight={1}
                >
                  {statuses[order.status]}
                </Caption>
              </Chip>
            }
          >
            {order.title}
          </Cell>
        );
      })}
    </Section>
  );
};
