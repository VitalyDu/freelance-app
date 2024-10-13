import {
  Button,
  Input,
  List,
  Placeholder,
  Section,
  TabsList,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./transfer.module.css";

export const Transfer = () => {
  const { i18n, t } = useTranslation();
  const [activeTab, setActiveTab] = useState("card");
  const [card, setCard] = useState("");
  const [acc, setAcc] = useState("");
  const [summ, setSumm] = useState(null);

  return (
    <List>
      <Section.Header large>Вывод средств</Section.Header>
      <Section>
        <TabsList>
          <TabsList.Item
            selected={activeTab == "card"}
            onClick={() => setActiveTab("card")}
          >
            Вывод на карту
          </TabsList.Item>
          <TabsList.Item
            selected={activeTab == "acc"}
            onClick={() => setActiveTab("acc")}
          >
            Расчётный счёт
          </TabsList.Item>
        </TabsList>
      </Section>
      <List
        style={{
          background: "var(--tgui--bg_color)",
        }}
      >
        <Section header="Заполните поля" footer="Комиссия 1%">
          {activeTab == "card" ? (
            <Input header="Номер карты" placeholder="Введите номер карты" />
          ) : (
            <Input header="Номер счёта" placeholder="Введите номер счёта" />
          )}
          <Input header="Сумма" placeholder="Введите сумму" />
        </Section>
        <Section>
          <Placeholder className={styles.actions}>
            <Button mode="outline" stretched>
              Назад
            </Button>
            <Button stretched>Перевести</Button>
          </Placeholder>
        </Section>
      </List>
    </List>
  );
};
