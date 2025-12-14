import axios from "axios";

const API = axios.create({
  baseURL: "https://bot.milliy-test.uz",
});

export { API };
