import { Icon } from "@/components/ui";
import { dayjs } from "@/utils/dates";
import { useInitData, useLaunchParams } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Caption,
  Cell,
  List,
  Section,
  Blockquote,
  Button,
} from "@telegram-apps/telegram-ui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./offer.module.css";

const responses = [
  {
    id: 0,
    author: {
      id: 1,
      tg_id: "vi_du",
      firstName: "Vitaly",
      lastName: "Dudarev",
    },
    rating: 5,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus explicabo quo delectus sint natus accusamus! Suscipit minima quam in, asperiores itaque enim recusandae quisquam eos pariatur atque, quis nisi placeat alias quas perspiciatis repellendus ullam id ad. Maxime vel ducimus temporibus totam laudantium quod molestiae saepe illum tempore minima veniam optio obcaecati quasi quas, omnis numquam ab sit ipsa, in ea beatae eveniet qui voluptatem debitis! Corrupti est, voluptatibus vero cum, at dignissimos incidunt soluta architecto suscipit mollitia perspiciatis? Eos, voluptatum mollitia magnam recusandae libero dolorem nostrum magni? Voluptatibus, sed!",
    created_date: "2024-10-13T18:59:40.503220Z",
  },
  {
    id: 1,
    author: {
      id: 2,
      tg_id: "dz3nnn",
      firstName: "Denis",
      lastName: "",
    },
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel inventore, quisquam ab soluta repudiandae officia fugiat! Rerum, dolore nihil quo accusantium delectus blanditiis iusto. Deserunt, soluta. Quaerat natus deserunt magnam.",
    created_date: "2024-10-13T18:59:40.503220Z",
  },
];

export const OfferPage = () => {
  const initData = useInitData();
  const { t } = useTranslation();

  return (
    <List>
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
          after={
            <div className={styles.rating}>
              <Icon name="star" size={16} />
              <Caption level={1} weight={2}>
                4.0
              </Caption>
            </div>
          }
          description={"@" + initData?.initData?.user?.username}
        >
          {initData?.initData?.user?.firstName}{" "}
          {initData?.initData?.user?.lastName}
        </Cell>
        <Cell
          subtitle={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis magnam optio facilis excepturi dolorem voluptatibus sint dicta, harum iusto eum tempora vero repellat, porro cupiditate quisquam numquam enim amet dolorum laboriosam eaque possimus officiis! A earum illum minima quae? Quod, odit pariatur? Perspiciatis dolorem, vero provident, at officiis amet accusantium cum sint praesentium quas, animi doloremque? Aperiam, alias eaque officia minus, saepe perferendis, quae expedita beatae veritatis neque quam. Vitae, nemo dignissimos consequuntur itaque recusandae nobis adipisci sed sapiente exercitationem magni inventore eum culpa perspiciatis corrupti provident sunt aliquam saepe. Molestiae sunt laborum nihil incidunt voluptate at voluptas error saepe quas praesentium cum quae voluptatibus eius eaque totam officia rem magnam quis vero vel odio, corrupti quibusdam laboriosam debitis? Consectetur unde quidem labore excepturi ullam cumque, molestiae velit recusandae vitae quam numquam modi rem praesentium explicabo libero est. Aliquid, impedit.`}
          subhead={
            <div className={styles.tags}>
              <div className={styles.tag}>
                <Caption level={2} weight={2}>
                  Веб-разработка
                </Caption>
              </div>
              <div className={styles.tag}>
                <Caption level={2} weight={2}>
                  Frontend
                </Caption>
              </div>
            </div>
          }
          description={
            <div className={styles.titleBadge}>
              <div className={styles.views}>
                <Icon name="eye-open" size={12} />
                <Caption level={2} weight={2}>
                  {50} Просмотров
                </Caption>
              </div>
              <div className={styles.responses}>
                <Icon name="envelope-closed" size={12} />
                <Caption level={2} weight={2}>
                  {12} Откликов
                </Caption>
              </div>
            </div>
          }
          multiline
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          nisi.
        </Cell>
        <Cell description={dayjs().format("DD MMM YYYY")}>Дата создания</Cell>
        <Cell description={"Постоплата"}>Оплата</Cell>
        <Cell
          after={
            <div className={styles.price}>
              <Caption level={1} weight={2}>
                100
              </Caption>
              <Icon name={"ton"} size={18} />
            </div>
          }
        >
          Сумма
        </Cell>
        <Button size="l" stretched>
          Откликнуться
        </Button>
      </Section>
      <Section header="Отклики">
        {responses.map((response) => {
          return (
            <>
              <Cell
                key={response.id}
                Component={Link}
                to={`/user/${response.author?.username}`}
                after={
                  <div className={styles.rating}>
                    <Icon name="star" size={16} />
                    <Caption level={1} weight={2}>
                      4.0
                    </Caption>
                  </div>
                }
                before={
                  <Avatar
                    size={48}
                    acronym={
                      response.author.lastName
                        ? response.author.firstName[0] +
                          response.author.lastName[0]
                        : response.author.firstName[0]
                    }
                  />
                }
                subtitle={"@" + response.author.tg_id}
              >
                {response.author.firstName} {response.author.lastName}
              </Cell>
              <Cell
                description={dayjs(response.created_date).format("DD MMM YYYY")}
                multiline
              >
                <Blockquote type="text">{response.comment}</Blockquote>
              </Cell>
            </>
          );
        })}
      </Section>
    </List>
  );
};
