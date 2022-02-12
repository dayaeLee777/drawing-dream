import { api } from "api/api";

export const attend = async () => {
  return await api.post("/api/attendance/attend");
};

export const checkAttend = async (userId) => {
  return await api.get(`/api/attendance/${userId}`);
};
