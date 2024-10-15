import { Icon } from "@/components/ui";
import { OfferState } from "@/entities/offer/state";
import { OfferStore } from "@/pages/offer/model/store";
import { dayjs } from "@/utils/dates";
import { ConfirmModal } from "@/widgets/modals/confirm";
import { OfferEditModal } from "@/widgets/offers/edit-modal";
import { useInitData } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Blockquote,
  Button,
  Caption,
  Cell,
  IconButton,
  List,
  Section,
  Textarea,
} from "@telegram-apps/telegram-ui";
import { observer } from "mobx-react-lite";
import { Fragment, useEffect, useState } from "react";
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

export const OfferPage = observer(() => {
  const initData = useInitData();
  const { t } = useTranslation();
  const { 0: store } = useState(() => new OfferStore());
  const [deletedModal, setDeletedModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    store.getOffer();
  }, []);

  return (
    <>
      {deletedModal && (
        <ConfirmModal
          isActive={deletedModal}
          setIsActive={setDeletedModal}
          title="Удалить"
          description="Вы действительно хотите удалить объявление?"
        >
          <Button mode="outline" onClick={() => setDeletedModal(false)}>
            Отмена
          </Button>
          <Button mode="bezeled">Удалить</Button>
        </ConfirmModal>
      )}
      {visibleModal && (
        <ConfirmModal
          isActive={visibleModal}
          setIsActive={setVisibleModal}
          title="Скрыть"
          description="Вы действительно хотите скрыть объявление?"
        >
          <Button mode="outline" onClick={() => setVisibleModal(false)}>
            Отмена
          </Button>
          <Button mode="bezeled">Скрыть</Button>
        </ConfirmModal>
      )}
      {editModal && (
        <OfferEditModal
          isActive={editModal}
          setIsActive={setEditModal}
          data={store.data}
        />
      )}
      <List>
        <Section
          header={
            <div className={styles.header}>
              <Caption>#{store.data?.id}</Caption>
              <div className={styles.actions}>
                <IconButton onClick={() => setVisibleModal(true)}>
                  <Icon name="eye-none" size={18} />
                </IconButton>
                <IconButton onClick={() => setEditModal(true)}>
                  <Icon name="edit" size={18} />
                </IconButton>
                <IconButton onClick={() => setDeletedModal(true)}>
                  <Icon name="trash" size={18} />
                </IconButton>
              </div>
            </div>
          }
        >
          <Cell
            Component={Link}
            to={`/user/${store.data.author?.username}`}
            before={
              <Avatar
                size={48}
                acronym={
                  store.data.author?.lastName
                    ? store.data.author?.firstName[0] +
                      store.data.author?.lastName[0]
                    : store.data.author?.firstName[0]
                }
              />
            }
            after={
              <div className={styles.rating}>
                <Icon name="star" size={16} />
                <Caption level={1} weight={2}>
                  {store.data.author?.ownerRating}
                </Caption>
              </div>
            }
            description={"@" + store.data.author?.username}
          >
            {store.data.author?.firstName} {store.data.author?.lastName}
          </Cell>
          <Cell
            subtitle={store.data?.description}
            subhead={
              <div className={styles.tags}>
                <div className={styles.tag}>
                  <Caption level={2} weight={2}>
                    {store.data?.category?.label}
                  </Caption>
                </div>
                <div className={styles.tag}>
                  <Caption level={2} weight={2}>
                    {store.data?.division?.label}
                  </Caption>
                </div>
              </div>
            }
            description={
              <div className={styles.titleBadge}>
                <div className={styles.views}>
                  <Icon name="eye-open" size={12} />
                  <Caption level={2} weight={2}>
                    {store.data?.views} Просмотров
                  </Caption>
                </div>
                <div className={styles.responses}>
                  <Icon name="envelope-closed" size={12} />
                  <Caption level={2} weight={2}>
                    {store.data?.responses} Откликов
                  </Caption>
                </div>
              </div>
            }
            multiline
          >
            {store.data?.title}
          </Cell>
          <Cell
            description={dayjs(store.data?.createdDate).format("DD MMM YYYY")}
          >
            Дата создания
          </Cell>
          <Cell description={store.data?.paymentType?.label}>Оплата</Cell>
          <Cell
            after={
              <div className={styles.price}>
                <Caption level={1} weight={2}>
                  {store.data?.amount}
                </Caption>
                <Icon name={store.data?.currency} size={18} />
              </div>
            }
          >
            Сумма
          </Cell>
          {store.data?.executor && (
            <Cell
              multiline
              after={
                <div className={styles.user}>
                  <Avatar
                    size={28}
                    acronym={
                      store.data?.executor?.lastName
                        ? store.data?.executor?.firstName[0] +
                          store.data?.executor?.lastName[0]
                        : store.data?.executor?.firstName[0]
                    }
                  />
                  <Caption level={1} weight={2}>
                    {store.data?.executor?.firstName}{" "}
                    {store.data?.executor?.lastName}
                  </Caption>
                </div>
              }
            >
              Исполнитель
            </Cell>
          )}
          {store.data?.executor && (
            <Cell
              after={
                <div className={styles.state}>
                  <OfferState state={store.data?.status} />
                </div>
              }
            >
              Статус
            </Cell>
          )}
        </Section>
        <Section header="Создать отклик">
          <Textarea placeholder={"Напишите отклик"} />
          <Cell>
            <Button size="l" stretched>
              Откликнуться
            </Button>
          </Cell>
        </Section>
        <Section header="Отклики">
          {responses.map((response) => {
            return (
              <Fragment key={response.id}>
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
                  description={dayjs(response.created_date).format(
                    "DD MMM YYYY"
                  )}
                  multiline
                >
                  <Blockquote type="text">{response.comment}</Blockquote>
                </Cell>
              </Fragment>
            );
          })}
        </Section>
      </List>
    </>
  );
});
