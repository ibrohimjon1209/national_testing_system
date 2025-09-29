import { API } from "./base";

const check_answers = (testId, userAnswers) => {
  return API.post(`/api/tests/${testId}/check_answers/`, {
    user_answers: userAnswers
  }).then((res) => res.data);
};

export default check_answers;