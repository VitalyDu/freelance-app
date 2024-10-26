// import { post } from "@/shared/api/baseApi";

// export const authApi = {
//   checkTelegram: ({ data }) => {
//     post({ url: `/check_telegram`, data: data });
//   },
//   signUp: ({ data }) => {
//     post({ url: `/register`, data: data });
//   },
// };

import { baseApi } from "@/shared/api";

export const authApi = {
  checkTelegram: ({ data }) => baseApi.post("/check_telegram", data),
  signUp: (pin, data) => baseApi.post(`/register?pin_code=${pin}`, data),
};
