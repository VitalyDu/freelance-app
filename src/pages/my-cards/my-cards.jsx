import { Icon, LinkComponent } from "@/components/ui";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Button,
  Cell,
  IconContainer,
  List,
  Modal,
  Placeholder,
  Section,
  Spoiler,
  Text,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./my-cards.module.css";
import { Link } from "react-router-dom";

export const MyCards = () => {
  const { t } = useTranslation();
  const [modalIsActive, setModalIsActive] = useState(false);
  const [modalTwoIsActive, setModalTwoIsActive] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  return (
    <>
      <List>
        <Placeholder
          action={
            <>
              <Button size="l" stretched onClick={() => setModalIsActive(true)}>
                {t("my_cards.empty_cards_action")} (не хватает)
              </Button>
              <Button
                size="l"
                stretched
                onClick={() => setModalTwoIsActive(true)}
              >
                {t("my_cards.empty_cards_action")} (хватает)
              </Button>
            </>
          }
          description={t("my_cards.empty_cards_description")}
          header={t("my_cards.empty_cards_title")}
        >
          <img
            alt="Telegram sticker"
            className={styles.emptyImage}
            src="https://xelene.me/telegram.gif"
          />
        </Placeholder>

        {/* <Section header="Реквизиты карты">
        <div className={styles.card}>

        </div>
      </Section> */}
        <Section>
          <Cell
            before={
              <Icon name={!cardVisible ? "eye-open" : "eye-close"} size={24} />
            }
            onClick={() => setCardVisible(!cardVisible)}
            interactiveAnimation="opacity"
            multiline
            subtitle={
              <div className={styles.cardBottom}>
                <div className={styles.cardBottomItem}>
                  <Text className={styles.cardNumber}>expire date</Text>
                  <Text className={styles.cardNumber}>
                    <Spoiler visible={cardVisible}>12</Spoiler>/
                    <Spoiler visible={cardVisible}>30</Spoiler>
                  </Text>
                </div>
                <div className={styles.cardBottomItem}>
                  <Text className={styles.cardNumber}>CVV</Text>
                  <Text className={styles.cardNumber}>
                    <Spoiler visible={cardVisible}>123</Spoiler>
                  </Text>
                </div>
              </div>
            }
          >
            <div className={styles.cardNumber}>
              <Text>Номер карты: </Text>
              <Text className={styles.cardNumberValue}>
                <Spoiler visible={cardVisible}>1234</Spoiler>
                <Spoiler visible={cardVisible}>1234</Spoiler>
                <Spoiler visible={cardVisible}>1234</Spoiler>
                5678
              </Text>
            </div>
          </Cell>
          {/* <ButtonCell before={<Icon28AddCircle />}>Create Ad</ButtonCell> */}
        </Section>
        <Section header="Выберите действие">
          <Cell
            Component={Link}
            to={"/transfer"}
            before={
              <IconContainer>
                <Icon name="arrows-exchange" size={24} />
              </IconContainer>
            }
          >
            {t("my_cards.transfer_to_card")}
          </Cell>
          <Cell
            Component={Link}
            to={"/transactions/1234 5678 1234 5678"}
            before={
              <IconContainer>
                <Icon name="history" size={24} />
              </IconContainer>
            }
          >
            {t("my_cards.card_transactions_history")}
          </Cell>
          <Cell
            before={
              <IconContainer>
                <Icon name="card" size={24} />
              </IconContainer>
            }
          >
            {t("my_cards.reissue_bank_card")}
          </Cell>
        </Section>
      </List>
      <Modal
        onOpenChange={(e) => setModalIsActive(e)}
        open={modalIsActive}
        header={<Modal.Header></Modal.Header>}
      >
        <Placeholder
          className={styles.modal}
          action={
            <div className={styles.modalActions}>
              <Button size="l" stretched>
                {t("my_cards.up_balance_button_label")}
              </Button>
              <Modal.Close>
                <Button size="l" mode="gray" stretched>
                  {t("my_cards.cancel_button_label")}
                </Button>
              </Modal.Close>
            </div>
          }
          description={
            <Dialog.Description>
              {t("my_cards.enough_money_description")}
            </Dialog.Description>
          }
          header={
            <Dialog.Title>{t("my_cards.enough_money_title")}</Dialog.Title>
          }
        ></Placeholder>
      </Modal>
      <Modal
        onOpenChange={(e) => setModalTwoIsActive(e)}
        open={modalTwoIsActive}
        header={<Modal.Header></Modal.Header>}
      >
        <Placeholder
          className={styles.modal}
          action={
            <div className={styles.modalActions}>
              <Button size="l" stretched>
                {t("my_cards.okey_button_label")}
              </Button>
              <Modal.Close>
                <Button size="l" mode="gray" stretched>
                  {t("my_cards.cancel_button_label")}
                </Button>
              </Modal.Close>
            </div>
          }
          description={
            <Dialog.Description>
              {t("my_cards.order_confirm_description")}
            </Dialog.Description>
          }
          header={
            <Dialog.Title>{t("my_cards.order_confirm_title")}</Dialog.Title>
          }
        ></Placeholder>
      </Modal>
    </>
  );
};
