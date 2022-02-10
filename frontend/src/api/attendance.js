import { api } from "api/api";

export const attend = async () => {
  return await api.post("/api/attendance/attend");
};
