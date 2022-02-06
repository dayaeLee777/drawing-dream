import { api } from "api/api";

export const createOnlineClass = async (params) => {
  return await api.post("/api/online", params);
};
