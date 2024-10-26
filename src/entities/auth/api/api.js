import { baseApi } from "@/shared/api";

export const authApi = {
  checkTelegram: ({ data }) => baseApi.post("/check_telegram", data),
  signUp: (pin, data) => baseApi.post(`/register?pin_code=${pin}`, data),
  signIn: (pin, data) => baseApi.post(`/login?pin_code=${pin}`, data),
  getMe: () => baseApi.get(`/me`),
};
