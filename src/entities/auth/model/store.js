import { makeAutoObservable, runInAction } from "mobx";
import { authApi } from "@/entities/auth";

export class AuthStore {
  loading = true;
  abortController = null;
  data = {};
  accessToken = "";
  registered = undefined;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  clear = () => {
    this.loading = true;
    this.abortController = null;
    this.data = {};
    this.accessToken = "";
  };

  checkTelegram = async (initDataRow) => {
    this.loading = true;

    try {
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
    this.loading = true;

    try {
      const res = await authApi.signUp(pin, { request_str: initDataRow });
      if (res.status === 200 && res.data) {
        runInAction(() => {
          this.accessToken = res.data?.access_token;
          this.registered = true;
          this.loading = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  signIn = async (pin, initDataRow) => {
    this.loading = true;

    try {
      const res = await authApi.signIn(pin, { request_str: initDataRow });
      if (res.status === 200 && res.data) {
        runInAction(() => {
          this.accessToken = res.data?.access_token;
          this.loading = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getMe = async () => {
    this.loading = true;

    try {
      const res = await authApi.getMe();
      if (res.status === 200 && res.data) {
        runInAction(() => {
          this.data = res.data;
          this.loading = false;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
