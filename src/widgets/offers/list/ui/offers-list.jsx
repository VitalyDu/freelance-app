import { Icon } from "@/components/ui";
import { Caption, Cell, Section } from "@telegram-apps/telegram-ui";
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
    views: 317,
    responses: 90,
  },
  {
    id: 1,
    title: "Сделать дизайн сайта в Figma",
    description: "Сделать дизайн маркетплейса игровых ценностей в Figma",
    category: "Веб-разработка",
    subcategory: "design",
    price: 95,
    views: 871,
    responses: 123,
  },
];

export const OffersListWidget = () => {
  return (
    <Section>
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
                  <Icon name="ton" size={18} />
                </div>
                <div className={styles.titleBadge}>
                  <div className={styles.views}>
                    <Icon name="eye-open" size={12} />
                    <Caption level={2} weight={2}>
                      {offer.views}
                    </Caption>
                  </div>
                  <div className={styles.responses}>
                    <Icon name="eye-open" size={12} />
                    <Caption level={2} weight={2}>
                      {offer.responses}
                    </Caption>
                  </div>
                </div>
              </div>
            }
          >
            {offer.title}
          </Cell>
        );
      })}
    </Section>
  );
};
