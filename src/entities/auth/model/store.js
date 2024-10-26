import { makeAutoObservable, runInAction } from "mobx";
import { authApi } from "@/entities/auth";

export class AuthStore {
  loading = true;
  abortController = null;
  data = {};
  accessToken = "";
  registered = undefined; // Поле для хранения токена

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  clear = () => {
    this.loading = true;
    this.abortController = null;
    this.data = {};
    this.accessToken = ""; // Очистка токена
  };

  checkTelegram = async (initDataRow) => {
    try {
      this.loading = true;
      const res = await authApi.checkTelegram({
        data: { request_str: initDataRow },
      });
      if (res.status === 200 && res.data) {
        runInAction(() => {
          this.registered = res.data?.registered;
          this.loading = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  signUp = async (pin, initDataRow) => {
    try {
      this.loading = true;
      const res = await authApi.signUp(pin, { request_str: initDataRow });
      if (res.status === 200 && res.data) {
        runInAction(() => {
          // this.registered = res.data?.registered;
          this.loading = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
