import { API } from "./base";

const create_test = (answers, subject, is_public, channel_username, start_time = null) => {
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

  return API.post("/api/tests/", {
    subject: subject.id,
    creator: userProfile.id || 1,
    title: subject.name,
    questions_count: Object.keys(answers).length,
    is_active: true,
    is_public: is_public,
    channel_username: is_public ? channel_username : null,
    start_time: start_time,
    answers: answers
  }).then((res) => res.data);
};

export default create_test;
