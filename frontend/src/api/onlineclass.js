import { api } from "api/api";

export const createOnlineClass = async ({ courseId, multipartFile }) => {
  console.log(courseId);
  return await api.post("/api/online", { courseId, multipartFile });
};
