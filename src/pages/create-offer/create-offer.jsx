import { Icon } from "@/components/ui";
import {
  Button,
  Cell,
  FileInput,
  Input,
  List,
  Section,
  Select,
  Selectable,
  Textarea,
} from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./create-offer.module.css";

export const CreateOfferPage = () => {
  const { i18n, t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState("usdt");

  return (
    <List>
      <Section
        header={"Детальная информация"}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Select header="Категория" placeholder="Выберите категорию объявления">
          <option>Web-dev</option>
          <option>Marketing</option>
          <option>Design</option>
        </Select>
        <Select header="Раздел" placeholder="Выберите раздел объявления">
          <option>Frontend</option>
          <option>Backend</option>
          <option>DevOps</option>
        </Select>
        <Input
          header={"Название"}
          placeholder={"Введите название объявления"}
        />
        <Textarea
          header={"Описание"}
          placeholder={"Введите описания вашего объявления"}
        />
        <Cell>
          <FileInput label="Прикрепить файлы" className={styles.clip} />
        </Cell>
      </Section>
      <Section header="Валюта и цена">
        <Cell
          Component="label"
          before={
            <Selectable
              checked={selectedCurrency == "usdt"}
              name="currency"
              value={"usdt"}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
              }}
            />
          }
          after={<Icon name="usdt" size={24} />}
          multiline
        >
          USDT
        </Cell>
        <Cell
          Component="label"
          before={
            <Selectable
              checked={selectedCurrency == "ton"}
              name="currency"
              value={"ton"}
              onChange={(e) => {
                setSelectedCurrency(e.target.value);
              }}
            />
          }
          after={<Icon name="ton" size={24} />}
          multiline
        >
          TON
        </Cell>
        <Input
          header={"Цена"}
          placeholder={"Введите цену объявления"}
          after={<Icon name={selectedCurrency} size={24} />}
        />
        <Select
          header="Способ оплаты"
          placeholder="Выберите способ оплаты работы"
        >
          <option>Любой</option>
          <option>Постоплата</option>
          <option>Предоплата</option>
          <option>Поэтапная</option>
        </Select>
        <Button mode="bezeled" size="l" stretched>
          Создать
        </Button>
      </Section>
    </List>
  );
};
