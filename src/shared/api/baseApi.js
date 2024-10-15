import axios from "axios";

export const urlConfig = {
  baseURL: import.meta.env.VITE_BACKEND_URL,
};

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-type": "application/json; charset=UTF-8",
};

// export const setAxiosToken = (token) => {
//   if (token && token != undefined && token !== "undefined") {
//     // defaultHeaders.Authorization = `Bearer ${token}`;
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     // delete defaultHeaders.Authorization;
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };

export const post = ({ url, data = {}, sameSite = false, onUpload = null }) => {
  let postConfig = {
    headers: {
      ...defaultHeaders,
      "Content-Type":
        typeof window !== "undefined" && data instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    },
  };

  if (!sameSite) {
    postConfig = { ...postConfig, ...urlConfig };
  }

  if (onUpload) {
    postConfig.onUploadProgress = onUpload;
  }

  return axios.post(url, data, postConfig);
};

export const patch = ({ url, data = {}, sameSite = false }) => {
  let patchConfig = {
    headers: defaultHeaders,
  };

  if (!sameSite) {
    patchConfig = { ...urlConfig, ...patchConfig };
  }
  return axios.patch(url, data, patchConfig);
};

export const put = ({ url, data = {}, sameSite = false }) => {
  let putConfig = {
    headers: defaultHeaders,
  };

  if (!sameSite) {
    putConfig = { ...urlConfig, ...putConfig };
  }
  return axios.put(url, data, putConfig);
};

export const remove = ({ url, data = {}, sameSite = false }) => {
  let removeConfig = {
    headers: defaultHeaders,
  };

  if (!sameSite) {
    removeConfig = { ...urlConfig, ...removeConfig };
  }

  return axios.delete(url, {
    ...removeConfig,
    data,
  });
};

export const get = ({ url, params = {} }) => {
  if (Object.keys(params).length > 0) {
    const queryParams = {
      ...params,
    };
    params = new URLSearchParams();
    Object.keys(queryParams).forEach((param) => {
      if (Array.isArray(queryParams[param])) {
        queryParams[param].forEach((value) => {
          params.append(`${param}[]`, value);
        });
      } else {
        params.append(param, queryParams[param]);
      }
    });
  }

  let getConfig = {
    ...urlConfig,
    headers: { ...defaultHeaders },
    params: params,
  };

  return axios.get(url, getConfig);
};

function createBaseApi() {
  let currentReq = null;

  async function getCurrentAccessToken() {
    if (typeof document === "undefined") return "";
    let token = document.cookie
      .split(";")
      .filter((cookie) => cookie.trim().startsWith("access_token"))[0];

    if (!token) {
      if (!currentReq) {
        currentReq = fetch(
          `${import.meta.env.VITE_BFF_URL}/bff/token/refresh`,
          {
            method: "GET",
            credentials: import.meta.env.DEV ? "include" : "same-origin",
          }
        );
      }
      const response = await currentReq;
      currentReq = null;
      const data = await response.clone().json();
      if (!data.access || response?.status === 401) {
        return Promise.reject(401);
      }
      return Promise.resolve(data.access);
    } else {
      if (typeof token === "undefined") return 0;
      // eslint-disable-next-line no-unused-vars
      const [_, accessToken] = token.split("=");
      return Promise.resolve(accessToken);
    }
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
