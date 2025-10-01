import axios from "axios";

const API = axios.create({
  baseURL: "https://mukhriddin043.pythonanywhere.com",
});

API.interceptors.request.use(
  (config) => {
    const initData = window.Telegram?.WebApp?.initData;

    if (initData) {
      config.headers["Telegram-Init-Data"] = initData;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API };
