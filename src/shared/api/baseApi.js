import axios from "axios";

const getAccessToken = () => {
  return sessionStorage.getItem("access_token");
};

function createBaseApi() {
  let currentReq = null;

  async function getCurrentAccessToken() {
    if (typeof document === "undefined") return "";
    let token = getAccessToken();

    if (typeof token === "undefined") return 0;
    // eslint-disable-next-line no-unused-vars
    const [_, accessToken] = token.split("=");
    return Promise.resolve(accessToken);
  }

  const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use(
    async (config) => {
      if (config.bff) {
        config.baseURL = import.meta.env.VITE_BFF_URL;
      }

      if (config.authorization !== false) {
        try {
          const token = await getCurrentAccessToken();
          if (token) {
            config.headers.Authorization = "Bearer " + token;
          }
        } catch (error) {
          Promise.reject(error);
          if (error === 401) {
            window.location.reload();
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
}

export const baseApi = createBaseApi();
