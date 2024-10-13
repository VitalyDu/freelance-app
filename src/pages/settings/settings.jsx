import { Icon } from "@/components/ui";
import {
  Button,
  Cell,
  IconContainer,
  Input,
  List,
  Section,
  Selectable,
} from "@telegram-apps/telegram-ui";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Settings = () => {
  const { i18n, t } = useTranslation();

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
        header={t("settings.personal_data")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Input
          header={t("settings.first_name")}
          placeholder={t("settings.first_name_placeholder")}
        />
        <Input
          header={t("settings.last_name")}
          placeholder={t("settings.last_name_placeholder")}
        />
        <Input
          header={t("settings.second_name")}
          placeholder={t("settings.second_name_placeholder")}
        />
        <Input
          header={t("settings.phone_number")}
          placeholder={t("settings.phone_number_placeholder")}
        />

        <List
          style={{
            padding: "20px 22px 16px",
          }}
        >
          <Button mode="bezeled" size="m" stretched>
            {t("settings.save_label")}
          </Button>
        </List>
      </Section>
      <Section
        header={t("settings.select_language")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        {languages.map((language) => {
          return (
            <Cell
              key={language.value}
              Component="label"
              before={
                <Selectable
                  checked={language.isActive}
                  name="language"
                  value={language.value}
                  onChange={(e) => {
                    i18n.changeLanguage(e.target.value);
                  }}
                />
              }
              multiline
            >
              {language.label}
            </Cell>
          );
        })}
      </Section>
      {/* <List
        style={{
          padding: 10,
        }}
      ></List> */}

      <Section
        header={t("settings.additionally")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          Component={"a"}
          href="https://t.me/JediPayApp_bot"
          before={
            <IconContainer>
              <Icon name="messages" size={24} />
            </IconContainer>
          }
        >
          {t("settings.support")}
        </Cell>
        <Cell
          Component={Link}
          to="/settings"
          before={
            <IconContainer>
              <Icon name="deal" size={24} />
            </IconContainer>
          }
        >
          {t("settings.legal_information")}
        </Cell>
      </Section>
    </List>
  );
};
