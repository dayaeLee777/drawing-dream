import { api, fileApi } from "api/api";

export const createOnlineClass = async (content) => {
  for (var pair of content.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  return await fileApi.post("/api/online", content);
};

export const deleteOnlineClass = async (courseId) => {
  return await api.put(`/api/online/${courseId}`);
};

export const getOnlineClass = async (courseId) => {
  return await api.get(`/api/online/${courseId}`);
};
