import { API } from "./base";

const check_answers = (testId, userAnswers) => {
  return API.post(`/api/tests/${testId}/check_answers/`, {
    user_answers: userAnswers,
    init_data: window.Telegram?.WebApp?.initData
  }).then((res) => res.data);
};

export default check_answers;