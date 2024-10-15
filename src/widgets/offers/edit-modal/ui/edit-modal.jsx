import * as Dialog from "@radix-ui/react-dialog";
import {
  Input,
  Modal,
  Placeholder,
  Select,
  Textarea,
  Cell,
  FileInput,
  Selectable,
  Button,
} from "@telegram-apps/telegram-ui";
import styles from "./edit-modal.module.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Icon } from "@/components/ui";

export const OfferEditModal = observer(({ isActive, setIsActive, data }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(data?.category?.key);
  const [selectedDivision, setSelectedDivision] = useState(data?.division?.key);
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [selectedCurrency, setSelectedCurrency] = useState(data?.currency);
  const [amount, setAmount] = useState(data?.amount);
  const [paymentType, setPaymentType] = useState(data?.paymentType?.key);
  const [errors, setErrors] = useState(new Map());

  console.log(selectedCategory);

  return (
    <Modal
      onOpenChange={(e) => setIsActive(e)}
      open={isActive}
      header={<Modal.Header></Modal.Header>}
    >
      <Dialog.Title>{"title"}</Dialog.Title>
      <Dialog.Description>{"description"}</Dialog.Description>
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
        <option value="web-dev">Web-dev</option>
        <option value="marketing">Marketing</option>
        <option value="design">Design</option>
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
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="devops">DevOps</option>
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
        <option value="any">Любой</option>
        <option value="post">Постоплата</option>
        <option value="prepay">Предоплата</option>
        <option value="steps">Поэтапная</option>
      </Select>
      <Button mode="bezeled" size="l" stretched>
        {t("create_offer.create")}
      </Button>
    </Modal>
  );
});
