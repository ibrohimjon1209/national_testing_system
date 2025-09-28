import { API } from "./base";

const get_subject_tests = (id) =>
  API.get(`/api/subjects/${id}/tests/`).then((res) => res.data);

export default get_subject_tests;
