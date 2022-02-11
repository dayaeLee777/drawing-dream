import { api } from "api/api";

export const getCouresInfo = async (courseId, success, fail) => {
  return await api.get(`/api/course/${courseId}`).then(success).catch(fail);
};
