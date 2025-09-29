import { API } from "./base";

const update_user = (id, payload) => {
  const data = {
    telegram_id: window.Telegram?.WebApp?.initDataUnsafe?.user?.id || 534534,
    surname: payload.lastName,
    name: payload.firstName,
    father_name: payload.middleName,
    phone: payload.phone,
    region: payload.region,
    district: payload.district,
  };
  return API.put(`/api/users/${id}/`, data).then((res) => res.data);
};

export default update_user;