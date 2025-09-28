import { API } from "./base";

const get_subjects = () => API.get("/api/subjects/").then((res) => res.data);

export default get_subjects;
