import { api } from "api/api";

export const getCalendar = async () => {
  return await api.get("/api/calendar");
};
