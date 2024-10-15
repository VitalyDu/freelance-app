import { post } from "@/shared/api/baseApi";

export const authApi = {
  auth: ({ initDataRow }) => {
    // console.log(initDataRow);
    // baseApi.post({ url: `/check_telegram`, data: initDataRow });
    post({ url: `/check_telegram`, data: initDataRow });
  },
};
