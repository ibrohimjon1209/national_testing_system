import { API } from "./base";

const create_test = (answers, subject, is_public, channel_username) => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

  return API.post("/api/tests/", {
    subject: subject.id,
    creator: userProfile.id || 1,
    title: subject.name,
    questions_count: Object.keys(answers).length,
    is_active: true,
    is_public: is_public,
    channel_username: is_public ? channel_username : null,
    answers: answers
  }).then((res) => res.data);
};

export default create_test;
