import { API } from "./base";

const register = (payload) => {
  const data = {
    telegram_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
    surname: payload.lastName,
    name: payload.firstName,
    father_name: payload.middleName,
    phone: payload.phone,
    region: payload.region,
    district: payload.district,
    init_data: window.Telegram?.WebApp?.initData,
  };
  return API.post("/api/users/", data).then((res) => res.data);
};

export default register;
