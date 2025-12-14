import { API } from "./base";

const get_user = async (telegram_id) => {
  try {
    const user_data = await API.get(`/api/users/${telegram_id}`);
    return user_data || null;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default get_user;
