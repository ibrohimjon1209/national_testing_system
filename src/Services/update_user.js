import { API } from "./base";

const update_user = (payload) => {
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
  return API.put(
    `/api/users/${window.Telegram?.WebApp?.initDataUnsafe?.user?.id}/`,
    data
  ).then((res) => res.data);
};

export default update_user;
