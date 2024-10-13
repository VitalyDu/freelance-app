import { Icon } from "@/components/ui";
import { useInitData } from "@telegram-apps/sdk-react";
import {
  Avatar,
  Button,
  Cell,
  FileInput,
  Input,
  List,
  Placeholder,
  Section,
  Selectable,
  Switch,
  Textarea,
  Select,
} from "@telegram-apps/telegram-ui";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./create-offer.module.css";

export const CreateOfferPage = () => {
  const { i18n, t } = useTranslation();
  const initData = useInitData();

  const languages = useMemo(() => {
    const array = [
      { label: "English", value: "en", isActive: i18n.language != "ru" },
      { label: "Русский", value: "ru", isActive: i18n.language == "ru" },
    ];

    return array;
  }, [i18n.language]);

  return (
    <List>
      <Section
        header={"Создать объявление"}
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
        <Input
          header={"Цена"}
          placeholder={"Введите цену объявления"}
          after={<Icon name="ton" size={24} />}
        />
        <List
          style={{
            padding: "20px 22px 16px",
          }}
        >
          <Button mode="bezeled" size="m" stretched>
            Создать
          </Button>
        </List>
      </Section>
    </List>
  );
};
