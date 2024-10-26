import { AuthStoreContext } from "@/entities/auth";
import { useStore } from "@/shared/model";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Spinner } from "@telegram-apps/telegram-ui";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AuthGuard = observer(() => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const authStore = useStore(AuthStoreContext);
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["access_token"]);

  useEffect(() => {
    if (initDataRaw && !authStore.data?.id) {
      authStore.checkTelegram(initDataRaw);
    }
  }, [initDataRaw]);

  useEffect(() => {
    if (authStore.accessToken) {
      setCookie("access_token", authStore.accessToken);
    }
  }, [authStore.accessToken]);

  useEffect(() => {
    if (authStore.registered === true && authStore.accessToken) {
      authStore.getMe();
    }
  }, [authStore.registered, authStore.accessToken]);

  if (authStore.loading) {
    return <Spinner />;
  }

  if (
    !authStore.loading &&
    authStore.registered === false &&
    location.pathname !== "/signup"
  ) {
    return <Navigate to="/signup" />;
  }

  if (
    !authStore.loading &&
    authStore.registered === true &&
    !authStore.accessToken &&
    location.pathname !== "/signin"
  ) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
});
