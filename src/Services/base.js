import axios from "axios";

export const API = axios.create({
  baseURL: "https://mukhriddin043.pythonanywhere.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
