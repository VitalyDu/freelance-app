import { Icon } from "@/components/ui";
import { dayjs } from "@/utils/dates";
import {
  Caption,
  Cell,
  Headline,
  IconButton,
  Section,
  Input,
  IconContainer,
} from "@telegram-apps/telegram-ui";
import styles from "./offers-list.module.css";

const offers = [
  {
    id: 0,
    title: "Сделать админку",
    description:
      "Написать админку для сервиса, на react. Использовать стейт-менеджер mobx. Необходимо для защиты использовать bff. Методология FSD. Ссылка на фигму - ",
    category: "Веб-разработка",
    subcategory: "frontend",
    price: 12.78,
    currency: "usdt",
    views: 317,
    responses: 90,
    created_date: "2024-10-13T18:59:40.503220Z",
  },
  {
    id: 1,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    price: 95,
    currency: "ton",
    views: 871,
    responses: 123,
    created_date: "2024-10-13T18:59:40.503220Z",
  },
  {
    id: 2,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    price: 95,
    currency: "ton",
    views: 871,
    responses: 123,
    created_date: "2024-10-13T18:59:40.503220Z",
  },
  {
    id: 3,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    price: 95,
    currency: "ton",
    views: 871,
    responses: 123,
    created_date: "2024-10-13T18:59:40.503220Z",
  },
];

export const OffersListWidget = ({ label }) => {
  return (
    <Section
      header={
        <div className={styles.header}>
          <Input
            before={<Icon name="magnifying-glass" size={24} />}
            placeholder={"Поиск..."}
          />
          <IconButton mode="bezeled" size="m">
            <Icon name="mixer-horizontal" size={24} />
          </IconButton>
        </div>
      }
    >
      {offers.map((offer) => {
        return (
          <Cell
            key={offer.id}
            subtitle={offer.description}
            subhead={
              <div className={styles.tags}>
                <div className={styles.tag}>
                  <Caption level={2} weight={2}>
                    {offer.category}
                  </Caption>
                </div>
                <div className={styles.tag}>
                  <Caption level={2} weight={2}>
                    {offer.subcategory}
                  </Caption>
                </div>
              </div>
            }
            after={
              <div className={styles.info}>
                <div className={styles.price}>
                  <Caption level={1} weight={2}>
                    {offer.price}
                  </Caption>
                  <Icon name={offer.currency} size={18} />
                </div>
                <div className={styles.titleBadge}>
                  <div className={styles.views}>
                    <Icon name="eye-open" size={12} />
                    <Caption level={2} weight={2}>
                      {offer.views}
                    </Caption>
                  </div>
                  <div className={styles.responses}>
                    <Icon name="envelope-closed" size={12} />
                    <Caption level={2} weight={2}>
                      {offer.responses}
                    </Caption>
                  </div>
                </div>
              </div>
            }
            description={dayjs(offer.created_date).format("DD MMM YYYY")}
          >
            {offer.title}
          </Cell>
        );
      })}
    </Section>
  );
};
