import { api } from "api/api";

export const createOnlineClass = async ({ courseId, multipartFile }) => {
  return await api.post("/api/online", { courseId, multipartFile });
};

export const deleteOnlineClass = async (courseId) => {
  return await api.put(`/api/online/${courseId}`);
};
