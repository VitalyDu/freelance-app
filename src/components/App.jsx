import { AuthStoreContext } from "@/entities/auth";
import { routes } from "@/navigation/routes";
import { useStore } from "@/shared/model";
import { dayjs } from "@/utils/dates";
import { useIntegration } from "@telegram-apps/react-router-integration";
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useInitData,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from "@telegram-apps/sdk-react";
import { AppRoot, Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { SingUpPinWidget } from "@/widgets/pin/signup";
import { observer } from "mobx-react-lite";

export const App = observer(() => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const { i18n } = useTranslation();
  const authStore = useStore(AuthStoreContext);
  const [pin, setPin] = useState("");
  const [pinRepeat, setPinRepeat] = useState("");
  const [step, setStep] = useState(1);

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

  useEffect(() => {
    if (initDataRaw && !authStore.data?.id) {
      authStore.checkTelegram(initDataRaw);
    }
  }, [initDataRaw]);

  const handleForm = () => {
    if (pin.every((value, index) => value !== pinRepeat[index])) {
      toast.error("Вы неверно повторили пин");
      setPin("");
      setPinRepeat("");
      setStep(1);
      return;
    }

    const data = {
      request_str: initDataRaw,
      pin_code: pin,
    };
    authStore.signUp(pin, initDataRaw);
  };

  useEffect(() => {
    if (pin.length === 4) {
      setStep(2);
    }
  }, [pin]);

  useEffect(() => {
    if (pinRepeat.length === 4) {
      handleForm();
    }
  }, [pinRepeat]);

  return (
    <AppRoot appearance={"dark"} platform={"ios"}>
      {authStore.loading && <Spinner />}
      {authStore.registered === false && step == 1 && (
        <SingUpPinWidget
          value={pin}
          onChange={(e) => setPin(e)}
          label="Придумайте пароль"
        />
      )}
      {authStore.registered === false && step == 2 && (
        <SingUpPinWidget
          value={pinRepeat}
          onChange={(e) => setPinRepeat(e)}
          label="Повторите пароль"
        />
      )}
      {authStore.data?.id && (
        <Router location={location} navigator={reactNavigator}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </AppRoot>
  );
});
