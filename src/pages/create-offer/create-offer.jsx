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
  const [selectedCategory, setSelectedCategory] = useState("empty");
  const [selectedDivision, setSelectedDivision] = useState("empty");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("usdt");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("empty");
  const [errors, setErrors] = useState(new Map());

  const handleForm = () => {
    const errorList = new Map();

    if (!selectedCategory || selectedCategory == "empty") {
      errorList.set("selectedCategory", "Выберите категорию");
    }

    if (!selectedDivision || selectedDivision == "empty") {
      errorList.set("selectedDivision", "Выберите раздел");
    }

    if (title.trim().length <= 0) {
      errorList.set(
        "title",
        "Поле “Название” не заполнено или заполнено неверно"
      );
    }

    if (description.trim().length <= 0) {
      errorList.set(
        "description",
        "Поле “Описание” не заполнено или заполнено неверно"
      );
    }

    if (amount.length <= 0 || amount <= 0) {
      errorList.set("amount", "Поле “Цена” не заполнено или заполнено неверно");
    }

    if (!amount || amount == "empty") {
      errorList.set("amount", "Выберите способ оплаты");
    }

    setErrors(errorList);

    // setErrorsKeys(Object.keys(errorList));
    // setErrors(
    //   Object.values(errorList).length > 1
    //     ? ["Обязательные поля не заполнены или заполнены неверно"]
    //     : Object.values(errorList)
    // );

    if (Object.keys(errorList).length === 0) {
      const data = {
        title,
        description,
      };
    }
  };

  return (
    <List>
      <Section
        header={t("create_offer.detailed_information")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Select
          header={t("create_offer.category")}
          placeholder={t("create_offer.select_category")}
          status={errors.has("selectedCategory") && "error"}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            const errorsList = new Map(errors);
            errorsList.delete("selectedCategory");
            setErrors(errorsList);
          }}
          value={selectedCategory}
        >
          <option value="empty">{t("create_offer.select_category")}</option>
          <option>Web-dev</option>
          <option>Marketing</option>
          <option>Design</option>
        </Select>
        <Select
          header={t("create_offer.division")}
          placeholder={t("create_offer.select_division")}
          status={errors.has("selectedDivision") && "error"}
          onChange={(e) => {
            setSelectedDivision(e.target.value);
            const errorsList = new Map(errors);
            errorsList.delete("selectedDivision");
            setErrors(errorsList);
          }}
          value={selectedDivision}
        >
          <option value="empty">{t("create_offer.select_division")}</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>DevOps</option>
        </Select>
        <Input
          header={t("create_offer.title")}
          placeholder={t("create_offer.enter_title")}
          status={errors.has("title") && "error"}
          onChange={(e) => {
            setTitle(e.target.value);
            const errorsList = new Map(errors);
            errorsList.delete("title");
            setErrors(errorsList);
          }}
          value={title}
        />
        <Textarea
          header={t("create_offer.description")}
          placeholder={t("create_offer.enter_description")}
          status={errors.has("description") && "error"}
          onChange={(e) => {
            setDescription(e.target.value);
            const errorsList = new Map(errors);
            errorsList.delete("description");
            setErrors(errorsList);
          }}
          value={description}
        />
        <Cell>
          <FileInput
            label={t("create_offer.clip_files")}
            className={styles.clip}
          />
        </Cell>
      </Section>
      <Section header={t("create_offer.currency_and_amount")}>
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
          type="number"
          header={t("create_offer.amount")}
          placeholder={t("create_offer.enter_amount")}
          after={<Icon name={selectedCurrency} size={24} />}
          status={errors.has("amount") && "error"}
          onChange={(e) => {
            setAmount(e.target.value);
            const errorsList = new Map(errors);
            errorsList.delete("amount");
            setErrors(errorsList);
          }}
          value={amount}
        />
        <Select
          header={t("create_offer.payment_type")}
          placeholder={t("create_offer.select_payment_type")}
          status={errors.has("amount") && "error"}
          onChange={(e) => {
            setAmount(e.target.value);
            const errorsList = new Map(errors);
            errorsList.delete("amount");
            setErrors(errorsList);
          }}
          value={amount}
        >
          <option value="empty">{t("create_offer.select_payment_type")}</option>
          <option>Любой</option>
          <option>Постоплата</option>
          <option>Предоплата</option>
          <option>Поэтапная</option>
        </Select>
        <Button mode="bezeled" size="l" stretched onClick={handleForm}>
          {t("create_offer.create")}
        </Button>
      </Section>
    </List>
  );
};
