import { API } from "./base";

const register = (payload) => {
  const data = {
    telegram_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 534534,
    username: window.Telegram?.WebApp?.initDataUnsafe?.user?.username || "",
    surname: payload.lastName,
    name: payload.firstName,
    father_name: payload.middleName,
    phone: payload.phone,
    region: payload.region,
    district: payload.district,
    balance: "0",
    is_active: true,
    is_banned: false,
    is_admin: false,
  };
  console.log(data);
  return API.post("/api/users/", data).then((res) => res.data);
};

export default register;
