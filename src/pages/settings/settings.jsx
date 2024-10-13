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
} from "@telegram-apps/telegram-ui";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Settings = () => {
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
        header={t("settings.personal_data")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Placeholder action={<FileInput label={t("settings.change_avatar")} />}>
          <Avatar
            size={96}
            acronym={
              initData?.initData?.user?.lastName
                ? initData?.initData?.user?.firstName[0] +
                  initData?.initData?.user?.lastName[0]
                : initData?.initData?.user?.firstName[0]
            }
          />
        </Placeholder>
        <Input
          header={t("settings.first_name")}
          placeholder={t("settings.first_name_placeholder")}
        />
        <Input
          header={t("settings.last_name")}
          placeholder={t("settings.last_name_placeholder")}
        />
        <Textarea
          header={t("settings.about_me")}
          placeholder={t("settings.about_me_placeholder")}
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
      <Section
        header={t("settings.privacy_and_security")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          Component="label"
          after={<Switch defaultChecked />}
          description={t("settings.telegram_id_description")}
          multiline
        >
          {t("settings.telegram_id")}
        </Cell>
        <Cell before={<Icon name="lock-closed" size={24} />}>
          {t("settings.change_pin")}
        </Cell>
      </Section>

      <Section
        header={t("settings.additionally")}
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Cell
          Component={"a"}
          href="https://t.me/JediPayApp_bot"
          before={<Icon name="chat-bubble" size={24} />}
        >
          {t("settings.support")}
        </Cell>
        <Cell
          Component={Link}
          to="/settings"
          before={<Icon name="reader" size={24} />}
        >
          {t("settings.rules")}
        </Cell>
      </Section>
    </List>
  );
};
