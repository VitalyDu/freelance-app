import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  settingsLocaleRu,
  myCardsLocaleRu,
  mainLocaleRu,
} from "@/shared/model/locale/ru/index";
import {
  settingsLocaleEn,
  myCardsLocaleEn,
  mainLocaleEn,
} from "@/shared/model/locale/en/index";

i18n
  .use(initReactI18next) // передаем i18n в react-i18next
  .init({
    resources: {
      en: {
        translation: {
          main: { ...mainLocaleEn },
          settings: { ...settingsLocaleEn },
          my_cards: { ...myCardsLocaleEn },
        },
      },
      ru: {
        translation: {
          main: { ...mainLocaleRu },
          settings: { ...settingsLocaleRu },
          my_cards: { ...myCardsLocaleRu },
        },
      },
    },
    lng: "en", // язык по умолчанию
    fallbackLng: "en", // язык по умолчанию, если выбранный не найден
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
  });

export default i18n;
