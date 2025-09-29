import { API } from "./base";

const get_user = async (telegram_id) => {
  try {
    const response = await API.get("/api/users/");
    const users = response.data.results;
    const user = users.find((u) => u.telegram_id === telegram_id);
    console.log(user);
    const user_data = await API.get(`/api/users/${user.id}`);
    return user_data || null;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export default get_user;
