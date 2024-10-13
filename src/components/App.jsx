import { useIntegration } from "@telegram-apps/react-router-integration";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  useInitData,
} from "@telegram-apps/sdk-react";
import { AppRoot, Tabbar, PinInput } from "@telegram-apps/telegram-ui";
import { useEffect, useMemo } from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { routes } from "@/navigation/routes";
import { useTranslation } from "react-i18next";
import { dayjs } from "@/utils/dates";
import { Icon } from "@/components/ui";

export const App = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const initData = useInitData();
  const { i18n } = useTranslation();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create a new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator("app-navigation-state"), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  useEffect(() => {
    i18n.changeLanguage(
      initData?.initData?.user?.languageCode == "ru"
        ? initData?.initData?.user?.languageCode
        : "en"
    );
    dayjs.locale(
      initData?.initData?.user?.languageCode == "ru"
        ? initData?.initData?.user?.languageCode
        : "en"
    );
  }, [initData?.initData?.user?.languageCode]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      {/* <PinInput /> */}
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <Tabbar>
        <Tabbar.Item text={"Объявления"} selected>
          <Icon name="search" />
        </Tabbar.Item>
        <Tabbar.Item text={"Работы"}>
          <Icon name="settings" />
        </Tabbar.Item>
        <Tabbar.Item text={"Профиль"}>
          <Icon name="user" />
        </Tabbar.Item>
      </Tabbar>
    </AppRoot>
  );
};
