import { api } from "api/api";

export const getMyClass = async () => {
  return await api.get("/api/myClass");
};
