import { makeAutoObservable } from "mobx";
import { authApi } from "@/entities/auth";

export class AuthStore {
  initial = true;
  loading = true;
  abortController = null;
  data = {};

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  clear = () => {
    this.initial = true;
    this.loading = true;
    this.abortController = null;
    this.data = {};
  };

  getUser = async (initDataRow) => {
    try {
      //  if (this.abortController) this.abortController.abort();
      //  this.abortController = new AbortController();
      this.loading = true;
      const res = await authApi.auth({
        initDataRow,
      });
      if (res.status === 200 && res.data) {
        runInAction(() => {
          this.data = res.data;
          this.initial = false;
          this.loading = false;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      //  runInAction(() => {
      //    this.abortController = null;
      //  });
    }
  };
}
